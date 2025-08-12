
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
      <div className="text-5xl text-brand-orange-dark mb-4">
        <i className={icon}></i>
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
            Bem-vindo ao <span className="text-brand-orange-dark">Vet Hidro</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Sua ferramenta completa para o manejo de distúrbios hidroeletrolíticos em cães e gatos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="fas fa-calculator"
            title="Calculadora de Reposição"
            description="Calcule com precisão as necessidades de reposição de eletrólitos, fluidos e outros componentes para seus pacientes."
            linkTo="/calculator"
          />
          <FeatureCard
            icon="fas fa-book-open"
            title="Guia Hidroeletrolítico"
            description="Consulte um guia detalhado sobre a fisiopatologia, diagnóstico e tratamento dos principais distúrbios eletrolíticos."
            linkTo="/guide"
          />
          <FeatureCard
            icon="fas fa-pills"
            title="Bulário de Reposição"
            description="Acesse informações essenciais sobre os fármacos e soluções mais utilizados na terapia de reposição."
            linkTo="/formulary"
          />
        </div>
      </div>
    </div>
  );
};
