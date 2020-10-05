execsql
=======

An npm project. Node.js
Execute your *.sql files which contain multiple sql statements.

### SQL File Format

Make sure each `query` is in a single line.
	```sql
	SELECT * FROM table_name;
	SELECT * FROM table_name;	
	```


## Usage

### As a CLI tool

1. Make sure you have `execsql` installed globally
	```sh
	npm install -g execsql
	```

2. Configure your db access for the first time. Usage: `execsql -c host [port] user password`.
	```sh
	# default port is 3306
	execsql -c "localhost" "root" "root"
	# when using a custom port like 4242
	execsql -c "localhost" 4242 "root" "root"
	```

- Execute a bunch of sql statements
	```sh
	execsql "use db_cam; delete from admin;"
	```

- Execute a `.sql` file
	```sh
	execsql -f ./db.sql
	```

### As a Node dependency

1. Make sure you have `execsql` installed locally
	```sh
	npm install execsql
	```

2. Require and use
	```js
	var execsql = require('execsql'),
		dbConfig = {
			host: 'localhost',
			port: 3306, // optional, default is 3306
			user: 'root',
			password: 'root'
		},
		sql = 'use db_cam;',
		sqlFile = __dirname + '/db.sql';

	execsql.config(dbConfig)
		.exec(sql)
		.execFile(sqlFile, function (err, results) {
			if (err) throw err;
			console.log(results);
			if(err === null && results === null) {
				// comepleted
				console.log('Execution Completed');
			}
		});		
	```
