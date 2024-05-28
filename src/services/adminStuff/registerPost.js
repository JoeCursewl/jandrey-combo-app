import { API_URL } from "../../config/config.breadriuss";
export const registerPost = async (authToken, setLoading, title_post, description_post, updated_at, created_at, labels, _id_user, name) => {
    setLoading(true)
    try {

        if (title_post === '' || description_post === '' || labels === '') {
            throw new Error('No puedes dejar los campos vacíos!');
        }

        if (title_post.length > 155 || description_post.length > 500 || labels.length > 255) {
            throw new Error('Lo campos no pueden ser muy grandes!');
        }

        const response = await fetch(API_URL + 'admins/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authToken}`,
            },
            body: JSON.stringify({
                title_post: title_post.trim(),
                description_post: description_post.trim(),
                updated_at: updated_at,
                created_at: created_at,
                labels: labels.trim(),
                _id_user: _id_user,
                name: name
            }),
        });

        if (!response.ok) {
            throw new Error(`Error al registrar publicación, el servidor ha respondido con un: ${response.status}`);
        }

        setLoading(false)
        const result = await response.json();
        return { data: result }
        
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}