import { useState, useEffect } from "react";

export type fetchResponse = {
    data: [];
    error?: string | null;
    loading?: boolean;
};

export const useFetch = (url: string): fetchResponse => {
    const [data, setData] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url);
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
    }, [url]);

    return { data, loading, error };
};
