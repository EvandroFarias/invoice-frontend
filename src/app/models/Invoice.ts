import { ItemView } from "./Item"

export class Invoice{
  id!: string
  name!: string
  created_at!: Date
  updated_at!: Date
  items?: ItemView[]
}