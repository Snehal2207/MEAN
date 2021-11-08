const express=require('express');
const router=express.Router();

const travelCtrl=require('../controllers/travelController');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

router
    .route('/travel')
    .get(travelCtrl.travelList)
    .post(travelCtrl.travelCreate)

router
    .route('/travel/:travelid')
    .get(travelCtrl.travelReadone)
    .put(travelCtrl.travelUpdateone)
    .delete(travelCtrl.travelDeleteone)


module.exports=router;