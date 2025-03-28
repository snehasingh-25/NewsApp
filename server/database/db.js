import mongoose from "mongoose"
const Connection=async (username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-iafgpi8-shard-00-00.xbmn3ku.mongodb.net:27017,ac-iafgpi8-shard-00-01.xbmn3ku.mongodb.net:27017,ac-iafgpi8-shard-00-02.xbmn3ku.mongodb.net:27017/?ssl=true&replicaSet=atlas-2lj571-shard-0&authSource=admin&retryWrites=true&w=majority&appName=news`;
    try{
        await mongoose.connect(URL,{useNewUrlParser:true})
        console.log('Database connected')
    }
    catch(error){
        console.log('Error while connecting with database',error)
    }
}

export default Connection;