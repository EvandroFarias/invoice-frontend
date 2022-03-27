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
  name!: string
  value!: string
}
