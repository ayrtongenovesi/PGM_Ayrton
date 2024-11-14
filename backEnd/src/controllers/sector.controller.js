import {pool} from '../../config/database.js';


export const getSector = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM sector')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createSector =async (req,res)=>{
   
    try {
        const[result] = await pool.query('INSERT INTO sector (//DATOS DE CODIGO//) VALUES(?,?,?)', [/ datps codigo/])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const deleteSector= async(req,res)=>{
    const {sector} = req.params
    try {
        const [result] = await pool.query('DELETE FROM sector WHERE sector = ?', [sector])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'sector no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateSector = async (req,res)=>{
    const {sector} = req.params
    
    try {
        const [result] =await pool.query('UPDATE sector SET (????) = ? ', [sector])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'sector no encontrado'})
        }
        res.json({sector})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}