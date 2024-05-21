// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from "react";

const useFetch = (fetchFunction, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const result = await fetchFunction(params);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, params]);

  useEffect(() => {
    fetchData();
  }, [fetchFunction, params]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
