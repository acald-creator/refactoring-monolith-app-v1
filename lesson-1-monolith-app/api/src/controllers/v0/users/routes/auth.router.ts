import * as Hapi from '@hapi/hapi'
import { User } from '../models/Users'

import * as bcrypt from 'bcrypt'

/* Generate the password */
async function generatePassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10
    let salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(plainTextPassword, salt)
}
/* Compare the password */
async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hash)
}