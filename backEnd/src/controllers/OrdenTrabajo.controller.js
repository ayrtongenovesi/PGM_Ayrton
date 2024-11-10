import {pool} from '../../config/database.js';

export const getOT = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM ot')
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const createOT = async (req, res) => {
    console.log('Datos recibidos en req.body:', req.body);
    const { edificio, sector, piso, tipoActivo, ubicacion, tareas} = req.body;
    
    const tareasTexto = tareas.join(', ');
    
    try {
      const [result] = await pool.query(
        'INSERT INTO ot (Edificio, Piso, Ubicacion, Sector, Tipo_Activo, Tareas) VALUES (?, ?, ?, ?, ?, ?)',
        [edificio, piso, ubicacion, sector, tipoActivo, tareasTexto] 
      );
      res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error Servicio Interno', error: err.message });
    }
  };


/*export const createOT =async (req,res)=>{
    try {
        const[result] = await pool.query('INSERT INTO OT (//DATOS DE CODIGO//) VALUES(?,?,?)', [OT])
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}*/

export const deleteOT= async(req,res)=>{
    const {OT} = req.params
    try {
        const [result] = await pool.query('DELETE FROM OT WHERE OT = ?', [OT])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'OT no encontrado'})
            
        }
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }
}

export const updateOT = async (req,res)=>{
    const {OT} = req.params
    
    try {
        const [result] =await pool.query('UPDATE OT SET (????) = ? ', [OTT])
        if (result.affectedRows === 0) {
            return res.status(404).json({message:'OT no encontrado'})
        }
        res.json({OT})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Error Servicio Interno', error: err.message})
    }

}