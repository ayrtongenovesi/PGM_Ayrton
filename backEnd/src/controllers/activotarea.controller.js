import {pool} from '../../config/database.js';

export const getAT = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM activo')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createAT = async (req, res) => {
    const { id, Nombre } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO activo (id, Nombre) VALUES (?, ?)', [id, Nombre]);
        res.json({ id, Nombre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}

export const deleteAT = async (req, res) => {
    const { id } = req.params;
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [[a]] = await conn.query('SELECT Nombre FROM activo WHERE id = ?', [id]);
        await conn.query('DELETE FROM activo_tareas WHERE IDAct = ?', [id]);
        await conn.query('DELETE FROM cuia WHERE idTA = ?', [id]);
        await conn.query('DELETE FROM ot WHERE Tipo_Activo = ?', [a?.Nombre]);
        const [result] = await conn.query('DELETE FROM activo WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            await conn.rollback();
            conn.release();
            return res.status(404).json({ message: 'AT no encontrado' });
        }
        await conn.commit();
        conn.release();
        res.status(204).send();
    } catch (err) {
        await conn.rollback();
        conn.release();
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}

export const updateAT = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;

    try {
        const [result] = await pool.query('UPDATE activo SET Nombre = ? WHERE id = ?', [Nombre, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'AT no encontrado' });
        }
        res.json({ id, Nombre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }

}
