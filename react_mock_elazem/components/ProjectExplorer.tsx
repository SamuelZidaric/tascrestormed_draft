
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, RotateCw, Download, Columns } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';
import { MultiSelectDropdown, Badge, Modal } from './ui';
import { exportProjectsToExcel } from '../utils/exportUtils';
import { MISSION_PILLARS, MISSION_OBJECTIVES, TOPIC_CLUSTERS, TECHNOLOGY_PILLARS, PROJECT_STATUSES, MISSION_ZONES } from '../constants';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const DashboardCharts: React.FC<{ data: Project[] }> = ({ data }) => {
    const projectsByPillar = useMemo(() => {
        const counts: { [key: string]: number } = {};
        data.forEach(p => {
            p.mission_pillars.forEach(pillar => {
                counts[pillar] = (counts[pillar] || 0) + 1;
            });
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [data]);

    const projectsByCountry = useMemo(() => {
        const counts: { [key: string]: number } = {};
        data.forEach(p => {
            counts[p.country] = (counts[p.country] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [data]);

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-2">Projects by Mission Pillar</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={projectsByPillar}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#3b82f6" name="Projects" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-2">Projects by Country</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={projectsByCountry} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {projectsByCountry.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const CompareModal: React.FC<{ projects: Project[], onClose: () => void }> = ({ projects, onClose }) => {
    const properties: (keyof Project)[] = ['status', 'start_date', 'end_date', 'country', 'lead_partner', 'mission_pillars', 'mission_objectives', 'technologies', 'funding'];

    return (
        <Modal isOpen={true} onClose={onClose} title="Compare Selected Projects">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Property</th>
                            {projects.map(p => <th key={p.id} scope="col" className="px-6 py-3">{p.acronym}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(prop => (
                            <tr key={prop} className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                                    {prop.replace(/_/g, ' ')}
                                </th>
                                {projects.map(p => (
                                    <td key={p.id} className="px-6 py-4">
                                        {Array.isArray(p[prop]) ? (p[prop] as string[]).join(', ') : p[prop]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
};

export const ProjectExplorer: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: [] as string[],
    pillars: [] as string[],
    objectives: [] as string[],
    clusters: [] as string[],
    technologies: [] as string[],
    zones: [] as string[],
  });
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isCompareModalOpen, setCompareModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(searchLower) ||
        p.acronym.toLowerCase().includes(searchLower) ||
        p.lead_partner.toLowerCase().includes(searchLower) ||
        p.partners.some(partner => partner.toLowerCase().includes(searchLower));

      const matchesStatus = filters.status.length === 0 || filters.status.includes(p.status);
      const matchesPillars = filters.pillars.length === 0 || filters.pillars.every(pillar => p.mission_pillars.includes(pillar));
      const matchesObjectives = filters.objectives.length === 0 || filters.objectives.every(obj => p.mission_objectives.includes(obj));
      const matchesClusters = filters.clusters.length === 0 || filters.clusters.every(c => p.clusters.includes(c));
      const matchesTechnologies = filters.technologies.length === 0 || filters.technologies.every(t => p.technologies.includes(t));
      const matchesZones = filters.zones.length === 0 || filters.zones.includes(p.mission_zone);

      return matchesSearch && matchesStatus && matchesPillars && matchesObjectives && matchesClusters && matchesTechnologies && matchesZones;
    });
  }, [filters]);
  
  const handleFilterChange = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: '', status: [], pillars: [], objectives: [], clusters: [], technologies: [], zones: [] });
    setSelectedProjects([]);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId]
    );
  };
  
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProjects(filteredProjects.map(p => p.id));
    } else {
      setSelectedProjects([]);
    }
  };

  return (
    <div>
        {isCompareModalOpen && selectedProjects.length > 0 && (
            <CompareModal
                projects={projects.filter(p => selectedProjects.includes(p.id))}
                onClose={() => setCompareModalOpen(false)}
            />
        )}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="lg:col-span-2">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">Advanced Search</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="search"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Search by title, acronym, partner..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-start md:justify-end lg:col-span-2">
                     <button onClick={() => setCompareModalOpen(true)} disabled={selectedProjects.length < 2} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 text-sm disabled:bg-gray-400">
                        <Columns className="h-4 w-4" /> Compare Selected
                    </button>
                    <button onClick={() => exportProjectsToExcel(filteredProjects)} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 text-sm">
                        <Download className="h-4 w-4" /> Export
                    </button>
                    <button onClick={resetFilters} className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2 text-sm">
                        <RotateCw className="h-4 w-4" /> Reset
                    </button>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
                <MultiSelectDropdown label="Status" options={PROJECT_STATUSES} selected={filters.status} onChange={v => handleFilterChange('status', v)} />
                <MultiSelectDropdown label="Mission Pillar" options={MISSION_PILLARS} selected={filters.pillars} onChange={v => handleFilterChange('pillars', v)} />
                <MultiSelectDropdown label="Mission Objective" options={MISSION_OBJECTIVES} selected={filters.objectives} onChange={v => handleFilterChange('objectives', v)} />
                <MultiSelectDropdown label="Topic Cluster" options={TOPIC_CLUSTERS} selected={filters.clusters} onChange={v => handleFilterChange('clusters', v)} />
                <MultiSelectDropdown label="Technology Pillar" options={TECHNOLOGY_PILLARS} selected={filters.technologies} onChange={v => handleFilterChange('technologies', v)} />
                <MultiSelectDropdown label="Mission Zone" options={MISSION_ZONES} selected={filters.zones} onChange={v => handleFilterChange('zones', v)} />
            </div>
        </div>

        <DashboardCharts data={filteredProjects} />

        <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4">
                                <input type="checkbox" onChange={handleSelectAll} checked={selectedProjects.length > 0 && selectedProjects.length === filteredProjects.length} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Partner</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pillars</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProjects.map((p) => (
                            <tr key={p.id} onClick={() => navigate(`/project/${p.id}`)} className="hover:bg-gray-50 cursor-pointer">
                                <td className="p-4" onClick={e => e.stopPropagation()}>
                                    <input type="checkbox" checked={selectedProjects.includes(p.id)} onChange={() => handleSelectProject(p.id)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{p.title}</div>
                                    <div className="text-sm text-gray-500">{p.acronym} ({p.id})</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge color={p.status === 'Active' ? 'green' : p.status === 'Completed' ? 'blue' : 'yellow'}>{p.status}</Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {p.start_date} - {p.end_date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.lead_partner} ({p.country})</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {p.mission_pillars.map(pillar => <Badge key={pillar} color="indigo">{pillar}</Badge>)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredProjects.length === 0 && <div className="text-center py-8 text-gray-500">No projects found.</div>}
            </div>
        </div>
    </div>
  );
};
