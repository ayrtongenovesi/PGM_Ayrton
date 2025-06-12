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
    try {
        const [[ed]] = await pool.query('SELECT Nombre FROM edificio WHERE id = ?', [id]);
        await pool.query('DELETE FROM cuia WHERE idE = ?', [id]);
        await pool.query('DELETE FROM sector WHERE IdEdificio = ?', [id]);
        await pool.query('DELETE FROM ot WHERE Edificio = ?', [ed?.Nombre]);
        const [result] = await pool.query('DELETE FROM edificio WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'edificio no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
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
