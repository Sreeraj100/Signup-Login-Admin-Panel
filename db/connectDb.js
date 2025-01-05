const mongoose =require('mongoose')

const connectDB =async ()=>{
try{
const conn= await mongoose.connect('mongodb://localhost:27017/userAuth',{

})
if(conn){
    console.log('Mongodb connected');
}
}catch(error){
console.log(error)
process.exit(1)
}
}
module.exports= connectDB