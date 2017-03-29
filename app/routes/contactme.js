var express = require('express');
var router = express.Router();	

router.get('/contactme',function(req,res){

	res.render('contactus',{
		pageTitle:'Contact Me',		
		pageID:'contactme'
	});
});

module.exports =router;