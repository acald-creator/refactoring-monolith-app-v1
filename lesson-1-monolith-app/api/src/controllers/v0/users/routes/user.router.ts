import { User } from "../models/Users"
import { AuthRouter } from "./auth.router"

export function UserRouter() {
    const Call = require("@hapi/call")
    const router = new Call.Router()

    router.use("/auth", AuthRouter)

    router.add(
        {
            method: "GET",
            path: "/",
            handler: async (request, h) => {
            }
        },
        {
            method: "GET",
            path: "/:id",
            handler: async (request, h) => {
                let { id } = request.params
                const item = await User.findByPk(id)

                return item
            }
        }
    )
}