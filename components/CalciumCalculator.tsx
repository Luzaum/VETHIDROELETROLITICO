import React, { useEffect, useState } from 'react';

interface PatientBasics {
  species: 'dog' | 'cat';
  weight: number;
}

interface CalciumCalculatorProps {
  className?: string;
  patient?: PatientBasics;
}

const CalciumCalculator: React.FC<CalciumCalculatorProps> = ({ className = '', patient }) => {
  const [weight, setWeight] = useState<number>(0);
  const [totalCalcium, setTotalCalcium] = useState<number>(0);
  const [ionizedCalcium, setIonizedCalcium] = useState<number>(0);
  const [albumin, setAlbumin] = useState<number>(0);
  const [phosphorusStr, setPhosphorusStr] = useState<string>('');
  const [phosphorusUnit, setPhosphorusUnit] = useState<'mg/dL'|'mmol/L'>('mg/dL');
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [hasIonizedCalcium, setHasIonizedCalcium] = useState<boolean>(false);

  useEffect(() => {
    if (!patient) return;
    if (typeof patient.weight === 'number') setWeight(patient.weight || 0);
    if (patient.species) setSpecies(patient.species);
  }, [patient]);

  // Valores normais de referência
  const getNormalValues = () => {
    if (species === 'dog') {
      return {
        totalCalcium: { min: 8.5, max: 11.5 },
        ionizedCalcium: { min: 1.1, max: 1.4 }
      };
    } else {
      return {
        totalCalcium: { min: 8.0, max: 11.0 },
        ionizedCalcium: { min: 1.1, max: 1.4 }
      };
    }
  };

  // Calcular cálcio corrigido pela albumina
  const calculateCorrectedCalcium = () => {
    if (totalCalcium <= 0 || albumin <= 0) return 0;
    return totalCalcium - albumin + 3.5;
  };

  // Determinar status do cálcio
  const getCalciumStatus = () => {
    const normalValues = getNormalValues();
    const correctedCalcium = calculateCorrectedCalcium();
    const calciumToUse = hasIonizedCalcium ? ionizedCalcium * 4 : correctedCalcium; // Converter mmol/L para mg/dL

    if (hasIonizedCalcium) {
      if (ionizedCalcium < 1.1) {
        if (ionizedCalcium < 0.8) return { status: 'Hipocalcemia', severity: 'Grave', color: 'text-red-600' };
        if (ionizedCalcium < 1.0) return { status: 'Hipocalcemia', severity: 'Moderada', color: 'text-orange-600' };
        return { status: 'Hipocalcemia', severity: 'Leve', color: 'text-yellow-600' };
      }
      if (ionizedCalcium > 1.4) {
        if (ionizedCalcium > 1.8) return { status: 'Hipercalcemia', severity: 'Grave', color: 'text-red-600' };
        if (ionizedCalcium > 1.6) return { status: 'Hipercalcemia', severity: 'Moderada', color: 'text-orange-600' };
        return { status: 'Hipercalcemia', severity: 'Leve', color: 'text-yellow-600' };
      }
    } else {
      if (correctedCalcium < normalValues.totalCalcium.min) {
        if (correctedCalcium < 7.0) return { status: 'Hipocalcemia', severity: 'Grave', color: 'text-red-600' };
        if (correctedCalcium < 8.0) return { status: 'Hipocalcemia', severity: 'Moderada', color: 'text-orange-600' };
        return { status: 'Hipocalcemia', severity: 'Leve', color: 'text-yellow-600' };
      }
      if (correctedCalcium > normalValues.totalCalcium.max) {
        if (correctedCalcium > 15.0) return { status: 'Hipercalcemia', severity: 'Grave', color: 'text-red-600' };
        if (correctedCalcium > 13.0) return { status: 'Hipercalcemia', severity: 'Moderada', color: 'text-orange-600' };
        return { status: 'Hipercalcemia', severity: 'Leve', color: 'text-yellow-600' };
      }
    }
    return { status: 'Normal', severity: '', color: 'text-green-600' };
  };

  // Utilitários de unidade
  const convertPToMgDl = (value: number, unit: 'mg/dL'|'mmol/L') => {
    if (Number.isNaN(value)) return 0;
    // 1 mg/dL ≈ 0.323 mmol/L → mg/dL = mmol/L / 0.323
    return unit === 'mg/dL' ? value : value / 0.323;
  };

  // Calcular produto Ca x P
  const calculateCaPProduct = () => {
    const calciumToUse = hasIonizedCalcium ? ionizedCalcium * 4 : calculateCorrectedCalcium();
    const pNum = Number(String(phosphorusStr).replace(',', '.'));
    const pMgDl = convertPToMgDl(pNum, phosphorusUnit);
    return calciumToUse * (Number.isNaN(pMgDl) ? 0 : pMgDl);
  };

  // Calcular dose de gluconato de cálcio
  const calculateCalciumDose = () => {
    if (weight <= 0) return { bolus: 0, cri: 0 };
    const bolus = weight * 0.5; // 0.5 mL/kg
    const cri = weight * 60; // 60 mg/kg
    return { bolus: bolus.toFixed(1), cri: cri.toFixed(0) };
  };

  const calciumStatus = getCalciumStatus();
  const correctedCalcium = calculateCorrectedCalcium();
  const caPProduct = calculateCaPProduct();
  const calciumDose = calculateCalciumDose();
  const normalValues = getNormalValues();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🏛️ Calculadora Prática de Cálcio
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Correção pela albumina, doses de emergência e produto Ca×P
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          {/* Espécie e peso removidos: já definidos em "Dados do Paciente" */}

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasIonizedCalcium}
                onChange={(e) => setHasIonizedCalcium(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tenho Cálcio Ionizado
              </span>
            </label>
          </div>

          {hasIonizedCalcium ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cálcio Ionizado (mmol/L)
              </label>
              <input
                type="number"
                value={ionizedCalcium}
                onChange={(e) => setIonizedCalcium(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: 1.2"
                step="0.1"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cálcio Total (mg/dL)
                </label>
                <input
                  type="number"
                  value={totalCalcium}
                  onChange={(e) => setTotalCalcium(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ex: 9.5"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Albumina (g/dL)
                </label>
                <input
                  type="number"
                  value={albumin}
                  onChange={(e) => setAlbumin(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ex: 2.8"
                  step="0.1"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fósforo
            </label>
            <div className="flex gap-2">
              <input
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                value={phosphorusStr}
                onChange={(e) => setPhosphorusStr(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: 4.5"
              />
              <select value={phosphorusUnit} onChange={(e)=> setPhosphorusUnit(e.target.value as any)} className="px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="mg/dL">mg/dL</option>
                <option value="mmol/L">mmol/L</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📊 Status do Cálcio
            </h3>
            <div className={`text-xl font-bold ${calciumStatus.color}`}>
              {calciumStatus.status} {calciumStatus.severity && `(${calciumStatus.severity})`}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {hasIonizedCalcium 
                ? `Faixa normal iCa²⁺: ${normalValues.ionizedCalcium.min}-${normalValues.ionizedCalcium.max} mmol/L`
                : `Faixa normal Ca total: ${normalValues.totalCalcium.min}-${normalValues.totalCalcium.max} mg/dL`
              }
            </p>
            {!hasIonizedCalcium && correctedCalcium > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Ca corrigido: {correctedCalcium.toFixed(1)} mg/dL
              </p>
            )}
          </div>

          {caPProduct > 0 && (
            <div className={`rounded-lg p-4 ${caPProduct > 70 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
              <h3 className="text-lg font-semibold mb-3">
                ⚠️ Produto Ca × P
              </h3>
              <div className={`text-xl font-bold ${caPProduct > 70 ? 'text-red-600' : 'text-green-600'}`}>
                {caPProduct.toFixed(1)}
              </div>
              <p className="text-sm mt-1">
                {caPProduct > 70 
                  ? '🚨 ALTO RISCO de mineralização de tecidos moles!'
                  : '✅ Risco baixo de mineralização'
                }
              </p>
            </div>
          )}

          {calciumStatus.status === 'Hipocalcemia' && weight > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                💉 Tratamento de Emergência
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Gluconato de Cálcio 10% (Bolus):
                  </div>
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    {calciumDose.bolus} mL IV LENTAMENTE (10-20 min)
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    CRI (6-8h):
                  </div>
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    {calciumDose.cri} mg em fluidos
                  </div>
                </div>
              </div>
            </div>
          )}

          {calciumStatus.status === 'Hipercalcemia' && (
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
                💧 Tratamento da Hipercalcemia
              </h3>
              <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                <li>• NaCl 0,9% 2-3x taxa de manutenção</li>
                <li>• Furosemida (após reidratação)</li>
                <li>• Corticoides (se indicado)</li>
                <li>• Bifosfonatos (casos refratários)</li>
                <li>• Tratar causa base</li>
              </ul>
            </div>
          )}

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
              ⚠️ Lembretes Importantes
            </h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Sempre medir cálcio ionizado quando possível</li>
              <li>• Corrigir cálcio total pela albumina</li>
              <li>• Monitorar ECG durante infusão de cálcio</li>
              <li>• NUNCA administrar cálcio SC</li>
              <li>• Produto Ca×P {"<"} 70 para evitar mineralização</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalciumCalculator;
