import {pool} from '../../config/database.js';

export const getTarea = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createTarea = async (req, res) => {
    const { id, descripcion } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO tareas (id, Descripcion) VALUES (?, ?)', [id, descripcion]);
        res.json({ id, descripcion });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message});
    }
}

export const deleteTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const [[t]] = await pool.query('SELECT Descripcion FROM tareas WHERE id = ?', [id]);
        await pool.query('DELETE FROM activo_tareas WHERE Idtarea = ?', [id]);
        await pool.query('DELETE FROM ot WHERE Tareas = ?', [t?.Descripcion]);
        const [result] = await pool.query('DELETE FROM tareas WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'tarea no encontrada'});
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message});
    }
}

export const updateTarea = async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;

    try {
        const [result] = await pool.query('UPDATE tareas SET Descripcion = ? WHERE id = ?', [descripcion, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'tarea no encontrada'});
        }
        res.json({ id, descripcion });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message});
    }

}