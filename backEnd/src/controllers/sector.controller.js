import {pool} from '../../config/database.js';


export const getSector = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM sector')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createSector = async (req, res) => {
    const { id, Sector, IdEdificio } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO sector (id, Sector, IdEdificio) VALUES (?, ?, ?)', [id, Sector, IdEdificio]);
        res.json({ id, Sector, IdEdificio });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}

export const deleteSector = async (req, res) => {
    const { id } = req.params;
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [[sec]] = await conn.query('SELECT Sector FROM sector WHERE id = ?', [id]);
        await conn.query('DELETE FROM cuia WHERE idS = ?', [id]);
        await conn.query('DELETE FROM ot WHERE Sector = ?', [sec?.Sector]);
        const [result] = await conn.query('DELETE FROM sector WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            await conn.rollback();
            conn.release();
            return res.status(404).json({ message: 'sector no encontrado' });
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

export const updateSector = async (req, res) => {
    const { id } = req.params;
    const { Sector, IdEdificio } = req.body;

    try {
        const [result] = await pool.query('UPDATE sector SET Sector = ?, IdEdificio = ? WHERE id = ?', [Sector, IdEdificio, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'sector no encontrado' });
        }
        res.json({ id, Sector, IdEdificio });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
}
