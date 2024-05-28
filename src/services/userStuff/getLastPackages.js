import { API_URL } from "../../config/config.breadriuss";
export const getLastPackages = async (authToken, setLoading, page, setPackages, packages) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}info/packages/${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
             }
        })

        const data = await response.json();
        setLoading(false);
        setPackages([...packages, ...data.message]);
        return { data: data.message }
    } catch (error) {
        setLoading(false);
        return { error: error.message }
    }
}   