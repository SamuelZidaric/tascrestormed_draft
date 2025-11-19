import * as XLSX from 'xlsx';
import { Project } from '../types';
import { Partner } from '../types';

export const exportProjectsToExcel = (data: Project[], filename: string = 'projects.xlsx') => {
  const worksheetData = data.map(project => ({
    'ID': project.id,
    'Title': project.title,
    'Acronym': project.acronym,
    'Status': project.status,
    'Start Date': project.start_date,
    'End Date': project.end_date,
    'Lead Partner': project.lead_partner,
    'Country': project.country,
    'Pillars': project.mission_pillars.join(', '),
    'Objectives': project.mission_objectives.join(', '),
    'Technologies': project.technologies.join(', '),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');
  XLSX.writeFile(workbook, filename);
};


export const exportPartnersToExcel = (data: Partner[], filename: string = 'partners.xlsx') => {
    const worksheetData = data.map(partner => ({
      'Name': partner.name,
      'Acronym': partner.acronym,
      'Country': partner.country,
      'Type': partner.type,
      '# Projects': partner.projectIds.length,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Partners');
    XLSX.writeFile(workbook, filename);
  };