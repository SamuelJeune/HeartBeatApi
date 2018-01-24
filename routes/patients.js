const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Patient = require('../models/patient');

router.get('/', function(req, res){
	Patient.getPatients(function(err, patients){
		if(err){
			throw err;
		}
		res.json(patients);
	});
});

router.post('/', (req, res, next) => {
	let patient = req.body;
	Patient.addPatient(patient, (err, patient) =>{
    if(err){
      res.json({success: false, msg:'Failed to register doctor'});
    }else{
      res.json({success: true, msg:'Doctor registered'});
    }
	});
});


router.put('/:_id', function(req, res){
	var id = req.params._id;
	var patient = req.body;
	Genre.updatePatient(id, patient, {}, function(err, patient){
		if(err){
			throw err;
		}
		res.json(patient);
	});
});

router.delete('/:_id', function(req, res){
	var id = req.params._id;
	Patient.removePatient(id, function(err, patient){
		if(err){
			throw err;
		}
		res.json(patient);
	});
});

module.exports = router;