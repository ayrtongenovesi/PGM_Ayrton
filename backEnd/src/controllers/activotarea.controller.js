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
    try {
        await pool.query('DELETE FROM activo_tareas WHERE IDAct = ?', [id]);
        await pool.query('DELETE FROM cuia WHERE idTA = ?', [id]);
        const [result] = await pool.query('DELETE FROM activo WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'AT no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
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
