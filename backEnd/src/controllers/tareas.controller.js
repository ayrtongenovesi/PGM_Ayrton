import {pool} from '../../config/database.js';

export const getTarea = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createTarea =async (req,res)=>{
   
    try {
        const[result] = await pool.query('INSERT INTO tarea (//DATOS DE CODIGO//) VALUES(?,?,?)', [/ datps codigo/])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const deleteTarea= async(req,res)=>{
    const {tarea} = req.params
    try {
        const [result] = await pool.query('DELETE FROM tarea WHERE sector = ?', [tarea])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'tarea no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateTarea = async (req,res)=>{
    const {tarea} = req.params
    
    try {
        const [result] =await pool.query('UPDATE tarea SET (????) = ? ', [tarea])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'tarea no encontrado'})
        }
        res.json({tarea})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}