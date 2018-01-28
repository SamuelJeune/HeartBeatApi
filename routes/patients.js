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
      res.json({success: false, msg:'Failed to register patient'});
    }else{
      res.json({success: true, msg:'Patient registered'});
    }
	});
});

//Profile
router.post('/profile', (req, res, next) => {
  //res.send('PROFILE');
	const email = req.body.email;
  Patient.getPatientByEmail(email, (err, patient) => {
    if(err) throw err;
    if(!patient){
      return res.json({success: false, msg: 'Patient not found'})
    }else{
			res.json({patient: patient});
		}

	});
});

router.post('/doctor', (req, res, next) => {
	const doctor_email = req.body.email;
	Patient.getPatientsByDoctor(doctor_email, (err, patients) => {
		if(err) throw err;
		if(!patients){
      return res.json({success: false, msg: 'Patient not found'})
    }else{
		res.json({patients: patients});
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
