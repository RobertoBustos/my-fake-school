import { useCallback, useEffect, useState } from "react";
import { serviceUrl } from "@constants/index";

export const useFetch = () => {
  const [fetchResponse, setFetchResponse] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(serviceUrl);
      if (!response.ok) throw new Error(response.statusText);

      const dataApiResponse: unknown[] = await response.json();

      setFetchResponse(dataApiResponse);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  }, []);

  useEffect(() => {
    if (fetchResponse.length === 0 && !isLoading) handleFetch();
  }, []);

  return { fetchResponse, isLoading, error };
};
