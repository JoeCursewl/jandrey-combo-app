import { date } from '../../config/config.breadriuss.js' 
import { generateBinanceId } from '../generarRandomID.mjs';
import { API_URL } from '../../config/config.breadriuss.js';
export const registerTrainers = async (authToken, setLoading, _id_user, name_trainer, packages_trainer, schedule_trainer, info_trainer, status_trainer) => {
    setLoading(true)
    try {
        if (name_trainer === '' || packages_trainer === '' || schedule_trainer === '' || info_trainer === '' || status_trainer === '') {
            throw new Error('Todos los campos son requeridos!')
        }

        if (name_trainer.length > 100 || packages_trainer.length > 400 || schedule_trainer.length > 255 || info_trainer.length > 255 || status_trainer.length > 20) {
            throw new Error('Ingresa un valor válido para cada campo!')
        }
        const created_at = date.toLocaleTimeString('es-ES') + ' ' + date.toLocaleDateString('es-ES')
        const _id_trainer = generateBinanceId()
        
        const response = await fetch(API_URL + 'admins/trainers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify({ 
                _id_trainer: _id_trainer, 
                _id_user: _id_user, 
                name_trainer: name_trainer.trim(), 
                packages_trainer: packages_trainer.trim(), 
                schedule_trainer: schedule_trainer.trim(), 
                info_trainer: info_trainer.trim(), 
                status_trainer: status_trainer.trim(),
                created_at: created_at,
                updated_at: created_at
            })
        })

        if (!response.ok) {
            throw new Error(`El servidor ha respondido con un código ${response.status}`)
        }

        const data = await response.json()
        setLoading(false)
        return { data: data }

    } catch (error) {
      console.log(error)
      setLoading(false)
      return { error: error.message }  
    }
};