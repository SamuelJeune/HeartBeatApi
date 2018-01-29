var mongoose = require('mongoose');

var checkUpSchema = mongoose.Schema({
	date:{
		type: Date,
		default: Date.now
	},
	total_cholesterol: String,
	hdl_cholesterol: String,
	systolic: String,
	radioBP: String,
	diabete: String,
	smoker: String,
	risk: String
});
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
		type:String
	},
	sex:{
		type:String
	},
	birthdate:{
		type: Date
	},
	occupation:{
		type: String,
	},
	phone:{
		type:String
	},
	email:{
		type:String
	},
	address:{
		type:String
	},
	picture_url:{
		type:String
	},
	doctor_email:{
		type:String
	},
	check_ups:[checkUpSchema],
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
	const query = {email: email}
  Patient.findOne(query, callback);
}

module.exports.getPatientsByDoctor = function(doctor, callback){
	var query = {};
	query['doctor_email'] = doctor;
	Patient.find(query, callback);
}

// Add Patient
module.exports.addPatient = function(patient, callback){
	Patient.create(patient, callback);
}

module.exports.addCheckUp = function(check_up_to_push, email, callback){
	const query = {email: email};
	Patient.findOne(query, (err, data) => {
		if(err) throw err;
		var patient = data;
		const update = patient.check_ups.push(check_up_to_push);
		var opts = { strict: false };
		Patient.findOneAndUpdate({ "email": email},
    {
        "$push": {
            "check_ups": check_up_to_push
        }
    },callback)
	});
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
		email: patient.email,
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
