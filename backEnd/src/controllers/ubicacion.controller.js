import {pool} from '../../config/database.js';

export const getUbicacion = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM ubicacion')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createUbicacion =async (req,res)=>{
   
    try {
        const[result] = await pool.query('INSERT INTO ubicaion (//DATOS DE CODIGO//) VALUES(?,?,?)', [/ datps codigo/])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const deleteUbicacion= async(req,res)=>{
    const {ubicacion} = req.params
    try {
        const [result] = await pool.query('DELETE FROM ubicacion WHERE ubicacion = ?', [ubicacion])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'ubicacion no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateUbicacion = async (req,res)=>{
    const {ubicacion} = req.params
    
    try {
        const [result] =await pool.query('UPDATE ubicacion SET (????) = ? ', [ubicacion])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'ubicacion no encontrado'})
        }
        res.json({ubicacion})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}