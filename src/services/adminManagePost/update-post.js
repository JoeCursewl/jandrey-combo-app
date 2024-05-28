import { API_URL, date } from "../../config/config.breadriuss";
export const updatePosts = async (authToken, setLoading, uuid, title_post, description_post, labels) => {
    setLoading(true);
    try {
        
        if (title_post.trim() === "" || description_post.trim() === "" || labels.trim() === "") {
            throw new Error("Todos los campos son obligatorios!");
        }

        if (title_post.trim().length > 155 || description_post.trim().length > 500 || labels.trim().length > 155) {
            throw new Error("Ingrese datos válidos!");
        }

        const d = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        const response = await fetch(`${API_URL}posts/update/${uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({ 
                title_post: title_post.trim(), 
                description_post: description_post.trim(), 
                labels: labels.trim(),
                updated_at: d
            }),
        })

        if (!response.ok) {
            throw new Error(`El servidor ha respondido con un código de estado: ${response.status}`)
        }

        setLoading(false)
        const result = response.json()
        return { data: result };
    } catch (error) {
        setLoading(false)
        console.log(error.message)
        return { error: error.message };
    }
}