import React, { useState } from 'react';
import HelpHint from './HelpHint';
import { FLUID_COMPATIBILITY } from '../data/content';

export const FluidCompatibilityChecker: React.FC = () => {
  const [selectedFluid, setSelectedFluid] = useState('');
  const [selectedAdditive, setSelectedAdditive] = useState('');

  const fluidOptions = [
    'NaCl 0.9%',
    'Ringer Lactato', 
    'Plasmalyte',
    'Dextrose 5%',
    'Dextrose 2.5%'
  ];

  const additiveOptions = FLUID_COMPATIBILITY;

  const checkCompatibility = () => {
    if (!selectedFluid || !selectedAdditive) return null;
    
    const additive = additiveOptions.find(a => a.id === selectedAdditive);
    if (!additive) return null;

    const isCompatible = additive.compatible.includes(selectedFluid);
    const isIncompatible = additive.incompatible.includes(selectedFluid);

    return {
      compatible: isCompatible,
      incompatible: isIncompatible,
      warnings: additive.warnings,
      additiveName: additive.name
    };
  };

  const result = checkCompatibility();

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/40 rounded-lg">
        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">🧪 Verificador de Compatibilidade</h4>
        <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
          Verifique a compatibilidade entre fluidos e aditivos antes da administração
          <HelpHint title="Como verificar compatibilidade?" size="popover">
            <ul className="list-disc pl-5">
              <li>NaHCO₃: não misturar com soluções com cálcio (ex.: Ringer Lactato) — precipitado.</li>
              <li>Fosfatos (K/Na): evitar com cálcio — preferir SF 0,9%/D5W.</li>
              <li>MgSO₄: incompatível com bicarbonato; cautela com cálcio (linha separada/flush).</li>
              <li>Dextrose &gt; 5–10%: preferir via central; se periférica, monitorar flebite.</li>
            </ul>
            <div className="mt-2 text-xs opacity-80">Fontes: DiBartola; BSAVA; práticas de compatibilidade IV.</div>
          </HelpHint>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">Fluido Base</label>
          <select 
            value={selectedFluid}
            onChange={(e) => setSelectedFluid(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Selecione o fluido</option>
            {fluidOptions.map(fluid => (
              <option key={fluid} value={fluid}>{fluid}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Aditivo</label>
          <select 
            value={selectedAdditive}
            onChange={(e) => setSelectedAdditive(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Selecione o aditivo</option>
            {additiveOptions.map(additive => (
              <option key={additive.id} value={additive.id}>{additive.name}</option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          {/* Resultado da compatibilidade */}
          <div className={`p-4 rounded-lg border-l-4 ${
            result.compatible && !result.incompatible 
              ? 'bg-green-50 border-green-400 dark:bg-green-900/40' 
              : result.incompatible 
                ? 'bg-red-50 border-red-400 dark:bg-red-900/40'
                : 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/40'
          }`}>
            <div className="flex items-center">
              {result.compatible && !result.incompatible ? (
                <>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-green-800 dark:text-green-200">✅ Compatível</h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {result.additiveName} é compatível com {selectedFluid}
                    </p>
                  </div>
                </>
              ) : result.incompatible ? (
                <>
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-red-800 dark:text-red-200">❌ INCOMPATÍVEL</h5>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      <strong>NÃO misturar!</strong> {result.additiveName} é incompatível com {selectedFluid}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-yellow-800 dark:text-yellow-200">⚠️ Atenção</h5>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
                      Verificar compatibilidade específica
                      <span className="align-middle">
                        <button type="button" className="help-button" aria-label="Como verificar">
                          ?
                        </button>
                      </span>
                    </p>
                    <div className="mt-2 text-xs text-yellow-800 dark:text-yellow-300">
                      <ul className="list-disc ml-5">
                        <li>NaHCO₃ não misturar com fluidos que contenham cálcio (ex.: Ringer Lactato) — risco de precipitado.</li>
                        <li>Fosfatos (K/Na) evitar com cálcio — usar SF 0,9% ou D5W.</li>
                        <li>MgSO₄ é incompatível com bicarbonato; preferir SF 0,9%/D5W e linha separada/flush.</li>
                        <li>Dextrose &gt; 5–10%: preferir via central; em periférica, infundir lentamente e monitorar.</li>
                      </ul>
                      <div className="mt-1 opacity-80">Fontes: DiBartola; BSAVA; práticas de compatibilidade IV.</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Avisos importantes */}
          {result.warnings.length > 0 && (
            <div className="p-4 bg-orange-50 dark:bg-orange-900/40 rounded-lg">
              <h5 className="font-bold text-orange-800 dark:text-orange-200 mb-2">⚠️ Avisos Importantes:</h5>
              <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
                {result.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instruções de preparo */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-2">📋 Instruções de Preparo:</h5>
            <ol className="space-y-1 text-sm text-gray-700 dark:text-gray-300 list-decimal list-inside">
              <li>Verificar compatibilidade antes de misturar</li>
              <li>Calcular dose e volume necessários</li>
              <li>Adicionar aditivo ao fluido (nunca o contrário)</li>
              <li>Misturar suavemente por inversão</li>
              <li>Verificar ausência de precipitados</li>
              <li>Etiquetar com conteúdo, concentração e horário</li>
              <li>Administrar conforme taxa prescrita</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
