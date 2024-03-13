import { Schema, model } from 'mongoose'

export interface NOTIFICATION {
  message: string
  date: Date
  read: boolean
}
const notificationSchema = new Schema<NOTIFICATION>({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
})

const Notification = model<NOTIFICATION>('Notification', notificationSchema)

export default Notification