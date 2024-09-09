import { API_URL } from "../../config/config.breadriuss"

export const updateComment = async (authToken, setLoading, comment_id, comment) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}posts/comment/u/${comment_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({
                comment_content: comment.trim(),
            })
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