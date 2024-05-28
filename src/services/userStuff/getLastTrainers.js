import { API_URL } from "../../config/config.breadriuss";
export const getLastTrainers = async (authToken, setLoading, page, setTrainers, trainers) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}info/trainers/${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
             }
        })
        const data = await response.json();
        setLoading(false);
        setTrainers([...trainers, ...data.message]);
        return { data: data.message }
    } catch (error) {
        setLoading(false);
        return { error: error.message }
    }
}    