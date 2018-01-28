const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Doctor = require('../models/doctor');


//Get Doctors
router.get('/', function(req, res){
	Doctor.getDoctors(function(err, doctors){
		if(err){
			throw err;
		}
		res.json(doctors);
	});
});

//Register
router.post('/', (req, res, next) => {
  //res.send('REGISTER');
  let newDoctor = new Doctor({
    firstname: req.body.firstname,
		lastname: req.body.lastname,
		speciality: req.body.speciality,
		email: req.body.email
  });

  Doctor.addDoctor(newDoctor, (err, doctor) => {
    if(err){
      res.json({success: false, msg:'Failed to register doctor'});
    }else{
      res.json({success: true, msg:'Doctor registered'});
    }
  });
});

//Profile
router.post('/profile', (req, res, next) => {
  //res.send('PROFILE');
	const email = req.body.doctor_email;
  Doctor.getDoctorByEmail(email, (err, doctor) => {
    if(err) throw err;
    if(!doctor){
      return res.json({success: false, msg: 'doctor not found'})
    }else{
			res.json({doctor: doctor});
		}

	});
});

router.put('/:_id', function(req, res){
	var id = req.params._id;
	var doctor = req.body;
	Doctor.updateDoctor(id, doctor, {}, function(err, doctor){
		if(err){
			throw err;
		}
		res.json(doctor);
	});
});

router.delete('/:_id', function(req, res){
	var id = req.params._id;
	Doctor.removeDoctor(id, function(err, doctor){
		if(err){
			throw err;
		}
		res.json(doctor);
	});
});

module.exports = router;
