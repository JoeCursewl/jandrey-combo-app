import { API_URL } from "../../config/config.breadriuss";

export const verifyIfSaved = async (trainer_id, authToken, setLoading) => {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}trainers/save/verify/${trainer_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        })

        if (!res.ok) {
            const error = await res.json();
            throw new Error(`Ha ocurrido un error. ${error.message}`);
        }

        const data = await res.json();
        setLoading(false);
        return { state: data.state }
    } catch (error) {
        setLoading(false);
        console.log(error)
        return { error: error.message }
    }
}