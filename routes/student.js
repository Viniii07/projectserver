var express= require('express')
var router=express.Router()
var mongodb=require('mongodb')
var ObjectId=require('mongodb').ObjectId
var getConnection=require('./dbConn')

router.get('/test',function(request,response,next){
   response.send('Hi this is sachin, I am from mumbai')
})

router.get('/testq',function(request,response,next){ 
   var n=request.query.name
   var l=request.query.loc
   response.send(`Hi this is ${n} , I am from ${l}`)
})

router.get('/testp/:name/:loc',function(request,response,next){ 
   var n=request.params.name
   var l=request.params.loc
   response.send(`Hi this is ${n} , I am from ${l}`)
})

router.delete('/testp/:name/:loc',function(request,response,next){ 
   var n=request.params.name
   var l=request.params.loc
   response.send(`Hi this is ${n} , I am from ${l}`)
})

router.put('/testh',function(request,response,next){ 
   var n=request.headers.name
   var l=request.headers.loc
   response.send(`Hi this is ${n} , I am from ${l}`)
})

router.post('/testb',function(request,response,next){ 
   var n=request.body.name
   var l=request.body.loc
   response.send(`Hi this is ${n} , I am from ${l}`)
})

//register student
router.post('/reg',function(request,response,next){
   var document=request.body.data;
   getConnection()
   .then((server)=>{
     var db=server.db('college')
     var collection=db.collection('users')
     collection.insertOne(document)
     .then((res)=>{
      response.send(res)
     })
     .catch((res)=>{
      response.send(res)
     })
   })
   .catch(()=>{
      response.send('DB connection error')
   })
})

//update the student
router.put('/update/:id',function(request,response,next){
   var id=request.params.id
   var newData=request.body.data
   delete newData._id
   getConnection()
   .then((server)=>{
      var db=server.db('college')
      var collection=db.collection('users')
      collection.updateOne({_id:new mongodb.ObjectId(id)},{$set:newData})
      .then((res)=>{
       response.send(res)
      })
      .catch((res)=>{
       response.send(res)
      })
    })
    .catch(()=>{
       response.send('DB connection error')
    })
})

//delete the student
router.delete('/delete',function(request,response,next){
var id=request.query.id;
getConnection()
.then((server)=>{
   var db=server.db('college')
   var collection=db.collection('users')
   collection.deleteOne({_id:new mongodb.ObjectId(id.toString())})
   .then((res)=>{
    response.send(res)
   })
   .catch((res)=>{
    response.send(res)
   })
 })
 .catch(()=>{
    response.send('DB connection error')
 })  
})

//get the student
router.get('/get',function(request,response,next){
  getConnection()
   .then(function(server){
    var db=server.db('college')
    var collection=db.collection('users')
    collection.find({}).toArray()
    .then(function(res){
      response.send(res)
    })
    .catch(function(res){
      response.send(res)
    })
   })
   .catch(function(){
      response.send('DB connection error')
   })
})

module.exports=router