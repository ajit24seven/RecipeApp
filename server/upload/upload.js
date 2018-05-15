const express = require("express");
const router = express.Router();
const multer  = require('multer');

const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

let upload = multer({ storage: storage }).single('photo');

router.post('/upload', function(req, res) {
    upload(req,res,function(err){
        let fileObj = req.file;
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({"fileObj":fileObj, success:true, msg:"File successfully uploaded"});
    });
});

module.exports = router; 

