import {pool} from '../../config/database.js';

export const getEdificio = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM edificio')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createEdificio = async (req, res) => {
    const { id, Nombre, Direccion } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO edificio (id, Nombre, Direccion) VALUES (?, ?, ?)', [id, Nombre, Direccion]);
        res.json({ id, Nombre, Direccion });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}

export const deleteEdificio = async (req, res) => {
    const { id } = req.params;
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [[ed]] = await conn.query('SELECT Nombre FROM edificio WHERE id = ?', [id]);
        await conn.query('DELETE FROM cuia WHERE idE = ?', [id]);
        await conn.query('DELETE FROM sector WHERE IdEdificio = ?', [id]);
        await conn.query('DELETE FROM ot WHERE Edificio = ?', [ed?.Nombre]);
        const [result] = await conn.query('DELETE FROM edificio WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            await conn.rollback();
            conn.release();
            return res.status(404).json({ message: 'edificio no encontrado' });
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

export const updateEdificio = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Direccion } = req.body;

    try {
        const [result] = await pool.query('UPDATE edificio SET Nombre = ?, Direccion = ? WHERE id = ?', [Nombre, Direccion, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'edificio no encontrado' });
        }
        res.json({ id, Nombre, Direccion });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}
