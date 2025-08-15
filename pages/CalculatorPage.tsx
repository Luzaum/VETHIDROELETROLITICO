import React, { useState, useMemo, useEffect } from 'react';
import { PatientInfo, Species, PhysiologicalState, Comorbidity } from '../types';
import { InfoIcon } from '../components/Tooltip';
import HelpPopover from '../components/HelpPopover';
import { POTASSIUM_REPLACEMENT_TABLE_CONTENT, MAGNESIUM_REPLACEMENT_TABLE_CONTENT, PHOSPHATE_REPLACEMENT_TABLE_CONTENT } from '../data/content';
import SodiumCalculator from '../components/SodiumCalculator';
import PotassiumCalculator from '../components/PotassiumCalculator';
import CalciumCalculator from '../components/CalciumCalculator';
import { FluidCompatibilityChecker } from '../components/FluidCompatibilityChecker';
import { applyModifiers, loadConsensos } from '../lib/rules';
import { PatientContext } from '../lib/types';

const infusionTimeTooltipContent = (
    <div className="text-left">
        <p className="font-bold mb-2">Por que a infusão deve ser lenta?</p>
        <p className="text-xs">
            A concentração de potássio (K⁺) no sangue é muito baixa em comparação com o interior das células. Infusões rápidas podem causar um aumento súbito e perigoso do K⁺ no sangue (<span className="bg-red-200 dark:bg-red-800/60 text-red-900 dark:text-red-200 px-2 py-1 rounded font-semibold">hipercalemia</span>), levando a arritmias cardíacas fatais.
        </p>
        <p className="text-xs mt-2">
            A regra de segurança universal é <strong>não exceder 0.5 mEq de K⁺ por kg de peso do paciente por hora</strong>. Tempos de infusão mais longos (8, 12, 24 horas) garantem que o K⁺ seja distribuído lentamente para dentro das células, evitando picos perigosos.
        </p>
    </div>
);


export const CalculatorPage: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    species: Species.Dog,
    weight: 10,
    state: PhysiologicalState.Adult,
    comorbidity: Comorbidity.None
  });

  const [electrolyte, setElectrolyte] = useState('potassium');
  const [currentK, setCurrentK] = useState(2.0);
  const [fluidVolume, setFluidVolume] = useState(250);
  const [infusionTime, setInfusionTime] = useState(8);

  // Fluidoterapia
  const [dehydrationPercent, setDehydrationPercent] = useState<number>(5);
  const [ongoingLossesMlKgHr, setOngoingLossesMlKgHr] = useState<number>(0);

  const handlePatientInfoChange = (field: keyof PatientInfo, value: any) => {
    setPatientInfo(prev => ({ ...prev, [field]: value }));
  };

  const kclConcentration = 2.56; // mEq/mL para exibição; valores reais vêm do consensos.json

  const calculationResult = useMemo(() => {
    if (patientInfo.weight <= 0 || currentK <= 0 || infusionTime <= 0) return null;
    let kToAddPerLiter = 20; // Default
    if (currentK < 2.0) kToAddPerLiter = 80;
    else if (currentK <= 2.5) kToAddPerLiter = 60;
    else if (currentK <= 3.0) kToAddPerLiter = 40;
    else if (currentK <= 3.5) kToAddPerLiter = 28;
    else kToAddPerLiter = 20;

    const totalKToAdd = (kToAddPerLiter * fluidVolume) / 1000;
    const kclVolumeToAdd = totalKToAdd / kclConcentration;

    const maxInfusionRateMeqKgHr = 0.5;
    const patientMaxMeqHr = patientInfo.weight * maxInfusionRateMeqKgHr;
    const actualInfusionRateMeqHr = totalKToAdd / infusionTime;
    const isSafe = actualInfusionRateMeqHr <= patientMaxMeqHr;
    const infusionRateMlHr = fluidVolume / infusionTime;

    return {
      kToAddPerLiter,
      totalKToAdd: totalKToAdd.toFixed(2),
      kclVolumeToAdd: kclVolumeToAdd.toFixed(2),
      infusionRateMlHr: infusionRateMlHr.toFixed(2),
      actualInfusionRateMeqHr: actualInfusionRateMeqHr.toFixed(2),
      patientMaxMeqHr: patientMaxMeqHr.toFixed(2),
      isSafe
    };
  }, [patientInfo.weight, currentK, fluidVolume, infusionTime]);

  const fluidPlan = useMemo(() => {
    const weight = patientInfo.weight;
    if (weight <= 0) return null;

    const boundedDehydration = Math.max(0, Math.min(15, dehydrationPercent || 0));
    const deficitMl = (boundedDehydration / 100) * weight * 1000;

    const maintenanceRateMlKgDay = patientInfo.species === Species.Dog ? 60 : 50;
    const maintenanceMlDay = maintenanceRateMlKgDay * weight;
    const maintenanceMlHr = maintenanceMlDay / 24;
    const lossesMlHr = (ongoingLossesMlKgHr || 0) * weight;
    const total24hMl = deficitMl + maintenanceMlDay + (lossesMlHr * 24);
    const suggestedMlHr = total24hMl / 24;

    const caution = [Comorbidity.Cardiopathy, Comorbidity.Renopathy].includes(patientInfo.comorbidity);

    return {
      dehydrationPercent: boundedDehydration.toFixed(1),
      deficitMl: deficitMl.toFixed(0),
      maintenanceRateMlKgDay,
      maintenanceMlDay: maintenanceMlDay.toFixed(0),
      maintenanceMlHr: maintenanceMlHr.toFixed(0),
      lossesMlHr: lossesMlHr.toFixed(0),
      total24hMl: total24hMl.toFixed(0),
      suggestedMlHr: suggestedMlHr.toFixed(0),
      caution,
    };
  }, [patientInfo.species, patientInfo.weight, dehydrationPercent, ongoingLossesMlKgHr, patientInfo.comorbidity]);
  
  const inputClasses = "w-full p-2 border border-gray-300 rounded bg-white dark:bg-brand-dark-surface dark:border-gray-600 focus:ring-2 focus:ring-brand-orange-dark focus:border-transparent outline-none transition";

  // ------ Estados auxiliares para abas extra ------
  // Magnésio
  const [mgMode, setMgMode] = useState<'bolus'|'cri'>('bolus');
  const [mgDoseStr, setMgDoseStr] = useState<string>('0.2'); // mEq/kg
  const [mgTimeStr, setMgTimeStr] = useState<string>('0.25'); // horas
  const [mgContainer, setMgContainer] = useState<string>('seringa20');
  const [mgDiluent, setMgDiluent] = useState<string>('NaCl 0.9%');
  const mgContainerVolume = (id: string) => { if (id.startsWith('seringa')) return Number(id.replace('seringa','')) || 20; if (id.startsWith('bolsa')) return Number(id.replace('bolsa','')) || 500; return 0; };
  const mgCalc = useMemo(() => {
    const w = patientInfo.weight || 0;
    const dose = Number(String(mgDoseStr).replace(',','.')) || 0;
    const time = Number(String(mgTimeStr).replace(',','.')) || 0;
    if (w <= 0 || dose <= 0 || time <= 0) return null;
    const total_mEq = dose * w;
    const mgPerMl = 4;
    const drugMl = total_mEq / mgPerMl;
    const containerMl = mgContainerVolume(mgContainer) || 100;
    const minFinal = Math.max(drugMl + 5, 20);
    const volumeMl = Math.max(minFinal, containerMl);
    const diluentMl = Math.max(0, volumeMl - drugMl);
    const infTime = time;
    const rateMlH = infTime > 0 ? volumeMl / infTime : 0;
    return { total_mEq, drugMl, volumeMl, diluentMl, rateMlH };
  }, [patientInfo.weight, mgDoseStr, mgTimeStr, mgMode, mgContainer]);

  // Fósforo
  const [pSalt, setPSalt] = useState<'kphos'|'naphos'>('kphos');
  const [pDoseStr, setPDoseStr] = useState<string>('0.02');
  const [pTimeStr, setPTimeStr] = useState<string>('4');
  const [pContainer, setPContainer] = useState<string>('bolsa500');
  const [pDiluent, setPDiluent] = useState<string>('NaCl 0.9%');
  const pContainerVolume = mgContainerVolume;
  const pCalc = useMemo(() => {
    const w = patientInfo.weight || 0;
    const dose = Number(String(pDoseStr).replace(',','.')) || 0;
    const time = Number(String(pTimeStr).replace(',','.')) || 0;
    if (w <= 0 || dose <= 0 || time <= 0) return null;
    const mmolP = dose * w * time;
    const mmolPerMl = 3;
    const drugMl = mmolP / mmolPerMl;
    const containerMl = pContainerVolume(pContainer) || 100;
    const minFinal = Math.max(drugMl + 5, 20);
    const volumeMl = Math.max(minFinal, containerMl);
    const diluentMl = Math.max(0, volumeMl - drugMl);
    const rateMlH = volumeMl / time;
    const kAdded_mEq = pSalt === 'kphos' ? drugMl * 4.4 : 0;
    const k_mEq_kg_h = (kAdded_mEq / time) / (w || 1);
    const kSafe = k_mEq_kg_h <= 0.5;
    return { mmolP, drugMl, volumeMl, diluentMl, rateMlH, kAdded_mEq, k_mEq_kg_h, kSafe };
  }, [patientInfo.weight, pDoseStr, pTimeStr, pSalt, pContainer]);

  // Bicarbonato
  const [hco3CurrentStr, setHco3CurrentStr] = useState<string>('8');
  const [hco3TargetStr, setHco3TargetStr] = useState<string>('15');
  const [hco3Vd, setHco3Vd] = useState<number>(0.3);
  const hco3Calc = useMemo(() => {
    const w = patientInfo.weight || 0;
    const cur = Number(String(hco3CurrentStr).replace(',','.')) || 0;
    const tgt = Number(String(hco3TargetStr).replace(',','.')) || 0;
    if (w <= 0 || cur <= 0 || tgt <= 0 || tgt <= cur) return null;
    const deficit_mEq = hco3Vd * w * (tgt - cur);
    const volumeMl = deficit_mEq;
    const initialMl = deficit_mEq * 0.5;
    return { deficit_mEq, volumeMl, initialMl };
  }, [patientInfo.weight, hco3CurrentStr, hco3TargetStr, hco3Vd]);

  const [consensos, setConsensos] = useState<any | null>(null);
  const [consensoReady, setConsensoReady] = useState(false);
  useEffect(() => { loadConsensos().then(c => { setConsensos(c); setConsensoReady(true); }).catch(()=> setConsensoReady(false)); }, []);
  const patientCtx: PatientContext = useMemo(() => ({
    species: patientInfo.species === Species.Dog ? 'cao' : 'gato',
    pesoKg: patientInfo.weight || 0,
    estado: patientInfo.state as any,
    comorbidades: [patientInfo.comorbidity as any],
    evolucao: 'agudo'
  }), [patientInfo]);
  const mods = useMemo(() => { if (!consensoReady || !consensos) return null; return applyModifiers(consensos as any, patientCtx); }, [consensoReady, consensos, patientCtx]);

  return (
    <div className="container mx-auto mt-8 px-4 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calculadora de Reposição</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Estime as necessidades de reposição para seus pacientes.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="lg:col-span-2 bg-white dark:bg-brand-dark-surface p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-600">1. Dados do Paciente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Espécie</label>
              <select value={patientInfo.species} onChange={e => handlePatientInfoChange('species', e.target.value)} className={inputClasses}>
                <option value={Species.Dog}>Cão</option>
                <option value={Species.Cat}>Gato</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Peso (kg)</label>
              <input type="number" value={patientInfo.weight} onChange={e => handlePatientInfoChange('weight', parseFloat(e.target.value) || 0)} className={inputClasses} />
            </div>
            <div>
              <label className="block font-medium mb-1">Estado Fisiológico
                <InfoIcon content="Diferentes estados fisiológicos têm necessidades específicas de eletrólitos e fluidos" />
              </label>
              <select value={patientInfo.state} onChange={e => handlePatientInfoChange('state', e.target.value)} className={inputClasses}>
                <option value={PhysiologicalState.Adult}>Adulto</option>
                <option value={PhysiologicalState.Puppy}>Filhote/Neonato</option>
                <option value={PhysiologicalState.Senior}>Idoso/Geriátrico</option>
                <option value={PhysiologicalState.Pregnant}>Gestante</option>
                <option value={PhysiologicalState.Lactating}>Lactante</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Comorbidade</label>
              <select value={patientInfo.comorbidity} onChange={e => handlePatientInfoChange('comorbidity', e.target.value)} className={inputClasses}>
                <option value={Comorbidity.None}>Nenhuma</option>
                <option value={Comorbidity.Cardiopathy}>Cardiopatia</option>
                <option value={Comorbidity.Renopathy}>Renopatia</option>
                <option value={Comorbidity.Endocrinopathy}>Endocrinopatia</option>
                <option value={Comorbidity.Hepatopathy}>Hepatopatia</option>
                <option value={Comorbidity.Septic}>Séptico</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-brand-dark-surface p-6 rounded-lg shadow-lg">
            <div className="border-b pb-2 mb-4 dark:border-gray-600">
                <h2 className="text-2xl font-bold mb-3">2. Cálculo de Reposição</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 'potassium', label: 'Potássio (K⁺)' },
                        { id: 'sodium', label: 'Sódio (Na⁺)' },
                        { id: 'calcium', label: 'Cálcio (Ca²⁺)' },
                        { id: 'magnesium', label: 'Magnésio (Mg²⁺)' },
                        { id: 'phosphorus', label: 'Fósforo (P)' },
                        { id: 'bicarbonate', label: 'Bicarbonato (HCO₃⁻)' },
                        { id: 'glucose', label: 'Glicemia' },
                    ].map(btn => (
                        <button
                          key={btn.id}
                          type="button"
                          onClick={() => setElectrolyte(btn.id)}
                          className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${electrolyte === btn.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'}`}
                        >
                          {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {electrolyte === 'calcium' && (
                <CalciumCalculator patient={{
                    species: patientInfo.species === Species.Dog ? 'dog' : 'cat',
                    weight: patientInfo.weight
                }} />
            )}

            {electrolyte === 'potassium' && (
                <PotassiumCalculator className="" patient={{
                    species: patientInfo.species === Species.Dog ? 'dog' : 'cat',
                    weight: patientInfo.weight,
                    state: patientInfo.state as any,
                    comorbidities: [patientInfo.comorbidity as any]
                }} />
            )}

            {electrolyte === 'sodium' && (
                <SodiumCalculator patient={{
                    species: patientInfo.species === Species.Dog ? 'dog' : 'cat',
                    weight: patientInfo.weight,
                    state: patientInfo.state as any,
                    comorbidities: [patientInfo.comorbidity as any]
                }} />
            )}

            {electrolyte === 'magnesium' && (
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/40 rounded-lg">
                        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Calculadora de Magnésio (Mg²⁺)</h4>
                        <p className="text-sm">Carregamento: 0,15–0,3 mEq/kg IV lento (10–20 min). Manutenção: 0,75–1,0 mEq/kg/dia.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Modo</label>
                            <select className={inputClasses} value={mgMode} onChange={(e)=> setMgMode(e.target.value as any)}>
                                <option value="bolus">Bolus</option>
                                <option value="cri">CRI</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Dose (mEq/kg)</label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={mgDoseStr} onChange={(e)=> setMgDoseStr(e.target.value)} className={inputClasses} placeholder="Ex: 0,2" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Tempo (h)</label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={mgTimeStr} onChange={(e)=> setMgTimeStr(e.target.value)} className={inputClasses} placeholder="Ex: 0,25" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Recipiente</label>
                            <select className={inputClasses} value={mgContainer} onChange={(e)=> setMgContainer(e.target.value)}>
                                <option value="seringa10">Seringa 10 mL</option>
                                <option value="seringa20">Seringa 20 mL</option>
                                <option value="seringa60">Seringa 60 mL</option>
                                <option value="bolsa250">Bolsa 250 mL</option>
                                <option value="bolsa500">Bolsa 500 mL</option>
                                <option value="bolsa1000">Bolsa 1000 mL</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Diluente</label>
                            <select className={inputClasses} value={mgDiluent} onChange={(e)=> setMgDiluent(e.target.value)}>
                                <option>NaCl 0.9%</option>
                                <option>Dextrose 5%</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <div className="text-sm text-gray-600 dark:text-gray-300">MgSO₄ 50% ≈ 4 mEq/mL</div>
                        </div>
                    </div>
                    {mgCalc && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-sm">Volume do MgSO₄ 50%: <strong>{mgCalc.drugMl.toFixed(2)} mL</strong>; completar com diluente até <strong>{mgCalc.volumeMl.toFixed(0)} mL</strong>. Taxa sugerida: <strong>{mgCalc.rateMlH.toFixed(1)} mL/h</strong>.</div>
                        <div className="text-xs mt-1 text-blue-800 dark:text-blue-300">Indicação de literatura: reposições em 10–20 min (bolus) ou CRI ao longo de 6–24 h, conforme quadro e comorbidades.</div>
                      </div>
                    )}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">{MAGNESIUM_REPLACEMENT_TABLE_CONTENT}</div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/40 rounded-lg text-sm">
                        Compatibilidade: MgSO₄ é incompatível com bicarbonato; atenção com soluções com cálcio — preferir linha separada/flush. Taxa de bolus 10–20 min; CRI 6–24 h. <em>Fontes: BSAVA (Magnésio); DiBartola.</em>
                    </div>
                </div>
            )}

            {electrolyte === 'phosphorus' && (
                <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/40 rounded-lg">
                        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">Calculadora de Fósforo (P)</h4>
                        <p className="text-sm">Hipofosfatemia moderada/grave: 0,01–0,03 mmol/kg/h. Diluir em SF 0,9% ou D5W.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Sal</label>
                            <select className={inputClasses} value={pSalt} onChange={(e)=> setPSalt(e.target.value as any)}>
                                <option value="kphos">K-fosfato (3 mmol P/mL; 4,4 mEq K/mL)</option>
                                <option value="naphos">Na-fosfato (3 mmol P/mL; 4 mEq Na/mL)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Dose (mmol/kg/h)</label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={pDoseStr} onChange={(e)=> setPDoseStr(e.target.value)} className={inputClasses} placeholder="Ex: 0,02" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Tempo (h)</label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={pTimeStr} onChange={(e)=> setPTimeStr(e.target.value)} className={inputClasses} placeholder="Ex: 4" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Recipiente</label>
                            <select className={inputClasses} value={pContainer} onChange={(e)=> setPContainer(e.target.value)}>
                                <option value="seringa10">Seringa 10 mL</option>
                                <option value="seringa20">Seringa 20 mL</option>
                                <option value="seringa60">Seringa 60 mL</option>
                                <option value="bolsa250">Bolsa 250 mL</option>
                                <option value="bolsa500">Bolsa 500 mL</option>
                                <option value="bolsa1000">Bolsa 1000 mL</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Diluente</label>
                            <select className={inputClasses} value={pDiluent} onChange={(e)=> setPDiluent(e.target.value)}>
                                <option>NaCl 0.9%</option>
                                <option>Dextrose 5%</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <div className="text-sm text-gray-600 dark:text-gray-300">Evitar LRS (contém Ca²⁺) — risco de precipitado.</div>
                        </div>
                    </div>
                    {pCalc && (
                      <div className={`p-4 rounded-lg ${pCalc.kSafe ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                        <div className="text-sm">Volume do sal: <strong>{pCalc.drugMl.toFixed(2)} mL</strong>; completar com diluente até <strong>{pCalc.volumeMl.toFixed(0)} mL</strong>. Taxa: <strong>{pCalc.rateMlH.toFixed(1)} mL/h</strong>.</div>
                        <div className="text-sm mt-1">K⁺ adicionado: <strong>{pCalc.kAdded_mEq.toFixed(2)} mEq</strong> → {pCalc.k_mEq_kg_h.toFixed(3)} mEq/kg/h {pCalc.kSafe ? '✅ dentro do limite (≤ 0,5)' : '🚨 acima do limite (0,5)'}.</div>
                      </div>
                    )}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">{PHOSPHATE_REPLACEMENT_TABLE_CONTENT}</div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/40 rounded-lg text-sm">
                        K-Phos: 3 mmol P/mL; 4,4 mEq K/mL. Some a carga de K à taxa total de K⁺ para respeitar o teto de 0,5 mEq/kg/h. <em>Fontes: DiBartola (Fósforo); BSAVA (DKA/realimentação).</em>
                    </div>
                </div>
            )}

            {electrolyte === 'bicarbonate' && (
                <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/40 rounded-lg">
                        <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Calculadora de Bicarbonato (HCO₃⁻)</h4>
                        <p className="text-sm">Indicações: acidose metabólica grave (pH &lt; 7,1 ou HCO₃⁻ &lt; 10–12) após corrigir causas e volume.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">HCO₃⁻ atual (mEq/L)</label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={hco3CurrentStr} onChange={(e)=> setHco3CurrentStr(e.target.value)} className={inputClasses} placeholder="Ex: 8" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">HCO₃⁻ desejado (mEq/L)</label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={hco3TargetStr} onChange={(e)=> setHco3TargetStr(e.target.value)} className={inputClasses} placeholder="Ex: 15" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Fator (Vd)</label>
                            <select className={inputClasses} defaultValue="0.3">
                                <option value="0.3">0,3 (padrão)</option>
                                <option value="0.4">0,4</option>
                                <option value="0.5">0,5</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/40 rounded-lg">
                        <h5 className="font-bold text-orange-800 dark:text-orange-200">Como calcular e administrar:</h5>
                        <p className="text-sm mt-1"><strong>Déficit (mEq) = Vd × peso(kg) × (HCO₃⁻ alvo − atual)</strong> — Vd típico 0,3.</p>
                        <p className="text-sm"><strong>Volume em mL</strong> de NaHCO₃ 8,4% = Déficit (mEq) (1 mL = 1 mEq). Iniciar com ~50% em 2–4 h e reavaliar.</p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2"><strong>Atenção:</strong> Não misturar com soluções contendo cálcio (ex.: LRS). Preferir SF 0,9% e/ou linha separada. Evitar em acidose respiratória isolada.</p>
                    </div>
                    {hco3Calc && (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-sm">Déficit: <strong>{hco3Calc.deficit_mEq.toFixed(1)} mEq</strong> → Volume total 8,4%: <strong>{hco3Calc.volumeMl.toFixed(1)} mL</strong>. Inicial: <strong>{hco3Calc.initialMl.toFixed(1)} mL</strong> em 2–4 h.</div>
                      </div>
                    )}
                </div>
            )}

            {electrolyte === 'glucose' && (
                <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/40 rounded-lg">
                        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">Calculadora de Glicemia</h4>
                        <p className="text-sm">Valores de referência: Cães 68-104 mg/dL, Gatos 71-182 mg/dL</p>
                        <p className="text-sm mt-1"><strong>Filhotes:</strong> Valores inferiores, reservas limitadas</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Glicose atual (mg/dL)</label>
                            <input type="number" step="1" className={inputClasses} placeholder="Ex: 45" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Situação</label>
                            <select className={inputClasses}>
                                <option value="hypoglycemia">Hipoglicemia (&lt; 60 mg/dL)</option>
                                <option value="hyperglycemia">Hiperglicemia (&gt; 180 mg/dL)</option>
                                <option value="dka">Cetoacidose Diabética</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/40 rounded-lg">
                        <h5 className="font-bold text-red-800 dark:text-red-200">🚨 Tratamento de Emergência:</h5>
                        <p className="text-sm mt-1"><strong>Hipoglicemia:</strong> Dextrose 50% 0.5-1 mL/kg diluída 1:2 IV</p>
                        <p className="text-sm"><strong>Manutenção:</strong> Dextrose 2.5-5% CRI</p>
                        <p className="text-sm"><strong>Neonatos:</strong> Podem precisar dextrose 12.5%</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2"><strong>Fórmula Na⁺ corrigido:</strong> Na⁺ + 1.6 × (Glicose - 100)/100</p>
                    </div>
                </div>
            )}
        </div>

        {/* Verificador de Compatibilidade */}
        <div className="lg:col-span-2 bg-white dark:bg-brand-dark-surface p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-600">🧪 Compatibilidade de Fluidos</h2>
          <FluidCompatibilityChecker />
        </div>

        {/* Alertas por Estado/Comorbidades (contextuais) */}
        {mods && (
          <div className="lg:col-span-2 bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-bold text-yellow-900 dark:text-yellow-100 mb-1">Ajustes por perfil do paciente</h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 list-disc ml-5">
              {mods.reduzirRatePercent ? <li>Reduzir taxa em <strong>{mods.reduzirRatePercent}%</strong> conforme estado/comorbidades.</li> : null}
              {mods.reduzirVolumePercent ? <li>Reduzir volume total em <strong>{mods.reduzirVolumePercent}%</strong>.</li> : null}
              {mods.evitarFluido.length > 0 ? <li>Evitar: {mods.evitarFluido.join(', ')}.</li> : null}
              {mods.preferirFluido.length > 0 ? <li>Preferir: {mods.preferirFluido.join(', ')}.</li> : null}
              {mods.avisos.length > 0 ? mods.avisos.map((a:string, i:number)=>(<li key={i}>{a}</li>)) : null}
            </ul>
          </div>
        )}

        {/* Removido: alertas por estado fisiológico (a pedido) */}

        {/* Removido: plano de fluidoterapia (a pedido) */}
      </div>
    </div>
  );
};