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

export const createUser = async (req, res) => {
    const { name, mail, password } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (nombre, mail, contraseña, IdTipoUsuario) VALUES (?, ?, ?, ?)',
            [name, mail, password, 1]
        );
        res.json({ id: result.insertId, nombre: name, mail });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}
    
export const deleteUser = async (req, res) => {
    const { id } = req.params
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [[u]] = await conn.query('SELECT nombre FROM usuario WHERE id = ?', [id])
        await conn.query('DELETE FROM ot WHERE usuarios = ?', [u?.nombre])
        const [result] = await conn.query('DELETE FROM usuario WHERE id = ?', [id])
        if (result.affectedRows === 0) {
            await conn.rollback();
            conn.release();
            return res.status(404).json({message:'Usuario no encontrado'})

        }
        await conn.commit();
        conn.release();
        res.status(204).send()
    } catch (err) {
        await conn.rollback();
        conn.release();
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    try {
        const [result] = await pool.query('UPDATE usuario SET nombre = ? WHERE id = ?', [nombre, id])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'Usuario no encontrado'})
        }
        res.json({id, nombre})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}
