import apiClient from './apiClient';

export const schemesApi = {
  /**
   * Fetch paginated schemes for an organization
   */
  async getOrgSchemes(orgId, params = {}) {
    try {
      const res = await apiClient.get(`/organizations/${orgId}/schemes`, {
        page: params.page || 1,
        limit: params.limit || 50,
        ...params,
      });
      return res?.data?.items || res?.data?.schemes || res?.data || [];
    } catch {
      const res = await apiClient.get('/schemes', {
        org_id: orgId,
        page: params.page || 1,
        limit: params.limit || 50,
        ...params,
      });
      return res?.data?.items || res?.data?.schemes || res?.data || [];
    }
  },

  /**
   * Fetch single scheme details by ID
   */
  async getSchemeById(schemeId) {
    const res = await apiClient.get(`/schemes/${schemeId}`);
    return res?.data || null;
  },

  /**
   * Create a new welfare scheme
   */
  async createScheme(schemeData) {
    const res = await apiClient.post('/schemes', schemeData);
    return res?.data || res;
  },

  /**
   * Update an existing scheme
   */
  async updateScheme(schemeId, updateData) {
    const res = await apiClient.patch(`/schemes/${schemeId}`, updateData);
    return res?.data || res;
  },

  /**
   * Delete a scheme
   */
  async deleteScheme(schemeId) {
    return await apiClient.delete(`/schemes/${schemeId}`);
  },

  /**
   * Fetch applications for a specific scheme
   */
  async getSchemeApplications(schemeId) {
    try {
      const res = await apiClient.get(`/schemes/${schemeId}/applications`);
      return res?.data?.items || res?.data || [];
    } catch {
      return [];
    }
  },

  /**
   * Fetch single scheme application by ID
   */
  async getApplicationById(applicationId) {
    try {
      const res = await apiClient.get(`/schemes/applications/${applicationId}`);
      return res?.data || null;
    } catch {
      return null;
    }
  },

  /**
   * Update scheme application status (approve, reject, under_review)
   */
  async updateApplicationStatus(schemeId, applicationId, status, stage = '', reviewerNotes = '') {
    try {
      const res = await apiClient.patch(`/schemes/${schemeId}/applications/${applicationId}/status`, {
        status,
        stage,
        reviewerNotes,
      });
      return res?.data || res;
    } catch {
      const res = await apiClient.patch(`/schemes/applications/${applicationId}/status`, {
        status,
        stage,
        reviewerNotes,
      });
      return res?.data || res;
    }
  },

  /**
   * Fetch all scheme applications across the entire organization
   */
  async getOrgSchemeApplications(orgId, params = {}) {
    try {
      const res = await apiClient.get(`/organizations/${orgId}/scheme-applications`, params);
      return res?.data?.items || res?.data || [];
    } catch {
      return [];
    }
  },
};

export default schemesApi;
