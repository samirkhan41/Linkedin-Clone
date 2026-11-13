import User from "../models/usermodel.js"


export const getCurrentUser = async (req, res) => {
    try {
        let id = req.userId
        const user = await User.findById(id).select("-password")
        if (!user) {
            return res.status(400).json({ message: "User doest not found " })

        }

        return res.status(200).json(user)

    }
    catch (error) {
        return res.status(400).json({ message: " get Cureent user error " })
    }
}
