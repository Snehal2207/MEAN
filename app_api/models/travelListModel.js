const mongoose=require('mongoose');

const accomodationSchema=new mongoose.Schema({
    aname:{
        type:String,
        required:false},
    rent:{
        type:String,
        required:false
    },
    rating:{
        type:Number,
        required:false,
        minlength:1,
        maxlength:5
    },
    phone:{
        type:String,
        required:false
    }
});

const travelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    expense:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    weather:{
        type:String,
        required:true
    },
    activities:[String],
    // nearByLocation:[String],
    accomodation:[accomodationSchema]
});

mongoose.model('travel',travelSchema);