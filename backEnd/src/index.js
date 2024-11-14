import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {pool} from '../config/database.js';

 import userRoutes from './routes/usuario.rutas.js';
 import cuiaRoutes from './routes/CUIA.rutas.js';
 import edificioRoutes from './routes/edificio.rutas.js';
 import pisoRoutes from './routes/piso.rutas.js';
 import activoRoutes from './routes/activotarea.rutas.js'; 
 import ubicacionRoutes from './routes/ubicacion.rutas.js';


import loginRoutes from './routes/login.rutas.js'

 import sectorRoutes from './routes/sector.rutas.js';
 import TareaRoutes from './routes/tareas.rutas.js';
 import ordenRoutes from './routes/OrdenTrabajo.rutas.js';
 



const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.DB_USER); 
console.log(process.env.DB_PASSWORD);  

app.use(cors({
    origin:'http://localhost:4200',credentials:true
}));

app.use(express.json());
app.use('/api/auth', loginRoutes);
app.use('/api',cuiaRoutes);
app.use('/api',edificioRoutes );
app.use('/api', pisoRoutes);
app.use ('/api', activoRoutes);
app.use ('/api', ubicacionRoutes);
app.use ('/api', userRoutes );
app.use ('/api', sectorRoutes );
app.use ('/api', TareaRoutes );
app.use ('/api', ordenRoutes );


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});
