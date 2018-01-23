var mongoose = require('mongoose');
const config = require('../config/database');


//Patient Schema
var doctorSchema = mongoose.Schema({
	firstname:{
		type:String,
		required: true
	} ,
	lastname:{
		type:String,
		required: true
	},
	speciality:{
		type: String,
	},
	email:{
		type:String,
    required: true
	},
	registered_date:{
		type: Date,
		default: Date.now
	}
});
const Doctor = module.exports = mongoose.model('Doctor', doctorSchema);

// Get Patients
module.exports.getDoctors = function(callback, limit){
	Doctor.find(callback).limit(limit);
}

// Get Patient
module.exports.getDoctorById = function(id, callback){
	Doctor.findById(id, callback);
}

// Get Patient by Email
module.exports.getDoctorByEmail = function(email, callback){
	Doctor.findOne(email, callback);
}

// Add Patient
module.exports.addDoctor = function(doctor, callback){
	Doctor.create(doctor, callback);
}


//update Patient
module.exports.updateDoctor = function(id, doctor, options, callback){
	var query = {_id:id};
	var update ={
		firstname: doctor.firstname,
		lastname: doctor.lastname,
		speciality: doctor.speciality,
		email: doctor.email,
	}
	Patient.findOneAndUpdate(query, update, options, callback);
}

//delete Patient
module.exports.removeDoctor = function(id, callback){
	var query = {_id:id};
	Doctor.remove(query, callback);
}
