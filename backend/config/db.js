import mongoose from 'mongoose'


const connectDb = async()=>
{
    try
    { mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected ")
    }
    catch(error)
    {
console.log("Error from the database from the db.js",error )
    }
}

export default connectDb