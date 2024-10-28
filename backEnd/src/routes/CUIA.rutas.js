import express from 'express'
import { getCUIA,deleteCUIA,updateCUIA,createCUIA } from '../controllers/CUIA.controller.js'
const router = express.Router()

router.get('/cuia',getCUIA)

router.put('/cuia',updateCUIA)

//router.delete('/B', deleteCUIA)// no se utilice 

router.post('/cuia/', createCUIA)

export default router