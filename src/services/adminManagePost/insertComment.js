import { API_URL, date_to_update } from "../../config/config.breadriuss"
export const insertComment = async (authToken, postId, comment, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}posts/comment/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({
                comment_content: comment.trim(),
                created_at: date_to_update,
                updated_at: date_to_update
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
        console.log(error.message)
        return { error: error.message }
    }
}    