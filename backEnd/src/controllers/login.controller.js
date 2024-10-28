//import {pool} from 

export const getLogin = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM login')
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createLogin =async (req,res)=>{
    const {login}= req.body;
    try {
        const[result] = await pool.query('INSERT INTO login (//DATOS DE CODIGO//) VALUES(?,?,?)', [])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const deleteLogin= async(req,res)=>{
    const {id} = req.params
    try {
        const [result] = await pool.query('DELETE FROM login WHERE login = ?', [login])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'login no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateLogin = async (req,res)=>{
    const {login} = req.params
    
    try {
        const [result] =await pool.query('UPDATE login WHERE login = ?', [login])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'login no encontrado'})
        }
        res.json({login})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}