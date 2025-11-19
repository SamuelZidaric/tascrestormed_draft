/**
 * API Service Layer
 * Handles all communication with the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API fetch error:', error);
    return {
      data: null as T,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Projects API
 */
export const projectsAPI = {
  /**
   * Get all projects with optional filtering
   */
  async getAll(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    programme?: string;
    country?: string;
    year?: string;
  }) {
    const queryString = new URLSearchParams(
      Object.entries(params || {}).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const endpoint = `/projects${queryString ? `?${queryString}` : ''}`;
    const response = await fetchAPI<{
      projects: any[];
      total: number;
      page: number;
      per_page: number;
      total_pages: number;
    }>(endpoint);

    return response;
  },

  /**
   * Get a single project by ID
   */
  async getById(id: number) {
    return fetchAPI<any>(`/projects/${id}`);
  },

  /**
   * Get project partners
   */
  async getPartners(projectId: number) {
    return fetchAPI<any[]>(`/projects/${projectId}/partners`);
  },

  /**
   * Get project deliverables
   */
  async getDeliverables(projectId: number) {
    return fetchAPI<any[]>(`/projects/${projectId}/deliverables`);
  },

  /**
   * Get project publications
   */
  async getPublications(projectId: number) {
    return fetchAPI<any[]>(`/projects/${projectId}/publications`);
  },

  /**
   * Get project reports
   */
  async getReports(projectId: number) {
    return fetchAPI<any[]>(`/projects/${projectId}/reports`);
  },

  /**
   * Search projects
   */
  async search(query: string, page = 1, perPage = 20) {
    const params = new URLSearchParams({
      q: query,
      page: String(page),
      per_page: String(perPage),
    });

    return fetchAPI<{
      results: any[];
      total: number;
      page: number;
      per_page: number;
      total_pages: number;
      query: string;
    }>(`/search?${params}`);
  },
};

/**
 * Partners API
 */
export const partnersAPI = {
  /**
   * Get all partners
   */
  async getAll(params?: {
    page?: number;
    per_page?: number;
    country?: string;
  }) {
    const queryString = new URLSearchParams(
      Object.entries(params || {}).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const endpoint = `/partners${queryString ? `?${queryString}` : ''}`;
    return fetchAPI<{
      partners: any[];
      total: number;
      page: number;
      per_page: number;
    }>(endpoint);
  },
};

/**
 * Statistics API
 */
export const statsAPI = {
  /**
   * Get database statistics
   */
  async get() {
    return fetchAPI<{
      total_projects: number;
      total_partners: number;
      total_deliverables: number;
      total_publications: number;
      total_reports: number;
      projects_by_status: Record<string, number>;
      projects_by_programme: Record<string, number>;
      projects_by_country: Record<string, number>;
    }>('/stats');
  },
};

/**
 * Reference Data API
 */
export const referenceAPI = {
  /**
   * Get all programmes
   */
  async getProgrammes() {
    return fetchAPI<any[]>('/programmes');
  },

  /**
   * Get all keywords
   */
  async getKeywords() {
    return fetchAPI<any[]>('/keywords');
  },

  /**
   * Get filter options
   */
  async getFilters() {
    return fetchAPI<{
      statuses: string[];
      programmes: string[];
      countries: string[];
      years: string[];
    }>('/filters');
  },
};

/**
 * Health check
 */
export const healthAPI = {
  async check() {
    try {
      const response = await fetch(API_BASE_URL.replace('/api', '/'));
      return response.ok;
    } catch {
      return false;
    }
  },
};

export default {
  projects: projectsAPI,
  partners: partnersAPI,
  stats: statsAPI,
  reference: referenceAPI,
  health: healthAPI,
};
