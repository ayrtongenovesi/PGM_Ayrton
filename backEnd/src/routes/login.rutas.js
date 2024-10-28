import express from 'express'
import { createLogin, deleteLogin, getLogin, updateLogin } from '../controllers/login.controller'

const router = express.Router()

router.get('/login', getLogin)

router.put('/login', updateLogin)

router.delete('/login:id', deleteLogin)

router.post('/login/', createLogin)

export default router
