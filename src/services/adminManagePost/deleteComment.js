import { API_URL } from "../../config/config.breadriuss"

export const deleteComment = async (authToken, setLoading, comment_id) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}posts/comment/d/${comment_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
        })

        if (!response.ok) { 
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        }

        const data = await response.json()
        setLoading(false)
        return { data: data.message }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}