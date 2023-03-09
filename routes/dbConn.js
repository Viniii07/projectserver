var mongo=require('mongodb')
function getConnection(){
   var url="mongodb+srv://parii:031216@cluster0.cjvsnea.mongodb.net/?retryWrites=true&w=majority"
   var mongoClient=mongo.MongoClient;
   return mongoClient.connect(url)
   
}

module.exports=getConnection