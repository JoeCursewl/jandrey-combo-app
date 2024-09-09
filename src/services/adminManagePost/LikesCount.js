import { API_URL } from "../../config/config.breadriuss"
export const likesCount = async (authToken, post_id, setLikes) => {
    try {
        const response = await fetch(`${API_URL}posts/likes/v/count/${post_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        }

        const data = await response.json()
        setLikes(data.likes)
    } catch (error) {
        return { error: error.message }
    }
}