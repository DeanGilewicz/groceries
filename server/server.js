const Item 			= require('./models/item').Item;
const express 		= require('express');
const ObjectID 		= require('mongodb').ObjectID;
const bodyParser 	= require('body-parser');

var app = express();

// APP CONFIG
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
	res.redirect('/items');
});

app.get('/items', (req, res) => {
	Item.find().then((items) => {
		// res.send({items});
		res.render('index', {items: items});
	}, (e) => {
		res.send(400).send(e);
	});
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

app.put('/items/:id', function(req, res) {
	// console.log(req.body);
	var itemName = req.body.name;
	var itemType = req.body.type;
	var itemThreshold = req.body.threshold;
	var itemData = { name: itemName, type: itemType, threshold: itemThreshold };
	
	// 'under the hood' way to get at the body data without using node module
	// var body = [];
	// 	req.on('data', function(chunk) {
	// 	body.push(chunk);
	// }).on('end', function() {
	// 	body = Buffer.concat(body).toString();
	// 	console.log('data here', body);
	// });

	Item.findByIdAndUpdate(req.params.id, itemData, {new:true},function(err, item) {
		// console.log(item);
		if(err) {
			return res.status(404).send();
		}
		res.status(200).send(item);
	});

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