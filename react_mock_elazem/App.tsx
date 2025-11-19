
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layers, Users, Home } from 'lucide-react';
import { ProjectExplorer } from './components/ProjectExplorer';
import { PartnerDirectory } from './components/PartnerDirectory';
import { ProjectDetail } from './components/ProjectDetail';
import { PartnerDetail } from './components/PartnerDetail';

const Header: React.FC = () => {
    const location = useLocation();
    const navItems = [
        { path: '/', label: 'Project Explorer', icon: <Layers className="h-4 w-4" /> },
        { path: '/partners', label: 'Partner Directory', icon: <Users className="h-4 w-4" /> },
    ];

    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Home className="h-8 w-8 text-blue-600" />
                        <h1 className="ml-3 text-xl font-bold text-gray-800">TASC-RestoreMed</h1>
                    </div>
                    <nav className="hidden md:flex md:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 border-b-2 px-1 pt-1 text-sm font-medium ${
                                    location.pathname === item.path
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<ProjectExplorer />} />
              <Route path="/partners" element={<PartnerDirectory />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              <Route path="/partner/:partnerName" element={<PartnerDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
