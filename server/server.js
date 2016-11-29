const Item = require('./models/item').Item;
const express = require('express');
const ObjectID = require('mongodb').ObjectID;

var app = express();


app.get('/', function(req, res) {
	res.send('hello world');
});

app.post('/items', function(req, res) {
	var item = new Item({
		name: 'milk',
		type: 'carton',
		threshold: 1,
		quantity: 2,
		replenish: false,
		completedAt: 123
	});

	item.save().then(function(item) {
		res.send(item);
	}, function(err) {
		res.status(400).send(err);
	});
});

app.get('/items', (req, res) => {
	Item.find().then((items) => {
		res.send({items});
	}, (e) => {
		res.send(400).send(e);
	});
});

app.get('/items/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Item.findOne({
		_id: id
	}).then((item) => {
		if (!item) {
			return res.status(404).send();
		}
		res.status(200).send({item});
	}).catch((e) => res.status(400).send());
});

app.delete('/items/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)) {
		return res.status(400).send();
	}

	Item.findOneAndRemove({
		_id: id,
	}).then((item) => {
		if (!item) {
			return res.status(404).send();
		}
		res.status(200).send({item});
	}).catch((e) => res.status(400).send());

});

app.listen(3000, function() {
	console.log('express server listening on port 3000');
});