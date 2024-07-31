import { API_URL, date, date_to_update } from "../../config/config.breadriuss"
export const likePost = async (authToken, setLoading, postId) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}posts/like/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({
                created_at: date_to_update, 
            })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error, el servidor ha respondido con un: ${error.message}`)
        }

        setLoading(false)
        return { like: true }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}