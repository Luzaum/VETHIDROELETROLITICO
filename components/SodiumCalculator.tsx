import React, { useState } from 'react';

interface SodiumCalculatorProps {
  className?: string;
}

const SodiumCalculator: React.FC<SodiumCalculatorProps> = ({ className = '' }) => {
  const [weight, setWeight] = useState<number>(0);
  const [currentSodium, setCurrentSodium] = useState<number>(0);
  const [targetSodium, setTargetSodium] = useState<number>(145);
  const [fluidSodium, setFluidSodium] = useState<number>(154);
  const [desiredRate, setDesiredRate] = useState<number>(0.5);
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');

  const calculateSodiumDeficit = () => {
    if (weight <= 0 || currentSodium <= 0) return 0;
    const ACT = 0.6 * weight;
    return (targetSodium - currentSodium) * ACT;
  };

  const calculateInfusionRate = () => {
    if (weight <= 0 || currentSodium <= 0 || fluidSodium <= currentSodium) return 0;
    const ACT = 0.6 * weight;
    const rateLh = (desiredRate * (ACT + 1)) / (fluidSodium - currentSodium);
    return rateLh * 1000; // Convert to mL/h
  };

  const calculateWaterDeficit = () => {
    if (weight <= 0 || currentSodium <= 0) return 0;
    const ACT = 0.6 * weight;
    const normalSodium = species === 'dog' ? 145 : 155;
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
        🧮 Calculadora de Sódio
      </h2>

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
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: 10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sódio Atual (mEq/L)
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
            </label>
            <select
              value={fluidSodium}
              onChange={(e) => setFluidSodium(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={0}>D5W (0)</option>
              <option value={77}>NaCl 0.45% (77)</option>
              <option value={130}>Ringer Lactato (130)</option>
              <option value={154}>NaCl 0.9% (154)</option>
              <option value={513}>NaCl 3% (513)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Taxa Desejada (mEq/L/h)
            </label>
            <input
              type="number"
              value={desiredRate}
              onChange={(e) => setDesiredRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: 0.5"
              step="0.1"
            />
          </div>
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
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
              ⚠️ Lembretes Importantes
            </h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Não exceder 0.5 mEq/L/hora de correção</li>
              <li>• Máximo 12 mEq/L em 24 horas</li>
              <li>• Monitorar sódio a cada 2-4h inicialmente</li>
              <li>• Avaliar estado neurológico constantemente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SodiumCalculator;
