import React, { useState, useMemo } from 'react';
import { PatientInfo, Species, PhysiologicalState, Comorbidity } from '../types';
import { InfoIcon } from '../components/Tooltip';
import { POTASSIUM_REPLACEMENT_TABLE_CONTENT } from '../data/content';
import SodiumCalculator from '../components/SodiumCalculator';
import PotassiumCalculator from '../components/PotassiumCalculator';
import CalciumCalculator from '../components/CalciumCalculator';
import { FluidCompatibilityChecker } from '../components/FluidCompatibilityChecker';

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

    // Manutenção empírica: cães 60 mL/kg/dia, gatos 50 mL/kg/dia
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
            <div className="flex justify-between items-center border-b pb-2 mb-4 dark:border-gray-600">
                <h2 className="text-2xl font-bold">2. Cálculo de Reposição</h2>
                 <select value={electrolyte} onChange={e => setElectrolyte(e.target.value)} className={inputClasses + " max-w-xs"}>
                    <option value="potassium">Potássio (K⁺)</option>
                    <option value="sodium">Sódio (Na⁺)</option>
                    <option value="calcium">Cálcio (Ca²⁺)</option>
                    <option value="magnesium">Magnésio (Mg²⁺)</option>
                    <option value="phosphorus">Fósforo (P)</option>
                    <option value="bicarbonate">Bicarbonato (HCO₃⁻)</option>
                    <option value="glucose">Glicemia</option>
                </select>
            </div>

            {electrolyte === 'calcium' && (
                <CalciumCalculator />
            )}

            {electrolyte === 'potassium' && (
                <PotassiumCalculator />
            )}

            {electrolyte === 'sodium' && (
                <SodiumCalculator />
            )}

            {electrolyte === 'magnesium' && (
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/40 rounded-lg">
                        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Calculadora de Magnésio (Mg²⁺)</h4>
                        <p className="text-sm">Valores de referência: Cães 1.5-2.1 mEq/L, Gatos 1.7-2.2 mEq/L</p>
                        <p className="text-sm mt-1"><strong>Lembrete:</strong> Hipomagnesemia frequentemente causa hipocalemia resistente</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Mg²⁺ atual (mEq/L)</label>
                            <input type="number" step="0.1" className={inputClasses} placeholder="Ex: 1.2" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Mg²⁺ desejado (mEq/L)</label>
                            <input type="number" step="0.1" className={inputClasses} placeholder="Ex: 1.8" />
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/40 rounded-lg">
                        <h5 className="font-bold text-yellow-800 dark:text-yellow-200">Tratamento:</h5>
                        <p className="text-sm mt-1"><strong>Sulfato de Magnésio IV:</strong> 0.1-0.3 mEq/kg/h (1.6-2.5 mg/kg/h)</p>
                        <p className="text-sm"><strong>Via Oral:</strong> Óxido de magnésio 10-20 mg/kg/dia</p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2"><strong>Monitorar:</strong> Reflexos patelares e creatinina</p>
                    </div>
                </div>
            )}

            {electrolyte === 'phosphorus' && (
                <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/40 rounded-lg">
                        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">Calculadora de Fósforo (P)</h4>
                        <p className="text-sm">Valores de referência: Cães 2.7-5.4 mg/dL, Gatos 2.6-5.5 mg/dL</p>
                        <p className="text-sm mt-1"><strong>Filhotes:</strong> Valores fisiologicamente mais altos</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">P atual (mg/dL)</label>
                            <input type="number" step="0.1" className={inputClasses} placeholder="Ex: 1.8" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Gravidade</label>
                            <select className={inputClasses}>
                                <option value="mild">Leve (2.0-2.5 mg/dL)</option>
                                <option value="moderate">Moderada (1.5-2.0 mg/dL)</option>
                                <option value="severe">Severa (&lt; 1.5 mg/dL)</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/40 rounded-lg">
                        <h5 className="font-bold text-red-800 dark:text-red-200">⚠️ K-Phos (Fosfato de Potássio):</h5>
                        <p className="text-sm mt-1"><strong>Concentração:</strong> 3 mmol P + 4.4 mEq K por mL</p>
                        <p className="text-sm"><strong>INCOMPATÍVEL</strong> com Ringer Lactato (contém cálcio)</p>
                        <p className="text-sm"><strong>Usar:</strong> NaCl 0.9% ou Dextrose 5%</p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2"><strong>Taxa máxima:</strong> 0.12 mmol/kg/h</p>
                    </div>
                </div>
            )}

            {electrolyte === 'bicarbonate' && (
                <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/40 rounded-lg">
                        <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Calculadora de Bicarbonato (HCO₃⁻)</h4>
                        <p className="text-sm">Valores de referência: Cães 14-24 mEq/L, Gatos 14-20 mEq/L</p>
                        <p className="text-sm mt-1"><strong>Indicação:</strong> pH &lt; 7.1 ou HCO₃⁻ &lt; 12 mEq/L</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">HCO₃⁻ atual (mEq/L)</label>
                            <input type="number" step="1" className={inputClasses} placeholder="Ex: 8" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">HCO₃⁻ desejado (mEq/L)</label>
                            <input type="number" step="1" className={inputClasses} placeholder="Ex: 15" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Base Excess</label>
                            <input type="number" step="1" className={inputClasses} placeholder="Ex: -12" />
                        </div>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/40 rounded-lg">
                        <h5 className="font-bold text-orange-800 dark:text-orange-200">Fórmula do Déficit:</h5>
                        <p className="text-sm mt-1"><strong>Déficit (mEq) = 0.3 × peso(kg) × (HCO₃⁻ desejado - atual)</strong></p>
                        <p className="text-sm"><strong>Administrar:</strong> ¼ a ⅓ do déficit lentamente</p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2"><strong>Riscos:</strong> Hipernatremia, hipocalemia, alcalose</p>
                    </div>
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

        {/* Alertas específicos por estado fisiológico */}
        {patientInfo.state !== PhysiologicalState.Adult && (
          <div className="lg:col-span-2 bg-amber-50 dark:bg-amber-900/40 p-6 rounded-lg border-l-4 border-amber-400">
            <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
              ⚠️ Considerações Especiais - {patientInfo.state}
            </h3>
            <div className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
              {patientInfo.state === PhysiologicalState.Puppy && (
                <>
                  <p><strong>Filhotes/Neonatos:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Maior porcentagem de água corporal (80% neonatos, 70% filhotes)</li>
                    <li>Fluidoterapia mais rápida: bolus 20 mL/kg</li>
                    <li>Adicionar dextrose 2.5-5% para prevenir hipoglicemia</li>
                    <li>KCl 20 mEq/L em fluidos de manutenção</li>
                    <li>Valores de fósforo fisiologicamente mais altos</li>
                  </ul>
                </>
              )}
              {patientInfo.state === PhysiologicalState.Senior && (
                <>
                  <p><strong>Idosos/Geriátricos:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Água corporal reduzida (50-55%)</li>
                    <li>Menor capacidade de concentração renal</li>
                    <li>Percepção de sede diminuída</li>
                    <li>Correções mais conservadoras e monitoramento frequente</li>
                    <li>Risco de doença renal crônica (hiperfosfatemia)</li>
                  </ul>
                </>
              )}
              {patientInfo.state === PhysiologicalState.Pregnant && (
                <>
                  <p><strong>Gestantes:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Aumento do volume plasmático</li>
                    <li>Maior demanda de cálcio e fósforo</li>
                    <li>Hemodiluição leve (redução de Na⁺ e Cl⁻)</li>
                    <li>Progesterona aumenta atividade da aldosterona</li>
                    <li>Cuidado com excesso de sódio ou cálcio</li>
                  </ul>
                </>
              )}
              {patientInfo.state === PhysiologicalState.Lactating && (
                <>
                  <p><strong>Lactantes:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Perdas aumentadas de Ca²⁺, P e Mg²⁺</li>
                    <li>Risco de hipocalemia e hipomagnesemia</li>
                    <li>Possível tetania da lactação</li>
                    <li>Incluir dextrose se hipoglicemia</li>
                    <li>Suplementos orais quando possível</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        )}

        {/* Fluidoterapia */}
        <div className="lg:col-span-2 bg-white dark:bg-brand-dark-surface p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-600">4. Plano de Fluidoterapia (24h)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-medium mb-1">Desidratação (%)
                <InfoIcon content="Estimativa clínica: leve 5%, moderada 7-8%, severa 10-12%" />
              </label>
              <input type="number" min={0} max={15} step={0.5} value={dehydrationPercent} onChange={e => setDehydrationPercent(parseFloat(e.target.value) || 0)} className={inputClasses} />
            </div>
            <div>
              <label className="block font-medium mb-1">Perdas em Curso (mL/kg/h)
                <InfoIcon content="Vômitos/diarreia, drenagens. Some por hora ao plano." />
              </label>
              <input type="number" min={0} step={0.5} value={ongoingLossesMlKgHr} onChange={e => setOngoingLossesMlKgHr(parseFloat(e.target.value) || 0)} className={inputClasses} />
            </div>
            <div>
              <label className="block font-medium mb-1">Manutenção (ml/kg/dia)</label>
              <input disabled value={patientInfo.species === Species.Dog ? 60 : 50} className={inputClasses + ' opacity-70 cursor-not-allowed'} />
            </div>
          </div>

          {fluidPlan && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/40 rounded-lg">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Cálculos</h4>
                <p className="mt-1">Déficit: <strong>{fluidPlan.deficitMl} mL</strong> ({fluidPlan.dehydrationPercent}%).</p>
                <p>Manutenção: <strong>{fluidPlan.maintenanceMlDay} mL/24h</strong> (~{fluidPlan.maintenanceMlHr} mL/h).</p>
                <p>Perdas em curso: <strong>{fluidPlan.lossesMlHr} mL/h</strong>.</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/40 rounded-lg">
                <h4 className="font-bold text-blue-800 dark:text-blue-200">Plano sugerido</h4>
                <p className="mt-1">Total nas primeiras 24h: <strong>{fluidPlan.total24hMl} mL</strong></p>
                <p>Taxa média sugerida: <strong>{fluidPlan.suggestedMlHr} mL/h</strong></p>
              </div>
              {fluidPlan.caution && (
                <div className="p-4 bg-red-100 dark:bg-red-900/60 rounded-lg">
                  <h4 className="font-bold text-red-800 dark:text-red-200">Atenção: Comorbidade</h4>
                  <p>Cardiopatias e renopatias requerem taxas mais conservadoras e reavaliação frequente. Considere reduzir a taxa inicial e monitorar pressão arterial, diurese e sinais de sobrecarga.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};