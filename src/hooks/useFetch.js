import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook quản lý việc tải dữ liệu từ API với đầy đủ các trạng thái:
 * loading, data, error, isEmpty, refetch
 */
export function useFetch(fetchFn, deps = [], options = {}) {
  const [data, setData] = useState(options.initialData ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFn();
      // Phản hồi từ backend là { success: true, count, data: [...] }
      const result = response?.data !== undefined ? response.data : response;
      setData(result);
      return result;
    } catch (err) {
      const errMsg = err?.message || 'Có lỗi xảy ra khi tải dữ liệu từ máy chủ!';
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    execute();
  }, [execute]);

  const isEmpty =
    !loading &&
    !error &&
    (!data || (Array.isArray(data) && data.length === 0));

  return {
    data,
    loading,
    error,
    isEmpty,
    refetch: execute,
    setData,
  };
}
