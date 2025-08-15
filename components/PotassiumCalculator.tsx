import React, { useEffect, useMemo, useState } from 'react';
import { InfoIcon } from './Tooltip';
import HelpHint from './HelpHint';
import { TIP_K_HYPO_PATHO, TIP_K_IV_LIMITS, TIP_K_DILUTION } from '../data/tooltips';
import { POTASSIUM_REPLACEMENT_TABLE_CONTENT } from '../data/content';
import { loadConsensos, potassiumGuidance } from '../lib/rules';
import { Comorbidity, PhysiologicalState } from '../lib/types';

interface PatientBasics {
  species: 'dog' | 'cat';
  weight: number;
  state: PhysiologicalState;
  comorbidities: Comorbidity[];
}

interface PotassiumCalculatorProps {
  className?: string;
  patient?: PatientBasics;
}

const PotassiumCalculator: React.FC<PotassiumCalculatorProps> = ({ className = '', patient }) => {
  const [weight, setWeight] = useState<number>(0);
  const [currentPotassium, setCurrentPotassium] = useState<number>(0);
  const [fluidRate, setFluidRate] = useState<number>(0);
  const [container, setContainer] = useState<'syringe' | 'bag'>('bag');
  const [syringeSize, setSyringeSize] = useState<number>(20);
  const [bagVolume, setBagVolume] = useState<number>(500);
  const [infusionTimeHours, setInfusionTimeHours] = useState<number>(8);
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [state, setState] = useState<PhysiologicalState>('adulto');
  const [comorbidities, setComorbidities] = useState<Comorbidity[]>(['nenhuma']);
  const [consensoReady, setConsensoReady] = useState(false);
  const [consensos, setConsensos] = useState<any | null>(null);

  useEffect(() => {
    loadConsensos().then((c) => { (window as any).___consensosCache = c; setConsensos(c); setConsensoReady(true); }).catch(() => setConsensoReady(false));
  }, []);

  // Sincroniza dados do paciente (seção 1) sem repetir inputs
  useEffect(() => {
    if (!patient) return;
    if (typeof patient.weight === 'number') setWeight(patient.weight || 0);
    if (patient.species) setSpecies(patient.species);
    if (patient.state) setState(patient.state);
    if (patient.comorbidities) setComorbidities(patient.comorbidities);
  }, [patient]);

  const getPotassiumStatus = () => {
    if (currentPotassium < 3.5) {
      if (currentPotassium < 2.5) return { status: 'Hipocalemia', severity: 'Grave', color: 'text-red-600' };
      if (currentPotassium < 3.0) return { status: 'Hipocalemia', severity: 'Moderada', color: 'text-orange-600' };
      return { status: 'Hipocalemia', severity: 'Leve', color: 'text-yellow-600' };
    }
    if (currentPotassium > 5.5) {
      if (currentPotassium > 8.0) return { status: 'Hipercalemia', severity: 'Grave', color: 'text-red-600' };
      if (currentPotassium > 6.5) return { status: 'Hipercalemia', severity: 'Moderada', color: 'text-orange-600' };
      return { status: 'Hipercalemia', severity: 'Leve', color: 'text-yellow-600' };
    }
    return { status: 'Normal', severity: '', color: 'text-green-600' };
  };

  const guidance = useMemo(() => {
    if (!consensoReady || !consensos) return null;
    return potassiumGuidance(consensos, {
      species: species === 'dog' ? 'cao' : 'gato',
      pesoKg: weight || 0,
      estado: state,
      comorbidades: comorbidities,
      evolucao: 'agudo'
    } as any, currentPotassium);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consensoReady, consensos, species, weight, state, comorbidities, currentPotassium]);

  const computeVolumes = () => {
    if (!guidance || weight <= 0 || currentPotassium <= 0 || infusionTimeHours <= 0) return null;
    const { limites } = guidance as any;
    const kclPerLiter = limites.kclPerLiter || 0;
    const volumeMl = container === 'bag' ? bagVolume : syringeSize;
    const totalK_mEq = (kclPerLiter * volumeMl) / 1000;
    const kclStockMeqPerMl = ((window as any).___consensosCache?.estoques?.kcl191_meq_por_ml) || 2.56;
    const kclToAddMl = totalK_mEq / kclStockMeqPerMl;
    const kPerKgPerHour = (totalK_mEq / infusionTimeHours) / weight;
    const safeLimit = ((window as any).___consensosCache?.limites?.potassio?.max_mEq_kg_h) || 0.5;
    const finalVolumeMl = volumeMl + kclToAddMl;
    const infusionRateMlH = finalVolumeMl / infusionTimeHours;
    const concPeripheral = ((window as any).___consensosCache?.limites?.potassio?.conc_max_mEq_L_periferico) || 60;
    const concCentral = ((window as any).___consensosCache?.limites?.potassio?.conc_max_mEq_L_central) || 100;
    const finalConcentrationMeqL = (totalK_mEq / (finalVolumeMl / 1000));
    return { kclPerLiter, volumeMl, finalVolumeMl, infusionRateMlH, totalK_mEq, kclToAddMl, kPerKgPerHour, safeLimit, isSafe: kPerKgPerHour <= safeLimit, concPeripheral, concCentral, finalConcentrationMeqL };
  };

  const potassiumStatus = getPotassiumStatus();
  const calc = computeVolumes();
  const kclPerLiter = guidance ? (guidance as any).limites.kclPerLiter : 0;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        ⚡ Calculadora Prática de Potássio
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Parâmetros vindos do seu consensos.json. Sempre cite a literatura.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          {/* Espécie removida aqui: já definida em "Dados do Paciente" */}

          {/* Peso removido aqui: já definido em "Dados do Paciente" */}

          {/* Estado fisiológico e comorbidades removidos: já definidos em "Dados do Paciente" */}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Potássio Atual (mEq/L)
              <span className="ml-1 align-middle"><InfoIcon content={TIP_K_IV_LIMITS} /></span>
            </label>
            <input
              type="number"
              value={currentPotassium}
              onChange={(e) => setCurrentPotassium(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: 2.8"
              step="0.1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recipiente</label>
              <select value={container} onChange={(e)=> setContainer(e.target.value as 'syringe'|'bag')} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="syringe">Seringa</option>
                <option value="bag">Bolsa</option>
              </select>
            </div>
            {container === 'syringe' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seringa (mL)</label>
                <select value={syringeSize} onChange={(e)=> setSyringeSize(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={60}>60</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bolsa (mL)</label>
                <select value={bagVolume} onChange={(e)=> setBagVolume(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value={250}>250</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tempo de Infusão (h)
                <span className="ml-1 align-middle"><InfoIcon content={TIP_K_DILUTION} /></span>
              </label>
              <input type="number" value={infusionTimeHours} onChange={(e)=> setInfusionTimeHours(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Ex: 8" />
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">{POTASSIUM_REPLACEMENT_TABLE_CONTENT}</div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📊 Status do Potássio
            </h3>
            <div className={`text-xl font-bold ${potassiumStatus.color}`}>
              {potassiumStatus.status} {potassiumStatus.severity && `(${potassiumStatus.severity})`}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Faixa normal: 3.5-5.5 mEq/L
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              💧 Suplementação de KCl
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  KCl a adicionar por litro:
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  {kclPerLiter || 0} mEq/L
                </div>
              </div>

              {calc && (
                <>
                  <div>
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Volume do preparo:</div>
                    <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{calc.volumeMl} mL ({container === 'syringe' ? 'seringa' : 'bolsa'})</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">K⁺ total no preparo:</div>
                    <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{calc.totalK_mEq.toFixed(2)} mEq</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">KCl 19,1% a adicionar:</div>
                    <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{calc.kclToAddMl.toFixed(2)} mL</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Taxa resultante de K⁺:</div>
                    <div className={`text-lg font-bold ${calc.isSafe ? 'text-blue-900 dark:text-blue-100' : 'text-red-700 dark:text-red-300'}`}>{calc.kPerKgPerHour.toFixed(2)} mEq/kg/h</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
              ⚠️ Lembretes Importantes
            </h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Limite de segurança: ≤ {(guidance ? (guidance as any).limites.max_mEq_kg_h : 0.5).toFixed(2)} mEq/kg/h de K⁺ IV</li>
              <li>• Agitar MUITO BEM a bolsa após adicionar KCl</li>
              <li>• Monitorar ECG em casos graves</li>
              <li>• Verificar K⁺ sérico a cada 12-24h</li>
            </ul>
            {guidance && (
              <div className="text-xs mt-2 text-yellow-700 dark:text-yellow-300">📚 {((guidance as any).refsUsadas || []).join(' • ')}</div>
            )}
          </div>

          {calc && !calc.isSafe && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                🚨 ALERTA DE SEGURANÇA
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200">
                A taxa de infusão calculada ({calc.kPerKgPerHour.toFixed(2)} mEq/kg/h) excede o limite máximo ({calc.safeLimit.toFixed(2)} mEq/kg/h). Valide antes de prosseguir.
                <br/><br/>
                <strong>Reduza a taxa de infusão do fluido ou use uma concentração menor de KCl.</strong>
              </p>
            </div>
          )}

          <div className="mt-2">
            {(() => {
              const refs = guidance ? ((guidance as any).refsUsadas || []) : [];
              const literature = refs.length > 0 ? `📚 ${refs.join(' • ')}` : '📚 Ajuste suas referências no consensos.json para ver as fontes aqui.';
              return (
                <HelpfulTip
                  tabs={[
                    { id: 'basico', label: 'Básico', markdown: 'NUNCA bolus IV. Concentração da bolsa e taxa por kg são limitadas pelo seu consenso. KCl 19,1% ≈ 2,56 mEq/mL.' },
                    { id: 'fisio', label: 'Fisiologia', markdown: 'Na⁺/K⁺-ATPase; insulina e β-agonista movem K⁺ para dentro; acidose desloca K⁺ para fora; ECG nas alterações.' },
                    { id: 'lit', label: 'Literatura', markdown: literature }
                  ]}
                />
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotassiumCalculator;
