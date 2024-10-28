import express from 'express';
import { createUbicacion, deleteUbicacion, getUbicacion, updateUbicacion } from '../controllers/ubicacion.controller.js';

const router = express.Router()

router.get('/ubicacion', getUbicacion);

router.put('/ubicacion', updateUbicacion)

router.delete('/ubicacion/:id', deleteUbicacion)

router.post('/ubicacion/', createUbicacion)

export default router