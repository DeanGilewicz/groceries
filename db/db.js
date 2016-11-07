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
	// db.collection('Items').insertOne({
	// 	name: 'eggs',
	// 	type: 'carton',
	// 	quantity: 12,
	// 	remaining: 6,
	// 	threshold: 5,
	// 	replenish: false

	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to insert item', err);
	// 	}

	// 	console.log('Success insertOne response', JSON.stringify(result.ops, undefined, 2));
	// });

	// example delete one item
	// db.collection('Items').deleteOne({
	// 	name: 'eggs'
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to delete item', err);
	// 	}

	// 	console.log('Success deleteOne response', result.result);
	// });

	// example update an item
   
	// db.collection('Items').updateOne({
	// 	name : 'eggs'
	// }, {
	// 	$set: { 'type' : 'carton' }
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to update item', err);
	// 	}

	// 	console.log('Success updateOne response', result.result);
	// });

	// example get one item

	// db.collection('Items').findOne({name: 'eggs'}, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to get item(s)', err);
	// 	}

	// 	console.log('Success find response', result);
	// });

	// example get all items
	db.collection('Items').find().toArray((err, result) => {
		if(err) {
			return console.log('Unable to get item(s)', err);
		}

		console.log('Success find response', result);
	});


	db.close();


});