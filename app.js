const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');

const users = require('./routes/users');
const doctors = require('./routes/doctors');

const app = express();

//Port Number
const port = 3000;
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//Allow Cross Origin Request
app.use(cors());
//Body Parser Middleware
app.use(bodyParser.json());
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/doctors', doctors);

Patient = require('./models/patient.js');

//Connect to Mongoose
mongoose.connect(config.database, {
  useMongoClient: true,
  /* other options */
});
//On connection
mongoose.connection.on('connected', () => {
    console.log('Connect to db '+config.database);
});
//On connection Error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

var db = mongoose.connection;


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

app.listen(port, () => {
  console.log('Server running on port '+port);
});
