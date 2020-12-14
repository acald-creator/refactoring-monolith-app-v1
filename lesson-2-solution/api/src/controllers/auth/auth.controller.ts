import * as express from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as c from '../../config/config'
import * as EmailValidator from 'email-validator'
import { NextFunction, Request, Response } from 'express'
import { User } from "../../models/Users";
// @ts-ignore
import IControllerBase from 'interfaces/IControllerBase.interface'

/* Generate password */
async function generatePassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10
    let salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(plainTextPassword, salt)
}
/* Compare the password */
async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hash)
}
/* Generate the JWT token */
function generateJWT(user: User): string {
    console.log("generateJWT")
    return jwt.sign(user.short(), c.config.jwt.secret)
}
/* Setup authorization */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if(!req.headers || !req.headers.authorization) {
        return res.status(401).send({
            message: 'No authorization headers'
        })
    }
    /* Check if token matches */
    const tokenBearer = req.headers.authorization.split(' ')
    if(tokenBearer.length !== 2) {
        return res.status(401).send({
            message: 'Malformed token'
        })
    }
    const token = tokenBearer[1]
    return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate'
            })
        }
        return next()
    })
}

class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.registered, this.auth)
        this.router.get('/login', this.login)
        this.router.get('/verification', requireAuth, this.verification)
    }

    /* Register a new user */
    registered = async (req: Request, res: Response) => {
        const email = req.body.email, plainTextPassword = req.body.password;
        if(!email || !EmailValidator.validate(email)) {
            return res.status(400).send({
                auth: false,
                message: 'Email is required or malformed'
            })
        }

        if(!plainTextPassword) {
            return res.status(400).send({
                auth: false,
                message: 'Password is required'
            })
        }

        const user = await User.findByPk(email)
        if(user) {
            return res.status(422).send({
                auth: false,
                message: 'User may already exist'
            })
        }

        const passwordHash = await generatePassword(plainTextPassword)

        const newUser = await new User({
            email: email,
            passwordHash: passwordHash
        })

        let savedUser

        try {
            savedUser = await newUser.save()
        } catch(e) {
            throw e
        }
    }
    /* Verifies that the user can login */
    login = async (req: Request, res: Response) => {
        const email = req.body.email
        const password = req.body.password
        /* Check if email is valid */
        if(!email || !EmailValidator.validate(email)) {
            return res.status(400).send({
                auth: false,
                message: 'Email is required or malformed'
            })
        }
        /* Check if password is valid */
        if(!password)
            return res.status(400).send({
                auth: false,
                message: 'Password is required'
            })
        /* Check that a user exists */
        const user = await User.findByPk(email)
        if(!user) {
            return res.status(401).send({
                auth: false,
                message: 'Unauthorized'
            })
        }
        /* Check if password matches */
        const authValid = await comparePasswords(password, user.passwordHash)
        if(!authValid) {
            return res.status(401).send({
                auth: false,
                message: 'Unauthorized'
            })
        }
        /* Generate the JWT */
        const jwt = generateJWT(user)
        res.status(200).send({
            auth: true,
            token: jwt,
            user: user.short()
        })
    }
    /* Authorizes the user */
    auth = async (req: Request, res: Response) => {
        res.send('/auth')
    }

    /* Verifies that the user can login */
    verification = async (req: Request, res: Response) => {
        return res.status(200).send({
            auth: true,
            message: 'Authenticated'
        })
    }
}

export default AuthController