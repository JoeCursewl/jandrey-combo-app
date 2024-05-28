import { API_URL, date } from "../../config/config.breadriuss.js"
export const registerInformation = async (authToken, setLoading, _id_user, name_contact, description_contact, email_contact, phones_contact, status_contact) => {
    setLoading(true)
    try {

        if (name_contact === "" || description_contact === "" || email_contact === "" || phones_contact === "" || status_contact === "") {
            throw new Error("Todos los campos son necesarios!")
        }

        if (!email_contact.includes("@")) {
            throw new Error("El email no es valido!") 
        }

        if (name_contact.length > 200 || description_contact.length > 255 || email_contact.length > 255 || phones_contact.length > 100 || status_contact.length > 10) {
            throw new Error("Ingrese campos válidos. Ingrese campos más cortos y vuelva a intentarlo!")
        }

        const created_at = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        const response = await fetch(API_URL + "admins/information", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({
                _id_user: _id_user,
                name_contact: name_contact.trim(),
                description_contact: description_contact.trim(),
                email_contact: email_contact.trim(),
                phones_contact: phones_contact.trim(),
                stauts_contact: status_contact.trim(),
                created_at: created_at,
                updated_at: created_at
            })
        })

        if (!response.ok) {
            throw new Error(`El servidor respondio con un código de estado ${response.status}`)
        }

        const data = await response.json()
        setLoading(false)
        return { data: data }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}