var mongoose = require('mongoose');

//Admin Schema
var adminSchema = mongoose.Schema({
	username:{
		type:String,
		required: true
	},
	registered_date:{
		type: Date,
		default: Date.now
	}
});

var Admin = module.exports = mongoose.model('Patient', patientSchema);

// Get Patients
module.exports.getPatients = function(callback, limit){
	Patient.find(callback).limit(limit);
}

// Get Patient
module.exports.getPatientById = function(id, callback){
	Patient.findById(id, callback);
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