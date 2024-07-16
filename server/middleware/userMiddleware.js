import jwt from "jsonwebtoken"

export const authCheck = async (req, res, next) => {
    try {


        //authenticate headers
        const authheader = req.headers.authorization;
        if (!authheader) {
            return res.json({
                message: "authorization not found",
                error: true,
                success: false
            })
        }
        //veryfing jwt
        const verifyUser = await jwt.verify(authheader, process.env.JWT_SECRET_KEY)
        if (verifyUser) {
            req.userId = verifyUser?.id
            next()
        }
        else {
            console.log(" authenticated user failed: ")
            throw new Error("Authentication check failed with error: ")
        }
    } catch (error) {
        console.log("Authentication check failed", console.log(error))
    }
}