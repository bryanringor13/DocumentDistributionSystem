import { authAxios } from './apiConfig';

export const apiGetCollectionDistributions = async (limitCount = false) => {
  const params = {
    limit: limitCount,
  };
  const apiResponse = await authAxios
    .get('/collection-distributions', {
      params,
    })
    .then((response) => response)
    .catch((error) => error.response);
  return apiResponse;
};

export const apiGetCollectionForReceipts = async (urlParams = null) => {
  const apiResponse = await authAxios
    .get('/collection-distribution/for-receipts', {
      params: urlParams,
    })
    .then((response) => response)
    .catch((error) => error.response);
  return apiResponse;
};
