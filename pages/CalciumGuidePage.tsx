import React from 'react';
import { ContentRenderer } from '../components/ContentRenderer';
import { CALCIUM_GUIDE_CONTENT } from '../data/calcium_guide';

const CalciumGuidePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🏛️ Cálcio (Ca²⁺): O Pilar da Contração e Sinalização
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Guia de Emergência para Cães e Gatos
          </p>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ContentRenderer content={CALCIUM_GUIDE_CONTENT} />
        </div>
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Dica Clínica
          </h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Este guia foi baseado nas melhores práticas clínicas e literatura veterinária atual.
            Sempre consulte um veterinário especializado em casos complexos ou quando houver dúvidas sobre o tratamento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalciumGuidePage;
