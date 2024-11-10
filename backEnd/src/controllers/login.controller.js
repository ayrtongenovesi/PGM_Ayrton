import { pool } from '../../config/database.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { nombre, mail, IdTipoUsuario, contraseña } = req.body;

   
    if (!nombre || !mail || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
      
        const [existingUser] = await pool.query('SELECT * FROM usuario WHERE mail = ?', [mail]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo ya está en uso' });
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds); 
       
        const [result] = await pool.query(
            'INSERT INTO usuario (nombre, mail, IdTipoUsuario, contraseña) VALUES (?, ?, ?, ?)',
            [nombre, mail, IdTipoUsuario, hashedPassword]
        );

      
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const login = async (req, res) => {
  const { mail, contraseña } = req.body;

 
  if (!mail || !contraseña) {
      return res.status(400).json({ message: 'El correo y la contraseña son requeridos' });
  }

  try {
   
      const [rows] = await pool.query('SELECT * FROM usuario WHERE mail = ?', [mail]);
      if (rows.length === 0) {
          return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }

      const user = rows[0];

      
      if (!user.contraseña) {
          return res.status(401).json({ message: 'El usuario no tiene contraseña definida' });
      }

      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
          return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }

      const token = jwt.sign({ id: user.id, nombre: user.nombre,IdTipoUsuario: user.IdTipoUsuario, mail: user.mail }, process.env.JWT_SECRET, {
          expiresIn: '1h' 
      });

      res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
};
  

export { register, login };
