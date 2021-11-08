const { response } = require('express');
const mongoose=require('mongoose');
const Travel=mongoose.model('travel');

var sendJSOnResponse=function(res,status,content){
    res.status(status);
    res.json(content);
}

const travelList=function(req,res){
    Travel.find().exec(function(err,tdata){
        if(err){
            sendJSOnResponse(res,404,err);
            return;
        }
        else if(tdata.length<=0){
            sendJSOnResponse(res,404,{"message":"list empty"});
        }
        else{
            sendJSOnResponse(res,200,tdata);
        }
    })
};

const travelReadone=function(req,res){
    if(req.params && req.params.travelid){
        Travel  
            .findById(req.params.travelid)
            // .select('name accomodation')
            .exec((err,tdata)=>{
                // const accomodation=tdata.accomodation.id(req.params.accid);
                if(!tdata){
                   sendJSOnResponse(res,404,{"message":"id not found"})
                   return;
                }
                else if(err){
                    sendJSOnResponse(res,404,err);
                    return;
                }
                else{
                    sendJSOnResponse(res,200,tdata);
                }
            });
    }
    else{
        sendJSOnResponse(res,404,{"Message":"no id in request"});    
    }
};

const travelCreate=function(req,res){
    Travel
    .create({
        name:req.body.name,
        image:req.body.image,
        expense:req.body.expense,
        about:req.body.about,
        weather:req.body.weather,
        activities:req.body.activities.split(','),
        // tdata.nearByLocation=req.body.nearByLocation;
        accomodation:[{
            
            aname:req.body.accomodation[0].aname1,
            rent:req.body.accomodation[0].rent1,
            rating:req.body.accomodation[0].rating1,
            phone:req.body.accomodation[0].phone1
        },{
            
            aname:req.body.accomodation[0].aname2,
            rent:req.body.accomodation[0].rent2,
            rating:req.body.accomodation[0].rating2,
            phone:req.body.accomodation[0].phone2
        }]
    },
    (err,tdata)=>{
        if(err) {
            sendJSOnResponse(res, 400, err);
        }
        else {
            sendJSOnResponse(res, 200, tdata);
        }
    });
};


const travelUpdateone=function(req,res){
    if(!req.params.travelid){
        sendJSOnResponse(res,404,{
            "Message":"travel Not found"
        });
        return;
    }
    Travel.findById(req.params.travelid)
    .exec((err,tdata)=>{
        if(!tdata){
            sendJSOnResponse(res,404,{"Message":"travelid not found"});
            return;
        }
        else if(err){
            sendJSOnResponse(res,400,err)
            return;
        }
        tdata.name=req.body.name;
        tdata.image=req.body.image;
        tdata.expense=req.body.expense;
        tdata.about=req.body.about;
        tdata.weather=req.body.weather;
        tdata.activities=req.body.activities.split(',');
        // tdata.nearByLocation=req.body.nearByLocation;
        tdata.accomodation=[{
            aname:req.body.aname1,
            rent:req.body.rent1,
            rating:req.body.rating1,
            phone:req.body.phone1

        },{
            aname:req.body.aname2,
            rent:req.body.rent2,
            rating:req.body.rating2,
            phone:req.body.phone2
        }];
        tdata.save((err,tdata)=>{
            if(err){
                sendJSOnResponse(res,400,err);
            }
            else{
                sendJSOnResponse(res,200,tdata);
            }
        });
    });
};

const travelDeleteone=function(req,res){
    const travelid=req.params.travelid;
    if(travelid){
        Travel
            .findByIdAndRemove(travelid)
            .exec((err,tdata)=>{
                if(err){
                    sendJSOnResponse(res,404,err);
                    return;
                }
                sendJSOnResponse(res,204,null);
            });
    }
    else{
        sendJSOnResponse(res,404,{"message":"travelid is required"});
    }
}

module.exports={
    travelList,
    travelReadone,
    travelUpdateone,
    travelCreate,
    travelDeleteone
}