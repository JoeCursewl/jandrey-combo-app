import { API_URL, date } from "../../config/config.breadriuss"
export const updateTrainer = async (authToken, setLoading, name_trainer, packages_trainer, schedule_trainer, info_trainer, status_trainer, id_trainer, phone, areacode) => {
    setLoading(true)
    try {
        if (name_trainer === '' || packages_trainer === '' || schedule_trainer === '' || info_trainer === '' || status_trainer === '' || phone === '' || areacode === '') {
            throw new Error('Todos los campos son necesarios!')
        }

        if (name_trainer.length > 100 || packages_trainer.length > 255 || schedule_trainer.length > 255 || info_trainer.length > 255) {
            throw new Error('Ingrese datos válidos!')
        }

        const updated_at = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
        const response = await fetch(`${API_URL}trainers/update/${id_trainer}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify({
                name_trainer: name_trainer.trim(),
                packages_trainer: packages_trainer.trim(),
                schedule_trainer: schedule_trainer.trim(),
                info_trainer: info_trainer.trim(),
                status_trainer: status_trainer,
                updated_at: updated_at,
                phone_trainer: phone.trim(),
                area_code: areacode.trim()
            })
        })

        if (!response.ok) {
            const data = await response.json()
            const message = `Ha ocurrido un error: ${data.message}`
            throw new Error(message)
        }

        setLoading(false)
        return { trainer: `Entrandor ID ${id_trainer} actualizado correctamente!` }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}