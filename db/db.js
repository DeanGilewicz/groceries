var MongoClient = require('mongodb').MongoClient;
 
// Connection URL
var url = 'mongodb://localhost:27017/groceries';

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
	
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}

	console.log('Connected to MongoDB server');

	// example add one item
	db.collection('Items').insertOne({
		name: 'eggs',
		type: 'carton',
		quantity: 12,
		remaining: 6,
		threshold: 5,
		replenish: false

	}, (err, result) => {
		if(err) {
			return console.log('Unable to insert todo', err);
		}

		console.log(JSON.stringify(result.ops, undefined, 2));
	});

	db.close();

});