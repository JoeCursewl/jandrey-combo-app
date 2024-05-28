import { API_URL } from "../../config/config.breadriuss";
export const getLastInfo = async (authToken, setLoading, page, setInfo, info) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}info/information/${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
             }
        })
        const data = await response.json();
        setLoading(false);
        setInfo([...info, ...data.message]);
        return { data: data.message }
    } catch (error) {
        setLoading(false);
        return { error: error.message }
    }
}    