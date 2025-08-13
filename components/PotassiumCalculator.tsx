import React, { useEffect, useMemo, useState } from 'react';
import { HelpfulTip } from './HelpfulTip';
import { InfoIcon } from './Tooltip';
import { TIP_K_HYPO_PATHO, TIP_K_IV_LIMITS, TIP_K_DILUTION } from '../data/tooltips';
import { loadConsensos, potassiumGuidance } from '../lib/rules';
import { Comorbidity, PhysiologicalState } from '../lib/types';

interface PotassiumCalculatorProps {
  className?: string;
}

const PotassiumCalculator: React.FC<PotassiumCalculatorProps> = ({ className = '' }) => {
  const [weight, setWeight] = useState<number>(0);
  const [currentPotassium, setCurrentPotassium] = useState<number>(0);
  const [fluidRate, setFluidRate] = useState<number>(0);
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [state, setState] = useState<PhysiologicalState>('adulto');
  const [comorbidities, setComorbidities] = useState<Comorbidity[]>(['nenhuma']);
  const [consensoReady, setConsensoReady] = useState(false);
  const [consensos, setConsensos] = useState<any | null>(null);

  useEffect(() => {
    loadConsensos().then((c) => { (window as any).___consensosCache = c; setConsensos(c); setConsensoReady(true); }).catch(() => setConsensoReady(false));
  }, []);

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

  const calculateInfusionRate = () => {
    if (!guidance || weight <= 0 || currentPotassium <= 0 || fluidRate <= 0) return 0;
    const { limites } = guidance as any;
    const kclPerHour = (limites.kclPerLiter * fluidRate) / 1000;
    const kclPerKgPerHour = kclPerHour / weight;
    return kclPerKgPerHour;
  };

  const getMaxSafeFluidRate = () => {
    if (!guidance || weight <= 0 || currentPotassium <= 0) return 0;
    const { limites } = guidance as any;
    return (limites.maxFluidRate_mL_kg_h || 0) * weight;
  };

  const potassiumStatus = getPotassiumStatus();
  const infusionRate = calculateInfusionRate();
  const maxSafeFluidRate = getMaxSafeFluidRate();
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Espécie
            </label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value as 'dog' | 'cat')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="dog">Cão</option>
              <option value="cat">Gato</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Peso (kg)
              <span className="ml-1 align-middle"><InfoIcon content={TIP_K_HYPO_PATHO} /></span>
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: 10"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estado</label>
              <select value={state} onChange={(e) => setState(e.target.value as PhysiologicalState)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="filhote">Filhote</option>
                <option value="adulto">Adulto</option>
                <option value="idoso">Idoso</option>
                <option value="gestante">Gestante</option>
                <option value="lactante">Lactante</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comorbidades</label>
              <select multiple value={comorbidities as any} onChange={(e) => setComorbidities(Array.from(e.target.selectedOptions).map(o => o.value) as Comorbidity[])} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="nenhuma">Nenhuma</option>
                <option value="cardiopata">Cardiopata</option>
                <option value="renopata">Renopata</option>
                <option value="septico">Séptico</option>
                <option value="hepatopata">Hepatopata</option>
                <option value="endocrinopata">Endócrino</option>
              </select>
            </div>
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Taxa de Infusão de Fluido (mL/h)
              <span className="ml-1 align-middle"><InfoIcon content={TIP_K_DILUTION} /></span>
            </label>
            <input
              type="number"
              value={fluidRate}
              onChange={(e) => setFluidRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: 100"
            />
          </div>
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

              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Taxa de infusão de K⁺:
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  {infusionRate.toFixed(2)} mEq/kg/h
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Taxa máxima segura de fluido:
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  {maxSafeFluidRate.toFixed(1)} mL/h
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
              ⚠️ Lembretes Importantes
            </h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Limite ≤ valor do seu consenso (max_mEq_kg_h)</li>
              <li>• Agitar MUITO BEM a bolsa após adicionar KCl</li>
              <li>• Monitorar ECG em casos graves</li>
              <li>• Verificar K⁺ sérico a cada 12-24h</li>
            </ul>
            {guidance && (
              <div className="text-xs mt-2 text-yellow-700 dark:text-yellow-300">📚 {((guidance as any).refsUsadas || []).join(' • ')}</div>
            )}
          </div>

          {infusionRate > 0.5 && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                🚨 ALERTA DE SEGURANÇA
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200">
                A taxa de infusão calculada ({infusionRate.toFixed(2)} mEq/kg/h) pode exceder o limite máximo do seu consenso. Valide antes de prosseguir.
                <br/><br/>
                <strong>Reduza a taxa de infusão do fluido ou use uma concentração menor de KCl.</strong>
              </p>
            </div>
          )}

          <div className="mt-2">
            <HelpfulTip
              tabs={[
                { id: 'basico', label: 'Básico', markdown: 'NUNCA bolus IV. Concentração da bolsa e taxa por kg são limitadas pelo seu consenso. KCl 19,1% ≈ 2,56 mEq/mL.' },
                { id: 'fisio', label: 'Fisiologia', markdown: 'Na⁺/K⁺-ATPase; insulina e β-agonista movem K⁺ para dentro; acidose desloca K⁺ para fora; ECG nas alterações.' },
                { id: 'lit', label: 'Literatura', markdown: '📚 [CITAR: BSAVA/DiBartola cap./pág.] — personalize no consensos.json.refs' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotassiumCalculator;
