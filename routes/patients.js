const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Patient = require('../models/patient');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res){
	Patient.getPatients(function(err, patients){
		if(err){
			throw err;
		}
		res.json(patients);
	});
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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
router.post('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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

router.post('/doctor', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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

router.put('/addCheckUp', (req, res, next) => {
	const check_up_to_push = req.body.check_up_to_push;
	const email = req.body.email;
	Patient.addCheckUp(check_up_to_push, email, (err) => {
		if(err){
      res.json({success: false, msg:'Failed to add check_up'});
    }else{
      res.json({success: true, msg:'success'});
    }
	})
});


router.put('/:_id', passport.authenticate('jwt', {session: false}), function(req, res){
	var id = req.params._id;
	var patient = req.body;
	Patient.updatePatient(id, patient, {}, function(err, patient){
		if(err){
			throw err;
		}
		res.json(patient);
	});
});

router.delete('/:_id', passport.authenticate('jwt', {session: false}), function(req, res){
	var id = req.params._id;
	Patient.removePatient(id, function(err, patient){
		if(err){
			throw err;
		}
		res.json(patient);
	});
});

module.exports = router;
