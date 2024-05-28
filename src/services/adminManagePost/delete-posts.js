import { API_URL } from "../../config/config.breadriuss";

export const deletePosts = async (authToken, setLoading, id_post) => {
    setLoading(true)
    try {
        if (!authToken) {
            throw new Error('Tienes que haber iniciado sesión para solicitar este servicio') 
        }

        const response = await fetch(`${API_URL}posts/delete/${id_post}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        });

        if (!response.ok) {
            throw new Error(`El servidor ha respondido con un código de estado ${response.status}`);
        }

        const result = response.json();
        setLoading(false)
        return { data: result }
    } catch (error) {
        console.log(error.message)
        setLoading(false)
        return { error: error.message }
    }
};