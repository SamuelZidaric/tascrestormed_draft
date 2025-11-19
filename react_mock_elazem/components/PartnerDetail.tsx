
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { partners, projects } from '../data';
import { Project } from '../types';
import { Badge } from './ui';
import { ArrowLeft, Briefcase, Globe, ExternalLink } from 'lucide-react';

export const PartnerDetail: React.FC = () => {
    const { partnerName } = useParams();
    const navigate = useNavigate();
    const partner = partners.find(p => p.name === decodeURIComponent(partnerName || ''));

    if (!partner) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600">Partner not found</h2>
                <Link to="/partners" className="text-blue-600 hover:underline mt-4 inline-block">Back to Partner Directory</Link>
            </div>
        );
    }

    const partnerProjects = projects.filter(p => partner.projectIds.includes(p.id));

    return (
        <div>
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>

            <header className="bg-white p-6 rounded-lg shadow mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{partner.name} ({partner.acronym})</h1>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-gray-500">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        <span>{partner.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        <span>{partner.country}</span>
                    </div>
                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                        <ExternalLink className="h-5 w-5" />
                        <span>Website</span>
                    </a>
                </div>
            </header>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Associated Projects ({partnerProjects.length})
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pillars</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {partnerProjects.map((p) => (
                                    <tr key={p.id} onClick={() => navigate(`/project/${p.id}`)} className="hover:bg-gray-50 cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{p.title}</div>
                                            <div className="text-sm text-gray-500">{p.acronym}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {p.lead_partner === partner.name ? <span className="font-semibold text-gray-800">Lead</span> : 'Partner'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge color={p.status === 'Active' ? 'green' : p.status === 'Completed' ? 'blue' : 'yellow'}>{p.status}</Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {p.mission_pillars.map(pillar => <Badge key={pillar} color="indigo">{pillar}</Badge>)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
