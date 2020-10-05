var fs = require('fs'),
	_ = require('underscore'),
	mysql = require('mysql'),
	readLine = require('readline'),
	config = {
		multipleStatements: true
	},
	conn;

function exec(sql, callback) {
	conn.query(sql, function (err, results) {
		if (!_.isArray(results)) {
			results = [results];
		}
		if (typeof callback === 'function') {
			callback(err, results);
		}
	});
	return this;
}

function execFile(filename, callback) {
	var fileStream = fs.createReadStream(filename); // file stream to read created

	const rl = readLine.createInterface({
		input: fileStream,
		output: process.stdout,
		terminal: false
	});

	rl.on('line', function(line) { // reading the file line by line
		var query = line.replace(/{{[ ]{0,2}([a-zA-Z0-9\.\_\-]*)[ ]{0,2}}}/g, function(str, mch){ return data[mch]});
		exec(query, callback);	
	})
	.on('close' function(line) { // triggered on the end of the file
		// stop reading
		conn.end();
		callback(null, null);
	});
	return this;
}

exports.exec = exec;
exports.execFile = execFile;
exports.config = function (options) {
	_.extend(config, _.pick(options, ['host', 'port', 'user', 'password']));
	conn = mysql.createConnection(config);
	conn.connect();
	return this;
};
