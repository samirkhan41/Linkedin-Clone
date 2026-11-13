import jwt from 'jsonwebtoken'

const genToken = async (userId)=>
{
    try {
        let token =await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    }
     catch (error) {
      console.log("Error from the token.js ")
    }
}

export default genToken