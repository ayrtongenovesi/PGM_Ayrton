import {pool} from '../../config/database.js';
// por ahora es el ACTIVO SOLO pero cambiar y crear otro cohntrolardor
export const getAT = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM activo')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createAT =async (req,res)=>{
   
    try {
        const[result] = await pool.query('INSERT INTO AT (//DATOS DE CODIGO//) VALUES(?,?,?)', [/ datps codigo/])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}
//posiblemente no se use por que no se borran datos si no que AT cambia estado de activo 
export const deleteAT= async(req,res)=>{
    const {AT} = req.params
    try {
        const [result] = await pool.query('DELETE FROM AT WHERE AT = ?', [AT])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'AT no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateAT = async (req,res)=>{
    const {AT} = req.params
    
    try {
        const [result] =await pool.query('UPDATE AT SET (????) = ? ', [AT])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'AT no encontrado'})
        }
        res.json({AT})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}