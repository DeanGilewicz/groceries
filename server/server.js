const Item 			 = require('./models/item').Item;
const express 		 = require('express');
const ObjectID 		 = require('mongodb').ObjectID;
const bodyParser 	 = require('body-parser');
const methodOverride = require('method-override');

var app = express();



////////////////
//	APP CONFIG
////////////////


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));
app.use(methodOverride('_method'));



////////////////
//	ROUTES
///////////////


// initial
app.get('/', function(req, res) {
	res.redirect('/items');
});


// INDEX
app.get('/items', (req, res) => {
	Item.find().then((items) => {
		// res.send({items});
		res.render('index', {items: items});
	}, (e) => {
		res.send(400).send(e);
	});
});


// NEW - show form to create items - /items/new
app.get('/items/new', function(req, res) {
	res.render('items/new');
});


// CREATE
app.post('/items', function(req, res) {
	// var item = new Item({
	// 	name: 'milk',
	// 	type: 'carton',
	// 	threshold: 1,
	// 	quantity: 2,
	// 	replenish: false,
	// 	completedAt: 123
	// });

	Item.create(req.body.item, function(err, item) {
		if(err) {
			return res.status(400).send(err);
			// res.render('items/new');
		}
		res.redirect('/items');
	});

});


// SHOW
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


// EDIT - show edit form for one item - /items/:id/edit
app.get('/items/:id/edit', function(req, res) {
	Item.findById(req.params.id, function(err, item) {
		if(err) {
			return res.status(400).send(err);
			// res.redirect('/items');
		}
		res.render('items/edit', { item: item });
	});
});


// UPDATE
app.put('/items/:id', function(req, res) {
	// console.log(req.body);
	// var itemName = req.body.name;
	// var itemType = req.body.type;
	// var itemThreshold = req.body.threshold;
	// var itemData = { name: itemName, type: itemType, threshold: itemThreshold };
	
	// 'under the hood' way to get at the body data without using node module
	// var body = [];
	// 	req.on('data', function(chunk) {
	// 	body.push(chunk);
	// }).on('end', function() {
	// 	body = Buffer.concat(body).toString();
	// 	console.log('data here', body);
	// });

	// Item.findByIdAndUpdate(req.params.id, itemData, {new:true},function(err, item) {
		
	Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, item) {
		if(err) {
			return res.status(404).send(err);
		}
		// res.status(200).send(item);
		res.redirect('/items');
	});

});


// DESTROY
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