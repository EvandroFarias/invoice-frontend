export class ItemCreation {
  userEmail!: string
  name!: string
  value!: string

  constructor(email: string, name: string, value: string){
    this.userEmail = email
    this.name = name
    this.value = value
  }
}

export class ItemView {
  name!: string
  value!: string
}
