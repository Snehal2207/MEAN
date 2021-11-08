const mongoose=require('mongoose');

const dbURI="mongodb+srv://admin:admin@inclasstask.zxgpq.mongodb.net/travelDB?retryWrites=true&w=majority";

mongoose.connect(dbURI);


mongoose.connection.on("connected",()=>{
    console.log(`mongoose connected to ${dbURI}`);
})

mongoose.connection.on("error",err=>{
    console.log("mongoose connection error",err);
});

mongoose.connection.on("disconnected",()=>{
    console.log("mongoose disconnceted");
})


require('./travelListModel');