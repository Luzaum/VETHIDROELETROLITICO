import React, { useState } from 'react';

interface PotassiumCalculatorProps {
  className?: string;
}

const PotassiumCalculator: React.FC<PotassiumCalculatorProps> = ({ className = '' }) => {
  const [weight, setWeight] = useState<number>(0);
  const [currentPotassium, setCurrentPotassium] = useState<number>(0);
  const [fluidRate, setFluidRate] = useState<number>(0);
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');

  // Tabela de reposição de potássio baseada no guia fornecido
  const getPotassiumSupplementation = (serumK: number) => {
    if (serumK < 2.0) return { kclPerLiter: 80, maxFluidRate: 6 };
    if (serumK >= 2.1 && serumK <= 2.5) return { kclPerLiter: 60, maxFluidRate: 8 };
    if (serumK >= 2.6 && serumK <= 3.0) return { kclPerLiter: 40, maxFluidRate: 12 };
    if (serumK >= 3.1 && serumK <= 3.5) return { kclPerLiter: 28, maxFluidRate: 18 };
    if (serumK >= 3.6 && serumK <= 5.0) return { kclPerLiter: 20, maxFluidRate: 25 };
    return { kclPerLiter: 0, maxFluidRate: 0 };
  };

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

  const calculateInfusionRate = () => {
    if (weight <= 0 || currentPotassium <= 0 || fluidRate <= 0) return 0;
    
    const { kclPerLiter, maxFluidRate } = getPotassiumSupplementation(currentPotassium);
    const kclPerHour = (kclPerLiter * fluidRate) / 1000; // Convert mL/h to L/h
    const kclPerKgPerHour = kclPerHour / weight;
    
    return kclPerKgPerHour;
  };

  const getMaxSafeFluidRate = () => {
    if (weight <= 0 || currentPotassium <= 0) return 0;
    const { maxFluidRate } = getPotassiumSupplementation(currentPotassium);
    return maxFluidRate * weight;
  };

  const potassiumStatus = getPotassiumStatus();
  const infusionRate = calculateInfusionRate();
  const maxSafeFluidRate = getMaxSafeFluidRate();
  const { kclPerLiter } = getPotassiumSupplementation(currentPotassium);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        ⚡ Calculadora Prática de Potássio
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Use a tabela padrão para reposição segura de potássio IV
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
              Potássio Atual (mEq/L)
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
                  {kclPerLiter} mEq/L
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
              <li>• NUNCA exceder 0.5 mEq/kg/hora de K⁺</li>
              <li>• Agitar MUITO BEM a bolsa após adicionar KCl</li>
              <li>• Monitorar ECG em casos graves</li>
              <li>• Verificar K⁺ sérico a cada 12-24h</li>
            </ul>
          </div>

          {infusionRate > 0.5 && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                🚨 ALERTA DE SEGURANÇA
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200">
                A taxa de infusão calculada ({infusionRate.toFixed(2)} mEq/kg/h) EXCEDE o limite máximo seguro de 0.5 mEq/kg/hora!
                <br/><br/>
                <strong>Reduza a taxa de infusão do fluido ou use uma concentração menor de KCl.</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PotassiumCalculator;
