import express from 'express';
import { getUser,updateUser,deleteUser,createUser} from '../controllers/usuario.controllers.js';

const router = express.Router();

router.get('/usuario',getUser);


router.put('/usuario', updateUser);

router.delete('/usuario/:id', deleteUser);


router.post('/usuario/', createUser);

export default router;