import jwt from 'jsonwebtoken'

const isAuth = async (req,res,next) => {
    try {
        let { token } = req.cookies
    
       
        if (!token) {
            return res.status(400).json({ message: "user dont have token  " })
        }

        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(500).json({ message: "User doesn't have valid token " })
        }

        
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        console.log("AUTH ERROR:", error.name, error.message);
        return res.status(500).json({ message: "Is auth error ", error:error.message })
    }
}

export default isAuth