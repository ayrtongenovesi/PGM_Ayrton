//import {pool} from 

export const getOT = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM OT')
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createOT =async (req,res)=>{
   
    try {
        const[result] = await pool.query('INSERT INTO OT (//DATOS DE CODIGO//) VALUES(?,?,?)', [/ datps codigo/])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const deleteOT= async(req,res)=>{
    const {OT} = req.params
    try {
        const [result] = await pool.query('DELETE FROM OT WHERE OT = ?', [OT])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'OT no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateOT = async (req,res)=>{
    const {OT} = req.params
    
    try {
        const [result] =await pool.query('UPDATE OT SET (????) = ? ', [OTT])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'OT no encontrado'})
        }
        res.json({OT})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}