import express from 'express'
import { getCUIA,updateCUIA,createCUIA } from '../controllers/CUIA.controller.js'
const router = express.Router()

router.get('/cuia',getCUIA)

router.put('/cuia/edit:id',updateCUIA)

router.post('/cuia/create', createCUIA)

export default router