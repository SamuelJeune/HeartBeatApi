var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//app.use(express.static(_dirname+'/client'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());


Patient = require('./models/patient.js');

//Connect to Mongoose
//mongoose.connect('localhost/bookstore');
var promise = mongoose.connect('mongodb://localhost/heartbeatdb', {
  useMongoClient: true,
  /* other options */
});

var db = mongoose.connection;
promise.then(function(db) {
});

app.get('/', function(req, res){
	res.send('Please use /api/patients');
});

app.get('/api/patients', function(req, res){
	Patient.getPatients(function(err, patients){
		if(err){
			throw err;
		}
		res.json(patients);
	});
});

app.post('/api/patients', function(req, res){
	var patient = req.body;
	Patient.addPatient(patient, function(err, patient){
		if(err){
			throw err;
		}
		res.json(patient);
	});
});

app.put('/api/patients/:_id', function(req, res){
	var id = req.params._id;
	var patient = req.body;
	Genre.updatePatient(id, patient, {}, function(err, patient){
		if(err){
			throw err;
		}
		res.json(patient);
	});
});

app.delete('/api/patients/:_id', function(req, res){
	var id = req.params._id;
	Patient.removePatient(id, function(err, patient){
		if(err){
			throw err;
		}
		res.json(patient);
	});
});

app.listen(3000);
console.log('Running on port 3000...');