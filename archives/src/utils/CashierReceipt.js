import { authAxios } from './apiConfig';

export const apiGetReceipts = async (limitCount = false) => {
  const params = {
    limit: limitCount,
  };
  const apiResponse = await authAxios
    .get('/collection-distributions/receipts', {
      params,
    })
    .then((response) => response)
    .catch((error) => error.response);
  return apiResponse;
};
