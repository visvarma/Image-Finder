// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from "react";

const useFetch = (fetchFunction, selectedTopic) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!selectedTopic) return;
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchFunction, selectedTopic]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
