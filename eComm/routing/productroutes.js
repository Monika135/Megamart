const express = require("express");
const route = express.Router();
const ObjectId = require("mongodb").ObjectId;
const server = require("../server");
let dbinstance = server.dbinstance;

route.get("/",(req,res)=>{
    dbinstance.collection("Products").find({}).toArray().then((data)=>{
        res.render("products/ShowAll",{data:data});
    })
})

route.get("/Show/:id",(req,res)=>{
    dbinstance.collection("Products").find({'_id':new ObjectId(req.params.id)}).toArray().then((data)=>{
        res.render("products/Show",{data:data});
    })
})

route.get("/add",(req,res)=>{
    res.render("products/create");
})
route.get("/edit/:id",(req,res)=>{
    dbinstance.collection("Products").find({'_id':new ObjectId(req.params.id)}).toArray().then((data)=>{
        res.render("products/edit",{data:data});
    })
})

route.post("/edit",(req,res)=>{
    dbinstance.collection("Products").updateOne({'_id':new ObjectId(req.body._id)},{$set:{'name':req.body.name,'price':parseInt(req.body.price),'desc':req.body.desc}}).then((data)=>{
        res.redirect("/products/");
    })
})
route.get("/delete/:id",(req,res)=>{
    dbinstance.collection("Products").find({'_id':new ObjectId(req.params.id)}).toArray().then((data)=>{
        res.render("products/delete",{data:data});
    })
})


route.post("/delete",(req,res)=>{
    dbinstance.collection("Products").deleteOne({'_id':new ObjectId(req.body._id)}).then((data)=>{
        res.redirect("/products/");
    })
})
route.post("/add",(req,res)=>{
    let obj={};
    obj.image = req.body.image
    obj.id=req.body.id;
    obj.name=req.body.name;
    obj.price=req.body.price;
    obj.desc = req.body.desc;
    dbinstance.collection("Products").insertOne(obj).then((data)=>{
        res.redirect("/products");
    })

})
module.exports = route;