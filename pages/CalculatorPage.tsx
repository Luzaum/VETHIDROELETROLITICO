import React, { useState, useMemo } from 'react';
import { PatientInfo, Species, PhysiologicalState, Comorbidity } from '../types';
import { InfoIcon } from '../components/Tooltip';
import { POTASSIUM_REPLACEMENT_TABLE_CONTENT } from '../data/content';
import SodiumCalculator from '../components/SodiumCalculator';
import PotassiumCalculator from '../components/PotassiumCalculator';
import CalciumCalculator from '../components/CalciumCalculator';

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

  const kclConcentration = 2.56; // mEq/mL for KCl 19.1%

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
        </div>

        {/* Fluidoterapia */}
        <div className="lg:col-span-2 bg-white dark:bg-brand-dark-surface p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-600">3. Plano de Fluidoterapia (24h)</h2>
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