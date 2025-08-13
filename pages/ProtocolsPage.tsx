import React from 'react';
import { useParams } from 'react-router-dom';
import { ContentRenderer } from '../components/ContentRenderer';
import { DISEASE_PROTOCOLS } from '../data/content';

export const ProtocolsPage: React.FC = () => {
  const { topic } = useParams<{ topic?: string }>();

  if (topic) {
    const protocol = DISEASE_PROTOCOLS.find(p => p.id === topic);
    if (!protocol) {
      return (
        <div className="container mx-auto mt-8 px-4 pb-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Protocolo não encontrado</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">O protocolo solicitado não foi encontrado.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto mt-8 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-brand-dark-surface p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {protocol.electrolytes.map((electrolyte, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    {electrolyte}
                  </span>
                ))}
              </div>
            </div>
            <ContentRenderer blocks={protocol.content} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Protocolos de Doenças</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Protocolos terapêuticos para doenças que alteram eletrólitos</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {DISEASE_PROTOCOLS.map((protocol) => (
          <div key={protocol.id} className="bg-white dark:bg-brand-dark-surface p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{protocol.name}</h3>
              <div className="flex flex-wrap gap-2">
                {protocol.electrolytes.map((electrolyte, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 text-xs rounded-full">
                    {electrolyte}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {protocol.id === 'addison' && 'Deficiência de mineralocorticoides e glicocorticoides. Relação Na⁺/K⁺ < 27 é altamente sugestiva.'}
                {protocol.id === 'dka' && 'Complicação do diabetes com hiperglicemia, cetose e acidose metabólica. Requer tratamento em fases.'}
                {protocol.id === 'ckd' && 'Alterações eletrolíticas progressivas. Foco no controle de fósforo e correção da acidose.'}
                {protocol.id === 'refeeding' && 'Deslocamento intracelular de eletrólitos após jejum. Prevenção é fundamental.'}
              </p>
            </div>
            
            <a 
              href={`#/protocols/${protocol.id}`}
              className="inline-flex items-center px-4 py-2 bg-brand-orange-dark text-white rounded-md hover:bg-brand-orange-light transition-colors"
            >
              Ver Protocolo Completo
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-blue-50 dark:bg-blue-900/40 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">💡 Como Usar os Protocolos</h2>
        <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
          <p><strong>1. Identificação:</strong> Use os achados laboratoriais típicos para suspeitar da doença</p>
          <p><strong>2. Tratamento de Emergência:</strong> Siga os protocolos de estabilização imediata</p>
          <p><strong>3. Monitoramento:</strong> Reavalie eletrólitos conforme indicado em cada protocolo</p>
          <p><strong>4. Tratamento de Longo Prazo:</strong> Implemente terapias de manutenção quando indicado</p>
        </div>
      </div>
    </div>
  );
};
