
import React from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ELECTROLYTE_LIBRARY } from '../data/content';
import { ContentRenderer } from '../components/ContentRenderer';
import AlbuminCalculator from '../components/AlbuminCalculator';

const GuideContent: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  
  if (!topic) {
    return (
      <div className="text-center p-8">
        <i className="fas fa-arrow-left text-4xl text-brand-orange-dark mb-4"></i>
        <h2 className="text-2xl font-bold">Selecione um tópico</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Escolha um eletrólito no menu à esquerda para ver os detalhes.</p>
      </div>
    );
  }

  const data = ELECTROLYTE_LIBRARY.find(e => e.id === topic);

  if (!data) {
    return <div className="text-center p-8"><h2>Tópico não encontrado.</h2></div>;
  }

  return (
    <div className="p-6 md:p-8 relative">
       <button onClick={() => navigate('/guide')} className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm font-medium py-1 px-3 rounded-lg transition-colors z-10">
        <i className="fas fa-arrow-left mr-2"></i>Voltar
      </button>

      <div className="bg-brand-orange-light dark:bg-brand-dark-surface p-4 rounded-lg mb-6 flex flex-col md:flex-row justify-around text-center">
        <div>
          <h3 className="font-bold text-gray-700 dark:text-gray-200">Valores Normais (Cão)</h3>
          <p className="text-brand-text dark:text-brand-dark-text">{data.normalValues.dog}</p>
        </div>
        <div className="mt-2 md:mt-0">
          <h3 className="font-bold text-gray-700 dark:text-gray-200">Valores Normais (Gato)</h3>
          <p className="text-brand-text dark:text-brand-dark-text">{data.normalValues.cat}</p>
        </div>
      </div>
      <ContentRenderer blocks={data.content} />
      {/* Secção de Albumina (HSA) opcional abaixo do conteúdo padrão */}
      <div className="mt-10">
        <AlbuminCalculator />
      </div>
    </div>
  );
};


export const GuidePage: React.FC = () => {
  const getLinkClass = (isActive: boolean) => {
    const base = "block w-full text-left px-4 py-3 rounded-md transition-colors duration-200";
    return isActive 
      ? `${base} bg-brand-orange text-white font-semibold shadow` 
      : `${base} hover:bg-brand-orange-light dark:hover:bg-brand-dark-surface`;
  };

  return (
    <div className="container mx-auto mt-8 px-4 pb-12">
       <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Guia Hidroeletrolítico</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Aprofunde seu conhecimento sobre os distúrbios eletrolíticos.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white dark:bg-brand-dark-surface rounded-lg shadow p-4 sticky top-24">
            <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-600">Eletrólitos</h3>
            <nav className="space-y-2">
              {ELECTROLYTE_LIBRARY.map(item => (
                <NavLink key={item.id} to={`/guide/${item.id}`} className={({ isActive }) => getLinkClass(isActive)}>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5 bg-white dark:bg-brand-dark-surface rounded-lg shadow-lg overflow-hidden min-h-[60vh]">
           <GuideContent />
           <Outlet />
        </main>
      </div>
    </div>
  );
};
