export class ItemCreation {
  invoiceId!: string
  name!: string
  value!: string

  constructor(invoiceId: string, name: string, value: string){
    this.invoiceId = invoiceId
    this.name = name
    this.value = value
  }
}

export class ItemView {
  id!: string
  name!: string
  value!: string
}
