import express from 'express'
// const express = require('express');
import {
  getSubs,
  addSub,
  editSub,
  deleteSub,
  getNotification,
  deleteNotif
} from './controllers/controllers'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the OnTrial Subscription Tracker!')
})
router.get('/subscriptions', getSubs)
router.post('/subscriptions', addSub)
router.put('/subscriptions/:id', editSub)
router.delete('/subscriptions/:id', deleteSub)
router.delete('/notifications/:id', deleteNotif)
router.get('/notifications', getNotification)

export default router
