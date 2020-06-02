import { genSaltSync, hashSync, compareSync } from 'bcrypt'

interface InterfaceHashPassword {
  createHash(password: string): string
  checkHash(passwordInString: string, passwordInHash: string): boolean
}

export class HashPassword implements InterfaceHashPassword {
  private salt = genSaltSync(10)

  public createHash(password: string): string {
    return hashSync(password, this.salt)
  }

  public checkHash(passwordInString: string, passwordInHash: string): boolean {
    return compareSync(passwordInString, passwordInHash)
  }
}
