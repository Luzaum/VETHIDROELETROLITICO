
import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  linkTo: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, linkTo }) => (
  <Link to={linkTo} className="block group">
    <div className="bg-white dark:bg-brand-dark-surface rounded-lg shadow-lg p-8 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
        <i className={`${icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-brand-text dark:text-brand-dark-text">{description}</p>
    </div>
  </Link>
);

export const HomePage: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-brand-dark-bg">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Bem-vindo ao <span className="text-blue-600">VetHidro</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Seu companheiro de plantão para o manejo seguro e eficaz de distúrbios hidroeletrolíticos e equilíbrio ácido-base em medicina veterinária.
          </p>
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/40 rounded-lg max-w-4xl mx-auto">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              ✨ <strong>Novo:</strong> Calculadoras expandidas, protocolos de doenças, compatibilidade de fluidos e considerações para diferentes estados fisiológicos!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon="fas fa-calculator"
            title="Calculadora de Reposição"
            description="Calcule com precisão as necessidades de reposição de eletrólitos, fluidos e outros componentes para seus pacientes."
            linkTo="/calculator"
          />
          <FeatureCard
            icon="fas fa-book-open"
            title="Guia Hidroeletrolítico"
            description="Consulte informações detalhadas sobre eletrólitos, fisiologia e interpretação laboratorial."
            linkTo="/guide"
          />
          <FeatureCard
            icon="fas fa-hospital"
            title="Protocolos de Doenças"
            description="Protocolos terapêuticos para doenças que alteram eletrólitos: Addison, CAD, DRC e mais."
            linkTo="/protocols"
          />
          <FeatureCard
            icon="fas fa-pills"
            title="Bulário Veterinário"
            description="Informações sobre medicamentos, soluções e compatibilidade de fluidos IV."
            linkTo="/formulary"
          />
        </div>
        
        {/* Seção de recursos adicionais */}
        <div className="mt-16 bg-white dark:bg-brand-dark-surface rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            🩺 Recursos do VetHidro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-flask text-green-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">7 Eletrólitos Completos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Na⁺, K⁺, Cl⁻, Ca²⁺, Mg²⁺, P, HCO₃⁻ e Glicemia</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-user-md text-blue-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Estados Fisiológicos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Filhote, Adulto, Idoso, Gestante, Lactante</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-shield-alt text-purple-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Segurança Clínica</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Alertas, compatibilidade e taxas máximas</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-heartbeat text-orange-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Protocolos de Emergência</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">CAD, Addison, DRC, Síndrome de Realimentação</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-vial text-red-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Compatibilidade IV</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Verificador de incompatibilidades de fluidos</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/40 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-calculator text-teal-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Cálculos Precisos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Fórmulas validadas pela literatura veterinária</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Desenvolvido por veterinários, para veterinários. Baseado na literatura científica mais atual.
          </p>
          <Link 
            to="/calculator" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Começar Agora
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
