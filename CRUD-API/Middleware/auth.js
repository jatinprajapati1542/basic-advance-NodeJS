import jwt from "jsonwebtoken";

const isauth = (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization
        // console.log(bearerHeader)
        if (!bearerHeader) return res.status(401).json({ message: "no token provided" })

        const token = bearerHeader.split(" ")[1]

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        // console.log( "token = " , token)
        // console.log( "decode = " ,  decode)
        req.token = decode
        next()
    } catch (error) {
        return res.status(403).json({ message: error.message })
    }
}

export default isauth