import { model, Schema, Document } from 'mongoose'

// para extender comportamento do mongo
export interface UserInterface extends Document {
  email?: string
  firstName?: string
  lastName?: string
  createdAt: Date
  updatedAt: Date
  fullName(): string
  sanitize(): object
}

const schema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  },
)

// add comportament
schema.methods.fullName = function (): string {
  return `${this.firstName} ${this.lastName}`
}

schema.methods.sanitize = function (): UserInterface {
  const { _id: id, email, lastName, createdAt, updatedAt } = this
  return { id, email, lastName, createdAt, updatedAt }
}

export const UserModel = model<UserInterface>('User', schema)
