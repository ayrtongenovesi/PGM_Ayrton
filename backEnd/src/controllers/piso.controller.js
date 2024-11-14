import {pool} from '../../config/database.js';


export const getPiso = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM piso_nivel')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createPiso =async (req,res)=>{
   
    try {
        const[result] = await pool.query('INSERT INTO piso_nivel (//DATOS DE CODIGO//) VALUES(?,?,?)', [/ datps codigo/])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const deletePiso= async(req,res)=>{
    const {piso} = req.params
    try {
        const [result] = await pool.query('DELETE FROM piso WHERE piso = ?', [piso])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'piso no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updatePiso = async (req,res)=>{
    const {piso} = req.params
    
    try {
        const [result] =await pool.query('UPDATE piso SET (????) = ? ', [piso])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'piso no encontrado'})
        }
        res.json({piso})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}