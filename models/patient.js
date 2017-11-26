var mongoose = require('mongoose');

//Patient Schema
var patientSchema = mongoose.Schema({
	firstname:{
		type:String,
		required: true
	} ,
	lastname:{
		type:String,
		required: true
	},
	username:{
		type:String,
		required: true
	},
	sex:{
		type:String,
		required:true
	},
	birthdate:{
		type: Date,
		required: true
	},
	occupation:{
		type: String,
	},
	phone:{
		type:String,
		required: true
	},
	mail:{
		type:String
	},
	address:{
		type:String,
		required: true
	},
	picture_url:{
		type:String
	},
	registered_date:{
		type: Date,
		default: Date.now
	}
});

var Patient = module.exports = mongoose.model('Patient', patientSchema);

// Get Patients
module.exports.getPatients = function(callback, limit){
	Patient.find(callback).limit(limit);
}

// Get Patient
module.exports.getPatientById = function(id, callback){
	Patient.findById(id, callback);
}

// Get Patient by Email
module.exports.getPatientByEmail = function(email, callback){
	Patient.findOne(email, callback);
}

// Add Patient
module.exports.addPatient = function(patient, callback){
	Patient.create(patient, callback);
}


//update Patient
module.exports.updatePatient = function(id, patient, options, callback){
	var query = {_id:id};
	var update ={
		firstname: patient.firstname,
		lastname: patient.lastname,
		username: patient.username,
		sex: patient.sex,
		birthdate: patient.birthdate,
		occupation: patient.occupation,
		phone: patient.phone,
		mail: patient.mail,
		address: patient.address,
		picture_url: patient.picture_url,
	}
	Patient.findOneAndUpdate(query, update, options, callback);
}

//delete Patient
module.exports.removePatient = function(id, callback){
	var query = {_id:id};
	Patient.remove(query, callback);
}