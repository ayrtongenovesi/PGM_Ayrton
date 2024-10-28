import express from 'express';
import { getUser,updateUser,deleteUser,createUser} from '../controllers/usuario.controllers.js';

const router = express.Router();

router.get('/operarios',getUser);

router.put('/usuarios',updateUser);

router.delete('/usuarios/:id', deleteUser);

//asignar que solo admins puedan usar esta funcion 
router.post('/usuarios/', createUser);

export default router;