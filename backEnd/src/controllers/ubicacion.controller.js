import {pool} from '../../config/database.js';

export const getUbicacion = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM ubicacion')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createUbicacion = async (req, res) => {
    const { id, Nombre } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO ubicacion (id, Nombre) VALUES (?, ?)', [id, Nombre]);
        res.json({ id, Nombre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}

export const deleteUbicacion = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM cuia WHERE idU = ?', [id]);
        const [result] = await pool.query('DELETE FROM ubicacion WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ubicacion no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}

export const updateUbicacion = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;

    try {
        const [result] = await pool.query('UPDATE ubicacion SET Nombre = ? WHERE id = ?', [Nombre, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ubicacion no encontrado' });
        }
        res.json({ id, Nombre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }

}
