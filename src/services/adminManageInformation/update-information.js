import { API_URL } from "../../config/config.breadriuss";
import { date_to_update } from "../../config/config.breadriuss";
export const updateInformation = async (authToken, 
    setLoading, 
    name_contact, 
    description_contact, 
    email_contact,
    phones_contact,
    status_contact,
    id_info
) => {
    setLoading(true);
    try {

        if (!name_contact || !description_contact || !email_contact || !phones_contact || !status_contact) {
            throw new Error("Todos los campos son obligatorios");
        }

        if (!email_contact.includes("@")) {
            throw new Error("El email no es valido!");
        }

        if (name_contact.length > 200 || description_contact.length > 200 || email_contact.length > 255 || phones_contact.length > 40 || status_contact.length > 10) {
            throw new Error("Ingrese campos más cortos y vuelva a intentarlo!");
        }

        const response = await fetch(`${API_URL}admins/information/update/${id_info}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({
                name_contact: name_contact.trim(),
                description_contact: description_contact.trim(),
                email_contact: email_contact.trim(),
                phones_contact: phones_contact.trim(),
                status_contact: status_contact.trim(),
                updated_at: date_to_update
            })
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`El servidor ha respondido con un código de estado: ${error.message}`)
        }

        const result = await response.json();
        setLoading(false);
        return { result: result.message }
    } catch (error) {
        setLoading(false);
        console.log(error.message)
        return { error: error.message }
    }
}