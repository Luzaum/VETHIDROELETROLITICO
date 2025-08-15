import React, { useEffect, useMemo, useState } from 'react';
import { FLUIDS } from '../lib/fluids';
import { loadConsensos, sodiumLimits } from '../lib/rules';
import { Comorbidity, PhysiologicalState } from '../lib/types';
import { InfoIcon } from './Tooltip';
import HelpHint from './HelpHint';
import { TIP_NA_CORRECTION_RATE, TIP_OSM_FORMULA } from '../data/tooltips';
import { SODIUM_REPLACEMENT_TABLE_CONTENT } from '../data/content';

interface PatientBasics {
  species: 'dog' | 'cat';
  weight: number;
  state: PhysiologicalState;
  comorbidities: Comorbidity[];
}

interface SodiumCalculatorProps {
  className?: string;
  patient?: PatientBasics;
}

const SodiumCalculator: React.FC<SodiumCalculatorProps> = ({ className = '', patient }) => {
  const [weight, setWeight] = useState<number>(0);
  const [currentSodium, setCurrentSodium] = useState<number>(0);
  const [targetSodium, setTargetSodium] = useState<number>(145);
  const [fluidSodium, setFluidSodium] = useState<number>(154);
  // substitui taxa desejada por duração e cálculo automático
  const [correctionHours, setCorrectionHours] = useState<number>(24);
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [state, setState] = useState<PhysiologicalState>('adulto');
  const [comorbidities, setComorbidities] = useState<Comorbidity[]>(['nenhuma']);
  const [evolucao, setEvolucao] = useState<'agudo'|'cronico'>('agudo');
  const [consensoReady, setConsensoReady] = useState(false);
  // UI de recipiente para preparar a solução
  const [container, setContainer] = useState<'syringe'|'bag'>('bag');
  const [syringeSize, setSyringeSize] = useState<number>(20);
  const [bagVolume, setBagVolume] = useState<number>(500);

  useEffect(() => {
    loadConsensos().then((c) => {
      (window as any).___consensosCache = c;
      setConsensoReady(true);
    }).catch(() => setConsensoReady(false));
  }, []);

  // Sincroniza dados do paciente (seção 1)
  useEffect(() => {
    if (!patient) return;
    if (typeof patient.weight === 'number') setWeight(patient.weight || 0);
    if (patient.species) setSpecies(patient.species);
    if (patient.state) setState(patient.state);
    if (patient.comorbidities) setComorbidities(patient.comorbidities);
  }, [patient]);

  const limits = useMemo(() => {
    if (!consensoReady) return null;
    const c = (window as any).___consensosCache;
    return sodiumLimits(c, {
      species: species === 'dog' ? 'cao' : 'gato',
      pesoKg: weight || 0,
      estado: state,
      comorbidades: comorbidities,
      evolucao
    } as any);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consensoReady, species, weight, state, comorbidities, evolucao]);

  const calculateSodiumDeficit = () => {
    if (weight <= 0 || currentSodium <= 0 || !limits) return 0;
    const ACT = (limits as any).limites.tbwCoef * weight;
    return (targetSodium - currentSodium) * ACT;
  };

  const calculateInfusionRate = () => {
    if (weight <= 0 || currentSodium <= 0 || fluidSodium <= currentSodium || !limits) return 0;
    const ACT = (limits as any).limites.tbwCoef * weight;
    const deltaNa = (targetSodium - currentSodium);
    const hours = Math.max(1, correctionHours || 24);
    const rateLh = ((deltaNa / hours) * (ACT + 1)) / (fluidSodium - currentSodium);
    return rateLh * 1000;
  };
  const calcContainerMl = () => container === 'bag' ? bagVolume : syringeSize;

  const calculateWaterDeficit = () => {
    if (weight <= 0 || currentSodium <= 0 || !limits) return 0;
    const ACT = (limits as any).limites.tbwCoef * weight;
    const normalSodium = (limits as any).limites.alvoPadrao || (species === 'dog' ? 145 : 155);
    return ((currentSodium / normalSodium) - 1) * ACT;
  };

  const getSodiumStatus = () => {
    if (species === 'dog') {
      if (currentSodium < 140) return { status: 'Hiponatremia', severity: 'Grave', color: 'text-red-600' };
      if (currentSodium < 145) return { status: 'Hiponatremia', severity: 'Leve', color: 'text-orange-600' };
      if (currentSodium > 155) return { status: 'Hipernatremia', severity: 'Grave', color: 'text-red-600' };
      return { status: 'Normal', severity: '', color: 'text-green-600' };
    } else {
      if (currentSodium < 149) return { status: 'Hiponatremia', severity: 'Grave', color: 'text-red-600' };
      if (currentSodium < 150) return { status: 'Hiponatremia', severity: 'Leve', color: 'text-orange-600' };
      if (currentSodium > 165) return { status: 'Hipernatremia', severity: 'Grave', color: 'text-red-600' };
      return { status: 'Normal', severity: '', color: 'text-green-600' };
    }
  };

  const sodiumStatus = getSodiumStatus();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🌊 Calculadora Prática de Sódio
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Parâmetros e limites vindos do seu consensos.json (agudo × crônico, TBW por espécie).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duração (h)</label>
              <input type="number" value={correctionHours} onChange={(e)=> setCorrectionHours(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">{SODIUM_REPLACEMENT_TABLE_CONTENT}</div>
          {/* Espécie removida aqui: já definida em "Dados do Paciente" */}

          {/* Estado fisiológico e comorbidades removidos: já definidos em "Dados do Paciente" */}

          {/* Peso removido: já definido em "Dados do Paciente" */}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sódio Atual (mEq/L)
              <span className="ml-1 align-middle"><InfoIcon content={TIP_OSM_FORMULA} /></span>
            </label>
            <input
              type="number"
              value={currentSodium}
              onChange={(e) => setCurrentSodium(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: 118"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sódio Alvo (mEq/L)
              <span className="ml-1 align-middle"><InfoIcon content={TIP_NA_CORRECTION_RATE} /></span>
            </label>
            <input
              type="number"
              value={targetSodium}
              onChange={(e) => setTargetSodium(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: 145"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sódio do Fluido (mEq/L)
              <span className="ml-1 align-middle">
                <HelpHint title="O que significa o número?" size="popover">
                  <p className="text-xs">É a concentração de sódio do fluido em mEq/L.</p>
                  <ul className="list-disc ml-5 text-xs mt-1">
                    <li>NaCl 0,9%: Na⁺ 154 / Cl⁻ 154 mEq/L</li>
                    <li>Ringer Lactato: Na⁺ 130 / Cl⁻ 109 mEq/L (tampão lactato)</li>
                    <li>Plasma-Lyte/Normosol: Na⁺ 140 / Cl⁻ 98 mEq/L (acetato/gluconato)</li>
                    <li>D5W: sem eletrólitos</li>
                  </ul>
                </HelpHint>
              </span>
            </label>
            <select
              value={fluidSodium}
              onChange={(e) => setFluidSodium(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {Object.values(FLUIDS).map(f => (
                <option key={f.key} value={f.Na}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* Duração já apresentada no bloco superior; tabela de sódio posicionada logo abaixo, conforme solicitado */}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📊 Status do Sódio
            </h3>
            <div className={`text-xl font-bold ${sodiumStatus.color}`}>
              {sodiumStatus.status} {sodiumStatus.severity && `(${sodiumStatus.severity})`}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Faixa normal: {species === 'dog' ? '145-155' : '150-160'} mEq/L
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              💧 Cálculos de Reposição
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Déficit de Sódio:
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  {calculateSodiumDeficit().toFixed(1)} mEq
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Déficit de Água Livre:
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  {calculateWaterDeficit().toFixed(1)} L
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Taxa de Infusão:
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  {calculateInfusionRate().toFixed(1)} mL/h
                </div>
                <div className="text-xs text-blue-800 dark:text-blue-300">Recipiente escolhido: {calcContainerMl()} mL</div>
              </div>
            </div>
          </div>


          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
              ⚠️ Lembretes Importantes
            </h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Respeitar os limites do consenso (agudo vs crônico)</li>
              <li>• Monitorar sódio a cada 2-4h inicialmente</li>
              <li>• Avaliar estado neurológico constantemente</li>
            </ul>
            {limits && ((limits as any).refsUsadas || []).length > 0 && (
              <div className="text-xs mt-2 text-yellow-700 dark:text-yellow-300">📚 {((limits as any).refsUsadas || []).join(' • ')}</div>
            )}
          </div>

          {/* Conteúdo de ajuda foi movido para InfoIcon nos rótulos e tabelas principais */}
        </div>
      </div>
    </div>
  );
};

export default SodiumCalculator;
