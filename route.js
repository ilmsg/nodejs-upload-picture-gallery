const express = require('express');
const router = express.Router();

const fs = require('fs');
const util = require('util');
const formidable = require('formidable');

router.get('/', function(req, res) {
	fs.readdir( 'public/upload', function( err, pictures ){
		if( err ) throw err;
		res.render('main/index',{
			uri: 'home',
			pictures: pictures
		});
	});
});

router.get('/gallery', function(req, res) {
	fs.readdir( 'public/upload', function( err, pictures ){
		if( err ) throw err;
		pictures = pictures.sort(function() {
			return Math.random() - 0.5;
		});
		res.render('main/gallery',{
			uri: 'gallery',
			pictures: pictures
		});
	});
});

router.post('/upload', function (req, res){
	const form = new formidable.IncomingForm();
	form.uploadDir = "public/upload";
	form.keepExtensions = true;
	
	form.parse(req, function(err, fields, files) {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.end(util.inspect({files: files}));
	});
	
});

module.exports = router;
