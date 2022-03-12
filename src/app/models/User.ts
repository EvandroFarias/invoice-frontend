export class UserRegistration {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  verifyPassword?: string;
}

export class UserLogin {
  id!: string;
  email!: string;
  password!: string;
}
