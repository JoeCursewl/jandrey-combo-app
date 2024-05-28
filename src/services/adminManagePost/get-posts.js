import { API_URL } from "../../config/config.breadriuss"
export const getPost = async (authToken, setLoading, uuid) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}posts/get/${uuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
        })

        if (!response.ok) {
            throw new Error(`El servidor ha respondido con un código de estado: ${response.status}`)
        }

        const posts = await response.json()
        setLoading(false)
        return { data: posts }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
} 