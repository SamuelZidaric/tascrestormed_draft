
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCw, Download } from 'lucide-react';
import { partners, projects } from '../data';
import { Partner } from '../types';
import { MultiSelectDropdown, Badge } from './ui';
import { exportPartnersToExcel } from '../utils/exportUtils';
import { COUNTRIES, PARTNER_TYPES, MISSION_PILLARS, MISSION_OBJECTIVES, TECHNOLOGY_PILLARS } from '../constants';

export const PartnerDirectory: React.FC = () => {
    const [filters, setFilters] = useState({
        search: '',
        country: [] as string[],
        type: [] as string[],
        pillars: [] as string[],
        objectives: [] as string[],
        technologies: [] as string[],
    });
    const navigate = useNavigate();

    const filteredPartners = useMemo(() => {
        return partners.filter(partner => {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch = partner.name.toLowerCase().includes(searchLower) || partner.acronym.toLowerCase().includes(searchLower);

            const matchesCountry = filters.country.length === 0 || filters.country.includes(partner.country);
            const matchesType = filters.type.length === 0 || filters.type.includes(partner.type);

            const partnerProjects = projects.filter(p => partner.projectIds.includes(p.id));
            const partnerPillars = new Set(partnerProjects.flatMap(p => p.mission_pillars));
            const partnerObjectives = new Set(partnerProjects.flatMap(p => p.mission_objectives));
            const partnerTechnologies = new Set(partnerProjects.flatMap(p => p.technologies));

            const matchesPillars = filters.pillars.length === 0 || filters.pillars.every(p => partnerPillars.has(p));
            const matchesObjectives = filters.objectives.length === 0 || filters.objectives.every(o => partnerObjectives.has(o));
            const matchesTechnologies = filters.technologies.length === 0 || filters.technologies.every(t => partnerTechnologies.has(t));

            return matchesSearch && matchesCountry && matchesType && matchesPillars && matchesObjectives && matchesTechnologies;
        });
    }, [filters]);

    const handleFilterChange = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({ search: '', country: [], type: [], pillars: [], objectives: [], technologies: [] });
    };

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div className="lg:col-span-2">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Partners</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="search"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Search by name or acronym..."
                                value={filters.search}
                                onChange={e => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-start md:justify-end lg:col-span-2">
                        <button onClick={() => exportPartnersToExcel(filteredPartners)} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 text-sm">
                            <Download className="h-4 w-4" /> Export
                        </button>
                        <button onClick={resetFilters} className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2 text-sm">
                            <RotateCw className="h-4 w-4" /> Reset
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                    <MultiSelectDropdown label="Country" options={COUNTRIES} selected={filters.country} onChange={v => handleFilterChange('country', v)} />
                    <MultiSelectDropdown label="Type" options={PARTNER_TYPES} selected={filters.type} onChange={v => handleFilterChange('type', v)} />
                    <MultiSelectDropdown label="Mission Pillar" options={MISSION_PILLARS} selected={filters.pillars} onChange={v => handleFilterChange('pillars', v)} />
                    <MultiSelectDropdown label="Mission Objective" options={MISSION_OBJECTIVES} selected={filters.objectives} onChange={v => handleFilterChange('objectives', v)} />
                    <MultiSelectDropdown label="Technology Pillar" options={TECHNOLOGY_PILLARS} selected={filters.technologies} onChange={v => handleFilterChange('technologies', v)} />
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"># Projects</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pillars Involved In</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPartners.map(p => {
                                const partnerProjects = projects.filter(proj => p.projectIds.includes(proj.id));
                                const partnerPillars = [...new Set(partnerProjects.flatMap(proj => proj.mission_pillars))];
                                return (
                                <tr key={p.name} onClick={() => navigate(`/partner/${encodeURIComponent(p.name)}`)} className="hover:bg-gray-50 cursor-pointer">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                                        <div className="text-sm text-gray-500">{p.acronym} ({p.country})</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge color="purple">{p.type}</Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-center">
                                        {p.projectIds.length}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {partnerPillars.map(pillar => <Badge key={pillar} color="indigo">{pillar}</Badge>)}
                                        </div>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                     {filteredPartners.length === 0 && <div className="text-center py-8 text-gray-500">No partners found.</div>}
                </div>
            </div>
        </div>
    );
};
