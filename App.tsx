
import React from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GuidePage } from './pages/GuidePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { FormularyPage } from './pages/FormularyPage';
import { ProtocolsPage } from './pages/ProtocolsPage';

import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';

const Header: React.FC = () => {
    const location = useLocation();
    const { theme } = useTheme();

    const getLinkClass = (path: string) => {
        const baseClass = "px-4 py-2 rounded-md text-sm md:text-base font-medium transition-colors duration-300";
        const activeClass = "bg-blue-600 text-white shadow-md";
        const inactiveClass = "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400";
        
        // Match base path for nested routes
        const currentBasePath = '/' + location.pathname.split('/')[1];
        const isPathActive = location.pathname === path || (path !== '/' && currentBasePath === path);

        return `${baseClass} ${isPathActive ? activeClass : inactiveClass}`;
    };

    return (
        <header className="bg-white dark:bg-brand-dark-surface shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <i className="fas fa-tint text-white text-xl"></i>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">VetHidro</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className={getLinkClass('/')}>Início</NavLink>
                            <NavLink to="/calculator" className={getLinkClass('/calculator')}>Calculadora</NavLink>
                            <NavLink to="/guide" className={getLinkClass('/guide')}>Guia</NavLink>
                            <NavLink to="/protocols" className={getLinkClass('/protocols')}>Protocolos</NavLink>
                            <NavLink to="/formulary" className={getLinkClass('/formulary')}>Bulário</NavLink>
                        </div>
                    </div>
                    <div className="flex items-center">
                       <ThemeToggle />
                    </div>
                </div>
            </nav>
        </header>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className="min-h-screen bg-gray-50 dark:bg-brand-dark-bg text-brand-text dark:text-brand-dark-text">
                <Header />
                <main>
                                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/guide/:topic" element={<GuidePage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/protocols" element={<ProtocolsPage />} />
                <Route path="/protocols/:topic" element={<ProtocolsPage />} />
                <Route path="/formulary" element={<FormularyPage />} />
                <Route path="/formulary/:topic" element={<FormularyPage />} />
            </Routes>
                </main>
                <footer className="bg-white dark:bg-brand-dark-surface text-center py-4 mt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Vet Hidro Eletrolítico. Todos os direitos reservados.</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">📜 Ferramenta educacional para profissionais. Ajuste pelo contexto clínico e confira os limites no seu consenso. Monitorização contínua recomendada.</p>
                </footer>
            </div>
        </HashRouter>
    );
};

export default App;
