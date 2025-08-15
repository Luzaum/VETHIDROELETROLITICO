import React, { useState, useMemo, useEffect } from 'react';
import { PatientInfo, Species, PhysiologicalState, Comorbidity } from '../types';
import { InfoIcon } from '../components/Tooltip';
import { POTASSIUM_REPLACEMENT_TABLE_CONTENT, MAGNESIUM_REPLACEMENT_TABLE_CONTENT, PHOSPHATE_REPLACEMENT_TABLE_CONTENT } from '../data/content';
import SodiumCalculator from '../components/SodiumCalculator';
import PotassiumCalculator from '../components/PotassiumCalculator';
import CalciumCalculator from '../components/CalciumCalculator';
import { FluidCompatibilityChecker } from '../components/FluidCompatibilityChecker';
import { applyModifiers, loadConsensos } from '../lib/rules';
import { PatientContext } from '../lib/types';
import HelpHint from '../components/HelpHint';

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
  const [hco3Container, setHco3Container] = useState<string>('bolsa250');
  const [hco3Diluent, setHco3Diluent] = useState<string>('NaCl 0.9%');
  const [hco3TimeStr, setHco3TimeStr] = useState<string>('3');
  const hco3Calc = useMemo(() => {
    const w = patientInfo.weight || 0;
    const cur = Number(String(hco3CurrentStr).replace(',','.')) || 0;
    const tgt = Number(String(hco3TargetStr).replace(',','.')) || 0;
    if (w <= 0 || cur <= 0 || tgt <= 0 || tgt <= cur) return null;
    const deficit_mEq = hco3Vd * w * (tgt - cur);
    const volumeMl = deficit_mEq;
    const initialMl = deficit_mEq * 0.5;
    const timeH = Number(String(hco3TimeStr).replace(',','.')) || 0;
    const rateMlH = timeH > 0 ? (initialMl / timeH) : 0;
    const containerMl = mgContainerVolume(hco3Container) || 250;
    return { deficit_mEq, volumeMl, initialMl, timeH, rateMlH, containerMl };
  }, [patientInfo.weight, hco3CurrentStr, hco3TargetStr, hco3Vd, hco3TimeStr, hco3Container]);

  // Glicose
  const [gluMode, setGluMode] = useState<'bolus'|'cri'>('bolus');
  const [gluContainer, setGluContainer] = useState<string>('seringa20');
  const [gluTimeStr, setGluTimeStr] = useState<string>('4');
  const [gluCRIConc, setGluCRIConc] = useState<number>(5);
  const [gluBolusDoseMlKgStr, setGluBolusDoseMlKgStr] = useState<string>('0.5');
  const gluContainerVolume = mgContainerVolume;
  const gluCalcCRI = useMemo(() => {
    if (gluMode !== 'cri') return null;
    const v = gluContainerVolume(gluContainer) || 500;
    const time = Number(String(gluTimeStr).replace(',','.')) || 0;
    if (v <= 0 || time <= 0) return null;
    const ml50 = (gluCRIConc / 50) * v;
    const infusionRateMlH = v / time;
    const centralWarning = gluCRIConc > 5;
    return { v, time, ml50, infusionRateMlH, centralWarning };
  }, [gluMode, gluContainer, gluTimeStr, gluCRIConc]);
  const gluCalcBolus = useMemo(() => {
    if (gluMode !== 'bolus') return null;
    const w = patientInfo.weight || 0;
    const dose = Number(String(gluBolusDoseMlKgStr).replace(',','.')) || 0;
    if (w <= 0 || dose <= 0) return null;
    const ml50 = dose * w;
    const finalMl_at10pct = ml50 * (50/10); // 1:4 diluição p/ 10%
    const suggestTimeMin = 3; // 2–5 min
    const rateMlH = (finalMl_at10pct) / (suggestTimeMin/60);
    return { ml50, finalMl_at10pct, suggestTimeMin, rateMlH };
  }, [gluMode, gluBolusDoseMlKgStr, patientInfo.weight]);

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
                        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">🧲 Calculadora de Magnésio (Mg²⁺)
                          <span className="ml-2 align-middle"><HelpHint title="Quando/como repor Mg?">Repor MgSO₄ em hipomagnesemia clínica ou hipocalemia refratária. Bolus 0,15–0,3 mEq/kg em 10–20 min; CRI 0,75–1 mEq/kg/dia. Diluir em SF 0,9%/D5W. Evitar com NaHCO₃ na mesma linha.</HelpHint></span>
                        </h4>
                        <p className="text-sm">Carregamento: 0,15–0,3 mEq/kg IV lento (10–20 min). Manutenção: 0,75–1,0 mEq/kg/dia.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Modo <HelpHint title="Bolus vs CRI">Bolus em 10–20 min para correção rápida; CRI ao longo de 6–24 h para manutenção.</HelpHint></label>
                            <select className={inputClasses} value={mgMode} onChange={(e)=> setMgMode(e.target.value as any)}>
                                <option value="bolus">Bolus</option>
                                <option value="cri">CRI</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Dose (mEq/kg) <HelpHint title="Quanto de Mg por mL?">MgSO₄ 50% ≈ 4 mEq/mL. Total necessário = dose × peso. Volume do sal = total/4.</HelpHint></label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={mgDoseStr} onChange={(e)=> setMgDoseStr(e.target.value)} className={inputClasses} placeholder="Ex: 0,2" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Tempo (h) <HelpHint title="Taxa segura">Sugerir bolus em 0,17–0,33 h (10–20 min). Em CRI, distribuir 6–24 h conforme necessidade e comorbidades.</HelpHint></label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={mgTimeStr} onChange={(e)=> setMgTimeStr(e.target.value)} className={inputClasses} placeholder="Ex: 0,25" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Recipiente <HelpHint title="Seringa ou bolsa?">Use seringa 10/20/60 mL para bolus; bolsas 250/500/1000 mL para CRI.</HelpHint></label>
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
                            <label className="block font-medium mb-1">Diluente <HelpHint title="Compatibilidade">Diluir em SF 0,9% ou D5W. Evitar mistura com NaHCO₃ e cautela com soluções com Ca²⁺ (preferir via separada/flush).</HelpHint></label>
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
                        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">🔥 Calculadora de Fósforo (P)
                          <span className="ml-2 align-middle"><HelpHint title="Quando/como repor P?">Hipofosfatemia moderada/grave: 0,01–0,03 mmol/kg/h por 4–6 h. Preferir SF 0,9% ou D5W. Evitar LRS (contém Ca²⁺) por risco de precipitado Ca–fosfato.</HelpHint></span>
                        </h4>
                        <p className="text-sm">Hipofosfatemia moderada/grave: 0,01–0,03 mmol/kg/h. Diluir em SF 0,9% ou D5W.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Sal <HelpHint title="K-fos vs Na-fos">K-fosfato: 3 mmol P/mL e 4,4 mEq K/mL (contabilizar K na taxa total). Na-fos: 3 mmol P/mL e 4 mEq Na/mL.</HelpHint></label>
                            <select className={inputClasses} value={pSalt} onChange={(e)=> setPSalt(e.target.value as any)}>
                                <option value="kphos">K-fosfato (3 mmol P/mL; 4,4 mEq K/mL)</option>
                                <option value="naphos">Na-fosfato (3 mmol P/mL; 4 mEq Na/mL)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Dose (mmol/kg/h) <HelpHint title="Taxas típicas">Ajuste dentro de 0,01–0,03 mmol/kg/h e reavalie fósforo sérico a cada ciclo.</HelpHint></label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={pDoseStr} onChange={(e)=> setPDoseStr(e.target.value)} className={inputClasses} placeholder="Ex: 0,02" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Tempo (h) <HelpHint title="Tempo recomendado">Ciclos de 4–6 horas, conforme resposta clínica e laboratorial.</HelpHint></label>
                            <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={pTimeStr} onChange={(e)=> setPTimeStr(e.target.value)} className={inputClasses} placeholder="Ex: 4" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Recipiente <HelpHint title="Seringa ou bolsa?">Seringa 10/20/60 mL para pequenos volumes; bolsas 250/500/1000 mL para infusões mais longas.</HelpHint></label>
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
                            <label className="block font-medium mb-1">Diluente <HelpHint title="Compatibilidade">Preferir SF 0,9% ou D5W. <strong>Evitar LRS</strong> por conter Ca²⁺ (risco de precipitado Ca–fosfato).</HelpHint></label>
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
                        <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">🧂 Calculadora de Bicarbonato (HCO₃⁻)
                          <span className="ml-2 align-middle"><HelpHint title="Quando/como usar NaHCO₃?">Usar em acidose metabólica grave (pH &lt; 7,1 ou HCO₃⁻ &lt; 10–12) após volume/correção de causa. Déficit = Vd × kg × (alvo − atual). Iniciar com ~50% em 2–4 h e reavaliar. Não misturar com soluções com Ca²⁺ (ex.: LRS).</HelpHint></span>
                        </h4>
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
                            <label className="block font-medium mb-1">Fator (Vd) <HelpHint title="Vd 0,3–0,5">0,3 é padrão em vet; 0,5 pode ser usado em alguns cenários (ex.: Addison), sempre com reavaliação.</HelpHint></label>
                            <select className={inputClasses} value={String(hco3Vd)} onChange={(e)=> setHco3Vd(Number(e.target.value))}>
                                <option value="0.3">0,3 (padrão)</option>
                                <option value="0.4">0,4</option>
                                <option value="0.5">0,5</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-medium mb-1">Recipiente</label>
                        <select className={inputClasses} value={hco3Container} onChange={(e)=> setHco3Container(e.target.value)}>
                          <option value="seringa10">Seringa 10 mL</option>
                          <option value="seringa20">Seringa 20 mL</option>
                          <option value="seringa60">Seringa 60 mL</option>
                          <option value="bolsa250">Bolsa 250 mL</option>
                          <option value="bolsa500">Bolsa 500 mL</option>
                          <option value="bolsa1000">Bolsa 1000 mL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium mb-1">Diluente <HelpHint title="Compatibilidade">Preferir SF 0,9%. <strong>Evitar LRS</strong> (contém Ca²⁺) por risco de precipitado. Usar linha separada/flush.</HelpHint></label>
                        <select className={inputClasses} value={hco3Diluent} onChange={(e)=> setHco3Diluent(e.target.value)}>
                          <option>NaCl 0.9%</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium mb-1">Tempo para dose inicial (h) <HelpHint title="50% do déficit em 2–4 h">Administre ~50% do déficit em 2–4 h e reavalie gasometria antes de seguir.</HelpHint></label>
                        <input inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={hco3TimeStr} onChange={(e)=> setHco3TimeStr(e.target.value)} className={inputClasses} placeholder="Ex: 3" />
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
                        <div className="text-sm">Déficit: <strong>{hco3Calc.deficit_mEq.toFixed(1)} mEq</strong> → Volume total 8,4%: <strong>{hco3Calc.volumeMl.toFixed(1)} mL</strong>. Inicial: <strong>{hco3Calc.initialMl.toFixed(1)} mL</strong>.</div>
                        <div className="text-sm mt-1">Recipiente selecionado: <strong>{hco3Calc.containerMl} mL</strong> • Tempo: <strong>{hco3Calc.timeH.toFixed(1)} h</strong> • Taxa: <strong>{hco3Calc.rateMlH.toFixed(1)} mL/h</strong>.</div>
                      </div>
                    )}
                </div>
            )}

            {electrolyte === 'glucose' && (
                <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/40 rounded-lg">
                        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">🍪 Calculadora de Glicemia
                          <span className="ml-2 align-middle"><HelpHint title="Bolus e CRI de dextrose">Bolus de resgate: 0,5–1 mL/kg de dextrose 50% diluída para ≤10% (ex.: 1:4) em 2–5 min. CRI: 2,5–5% (até 10% se necessário, preferir via central). Monitorar glicemia q 2–4 h.</HelpHint></span>
                        </h4>
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
                            <select className={inputClasses} value={gluMode} onChange={(e)=> setGluMode(e.target.value as any)}>
                                <option value="hypoglycemia">Hipoglicemia (&lt; 60 mg/dL)</option>
                                <option value="hyperglycemia">Hiperglicemia (&gt; 180 mg/dL)</option>
                                <option value="dka">Cetoacidose Diabética</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-medium mb-1">Modo</label>
                        <select className={inputClasses} value={gluMode} onChange={(e)=> setGluMode(e.target.value as any)}>
                          <option value="bolus">Bolus</option>
                          <option value="cri">CRI</option>
                        </select>
                      </div>
                      {gluMode === 'bolus' ? (
                        <div>
                          <label className="block font-medium mb-1">Dose 50% (mL/kg) <HelpHint title="Diluir para ≤10%">Para atingir ≤10%, diluir 1:4 (ex.: 1 mL de 50% + 4 mL de SF).</HelpHint></label>
                          <input className={inputClasses} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={gluBolusDoseMlKgStr} onChange={(e)=> setGluBolusDoseMlKgStr(e.target.value)} placeholder="0,5–1" />
                        </div>
                      ) : (
                        <div>
                          <label className="block font-medium mb-1">Concentração alvo (CRI) % <HelpHint title="Via central se &gt;5–10%">Acima de 5–10%, preferir acesso venoso central.</HelpHint></label>
                          <select className={inputClasses} value={String(gluCRIConc)} onChange={(e)=> setGluCRIConc(Number(e.target.value))}>
                            <option value="2.5">2,5%</option>
                            <option value="5">5%</option>
                            <option value="10">10%</option>
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block font-medium mb-1">Recipiente</label>
                        <select className={inputClasses} value={gluContainer} onChange={(e)=> setGluContainer(e.target.value)}>
                          <option value="seringa10">Seringa 10 mL</option>
                          <option value="seringa20">Seringa 20 mL</option>
                          <option value="seringa60">Seringa 60 mL</option>
                          <option value="bolsa250">Bolsa 250 mL</option>
                          <option value="bolsa500">Bolsa 500 mL</option>
                          <option value="bolsa1000">Bolsa 1000 mL</option>
                        </select>
                      </div>
                      {gluMode === 'cri' && (
                        <div>
                          <label className="block font-medium mb-1">Tempo (h)</label>
                          <input className={inputClasses} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" value={gluTimeStr} onChange={(e)=> setGluTimeStr(e.target.value)} placeholder="Ex: 4" />
                        </div>
                      )}
                    </div>
                    {gluMode === 'cri' && gluCalcCRI && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <div className="text-sm">Para preparar <strong>{gluCRIConc}%</strong> em <strong>{gluCalcCRI.v} mL</strong>, adicionar <strong>{gluCalcCRI.ml50.toFixed(1)} mL</strong> de dextrose 50% e completar com diluente. Taxa: <strong>{gluCalcCRI.infusionRateMlH.toFixed(1)} mL/h</strong>.</div>
                        {gluCalcCRI.centralWarning && <div className="text-xs text-red-600 dark:text-red-400 mt-1">Sugestão: preferir via central se &gt; 5–10%.</div>}
                      </div>
                    )}
                    {gluMode === 'bolus' && gluCalcBolus && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <div className="text-sm">Bolus 50%: <strong>{gluCalcBolus.ml50.toFixed(1)} mL</strong>. Diluir para ≤10% (1:4) → <strong>{gluCalcBolus.finalMl_at10pct.toFixed(1)} mL</strong> em ~<strong>{gluCalcBolus.suggestTimeMin} min</strong> (taxa ≈ <strong>{gluCalcBolus.rateMlH.toFixed(1)} mL/h</strong>).</div>
                      </div>
                    )}
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