import express from 'express';
import { createUbicacion, deleteUbicacion, getUbicacion, updateUbicacion } from '../controllers/ubicacion.controller.js';

const router = express.Router()

router.get('/ubicacion', getUbicacion);

router.put('/ubicacion/edit/:id', updateUbicacion)

router.delete('/ubicacion/delete/:id', deleteUbicacion)

router.post('/ubicacion/create', createUbicacion)

export default router