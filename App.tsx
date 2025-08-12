
import React from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GuidePage } from './pages/GuidePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { FormularyPage } from './pages/FormularyPage';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';

const Header: React.FC = () => {
    const location = useLocation();
    const { theme } = useTheme();

    const getLinkClass = (path: string) => {
        const baseClass = "px-4 py-2 rounded-md text-sm md:text-base font-medium transition-colors duration-300";
        const activeClass = "bg-brand-orange-dark text-white shadow-md";
        const inactiveClass = "text-brand-text dark:text-brand-dark-text hover:bg-brand-orange-light dark:hover:bg-brand-dark-surface";
        
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
                            <i className="fas fa-tint text-brand-orange-dark text-3xl"></i>
                            <span className="text-xl font-bold text-brand-text dark:text-brand-dark-text hidden sm:block">Vet Hidro</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className={getLinkClass('/')}>Início</NavLink>
                            <NavLink to="/calculator" className={getLinkClass('/calculator')}>Calculadora</NavLink>
                            <NavLink to="/guide" className={getLinkClass('/guide')}>Guia</NavLink>
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
                        <Route path="/formulary" element={<FormularyPage />} />
                        <Route path="/formulary/:topic" element={<FormularyPage />} />
                    </Routes>
                </main>
                <footer className="bg-white dark:bg-brand-dark-surface text-center py-4 mt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Vet Hidro Eletrolítico. Todos os direitos reservados.</p>
                </footer>
            </div>
        </HashRouter>
    );
};

export default App;
