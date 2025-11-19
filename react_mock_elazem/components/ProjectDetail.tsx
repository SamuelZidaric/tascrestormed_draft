
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data';
import { Badge } from './ui';
import { ArrowLeft, User, Users, Calendar, Flag, Tag, CheckSquare, DollarSign, Target, FileText } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600">Project not found</h2>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to Project Explorer</Link>
            </div>
        );
    }
    
    const DetailCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center text-gray-500 mb-2">
                {icon}
                <h3 className="ml-2 text-sm font-bold uppercase tracking-wider">{title}</h3>
            </div>
            <div className="text-gray-800">{children}</div>
        </div>
    );

    return (
        <div>
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>

            <header className="bg-white p-6 rounded-lg shadow mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{project.title} ({project.acronym})</h1>
                        <p className="text-lg text-gray-500 mt-1">{project.id}</p>
                    </div>
                     <Badge color={project.status === 'Active' ? 'green' : project.status === 'Completed' ? 'blue' : 'yellow'}>{project.status}</Badge>
                </div>
                <p className="mt-4 text-gray-600">{project.summary}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <DetailCard icon={<Calendar className="h-5 w-5" />} title="Timeline">
                    <p>{project.start_date} to {project.end_date}</p>
                </DetailCard>
                 <DetailCard icon={<Flag className="h-5 w-5" />} title="Country & Zone">
                    <p>{project.country}, {project.mission_zone}</p>
                </DetailCard>
                 <DetailCard icon={<DollarSign className="h-5 w-5" />} title="Funding">
                    <p>{project.funding}</p>
                </DetailCard>

                <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailCard icon={<User className="h-5 w-5" />} title="Lead Partner">
                        <Link to={`/partner/${encodeURIComponent(project.lead_partner)}`} className="text-blue-600 hover:underline font-semibold">{project.lead_partner}</Link>
                    </DetailCard>
                    <DetailCard icon={<Users className="h-5 w-5" />} title="Partners">
                        <ul className="list-disc list-inside">
                           {project.partners.map(partner => (
                                <li key={partner}><Link to={`/partner/${encodeURIComponent(partner)}`} className="text-blue-600 hover:underline">{partner}</Link></li>
                           ))}
                        </ul>
                    </DetailCard>
                </div>
                
                 <DetailCard icon={<Tag className="h-5 w-5" />} title="Mission Pillars">
                    <div className="flex flex-wrap gap-2">{project.mission_pillars.map(p => <Badge key={p} color="indigo">{p}</Badge>)}</div>
                </DetailCard>
                <DetailCard icon={<Target className="h-5 w-5" />} title="Mission Objectives">
                    <ul className="list-disc list-inside space-y-1 text-sm">{project.mission_objectives.map(o => <li key={o}>{o}</li>)}</ul>
                </DetailCard>
                <DetailCard icon={<CheckSquare className="h-5 w-5" />} title="Key Performance Indicators (KPIs)">
                    <ul className="list-disc list-inside space-y-1 text-sm">{project.kpis.map(kpi => <li key={kpi}>{kpi}</li>)}</ul>
                </DetailCard>
                <DetailCard icon={<FileText className="h-5 w-5" />} title="Topic Clusters">
                     <div className="flex flex-wrap gap-2">{project.clusters.map(c => <Badge key={c} color="gray">{c}</Badge>)}</div>
                </DetailCard>
                 <DetailCard icon={<FileText className="h-5 w-5" />} title="Technology Pillars">
                     <div className="flex flex-wrap gap-2">{project.technologies.map(t => <Badge key={t} color="purple">{t}</Badge>)}</div>
                </DetailCard>
            </div>
        </div>
    );
};
