import { useState, useEffect } from "react";

export type fetchResponse = {
    data: [];
    error?: string | null;
    loading?: boolean;
    filter?: () => void;
};

export const useFetch = (url: string): fetchResponse => {
    const [data, setData] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url, { signal });
                const json = await res.json();

                setLoading(false);
                setData(json);
                setError(null);
            } catch(error) {
                setLoading(false);
                setError('Could not fetch the data');
            }
        }
    
        fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, loading, error };
};
