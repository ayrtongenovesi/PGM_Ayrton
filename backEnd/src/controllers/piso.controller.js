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

export const createPiso = async (req, res) => {
    const { id, Nombre } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO piso_nivel (id, Nombre) VALUES (?, ?)', [id, Nombre]);
        res.json({ id, Nombre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}

export const deletePiso = async (req, res) => {
    const { id } = req.params;
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [[p]] = await conn.query('SELECT Nombre FROM piso_nivel WHERE id = ?', [id]);
        await conn.query('DELETE FROM cuia WHERE idPN = ?', [id]);
        await conn.query('DELETE FROM ot WHERE Piso = ?', [p?.Nombre]);
        const [result] = await conn.query('DELETE FROM piso_nivel WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            await conn.rollback();
            conn.release();
            return res.status(404).json({ message: 'piso no encontrado' });
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

export const updatePiso = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;

    try {
        const [result] = await pool.query('UPDATE piso_nivel SET Nombre = ? WHERE id = ?', [Nombre, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'piso no encontrado' });
        }
        res.json({ id, Nombre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}
