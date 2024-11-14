import {pool} from '../../config/database.js';

export const getEdificio = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM edificio')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createEdificio =async (req,res)=>{
   
    try {
        const[result] = await pool.query('INSERT INTO edificio (//DATOS DE CODIGO//) VALUES(?,?,?)', [/ datps codigo/])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const deleteEdificio= async(req,res)=>{
    const {edificio} = req.params
    try {
        const [result] = await pool.query('DELETE FROM edificio WHERE edificio = ?', [edificio])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'edificio no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateEdificio = async (req,res)=>{
    const {edificio} = req.params
    
    try {
        const [result] =await pool.query('UPDATE edificio SET edificio = ? ', [edificio])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'edificio no encontrado'})
        }
        res.json({edificio})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}