import {pool} from '../../config/database.js';

export const getUser = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createUser =async (req,res)=>{
    const {nombre, mail, IdTipoUsuario = 2, contraseña}= req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (nombre, mail, IdTipoUsuario, contraseña) VALUES (?,?,?,?)',
            [nombre, mail, IdTipoUsuario, contraseña]
        )
        res.status(201).json({id: result.insertId, nombre, mail, IdTipoUsuario})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}
    
export const deleteUser= async(req,res)=>{
    const {id} = req.params
    try {
        const [result] = await pool.query('DELETE FROM usuario WHERE id = ?', [id])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'Usuario no encontrado'})

        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateUser = async (req,res)=>{
    const {id} = req.params
    const {nombre} = req.body
    try {
        const [result] =await pool.query('UPDATE usuario SET nombre = ? WHERE id = ?', [nombre, id])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'Usuario no encontrado'})
        }
        res.json({id, nombre})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}
