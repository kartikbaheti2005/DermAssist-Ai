import apiClient from "./axios";

/**
 * Create Health Record
 */
export const createHealthRecord = async (payload) => {
  const response = await apiClient.post(
    "/health-records",
    payload
  );

  return response.data;
};

/**
 * Get All Health Records
 */
export const getHealthRecords = async () => {
  const response = await apiClient.get(
    "/health-records"
  );

  return response.data;
};

/**
 * Get Latest Health Record
 */
export const getLatestHealthRecord = async () => {
  const response = await apiClient.get(
    "/health-records/latest"
  );

  return response.data;
};

/**
 * Get Single Health Record
 */
export const getHealthRecord = async (recordId) => {
  const response = await apiClient.get(
    `/health-records/${recordId}`
  );

  return response.data;
};

/**
 * Update Health Record
 */
export const updateHealthRecord = async (
  recordId,
  payload
) => {
  const response = await apiClient.put(
    `/health-records/${recordId}`,
    payload
  );

  return response.data;
};

/**
 * Delete Health Record
 */
export const deleteHealthRecord = async (
  recordId
) => {
  const response = await apiClient.delete(
    `/health-records/${recordId}`
  );

  return response.data;
};