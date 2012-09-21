module.exports = function(app)
{
	fs = require('fs');

	nconf = require('nconf'),
	Recaptcha = require('recaptcha').Recaptcha;

	// home page
	app.get('/', function(req, res)
	{
		res.render('index', { title: 'Home Page.  ' })
	});

	// chat area
	app.get('/chat', function(req, res)
	{
		res.render('chat', { title: 'Chat with Me!  ' })
	});

	// about page
	app.get('/about', function(req, res)
	{
		res.render('about', { title: 'About Me.  ' })
	});
	// about page
	app.get('/demo', function(req, res)
	{
		res.render('demo', { title: 'Demo page.  ' })
	});
	// task page
	app.get('/task', function(req, res)
	{
		res.render('task', { title: 'task page.  ' })
	});
	var dataOld = {
		"glossary": {
			"title": "example glossary",
			"GlossDiv": {
				"title": "S",
				"GlossList": {
					"GlossEntry": {
						"ID": "SGML",
						"SortAs": "SGML",
						"GlossTerm": "Standard Generalized Markup Language",
						"Acronym": "SGML",
						"Abbrev": "ISO 8879:1986",
						"GlossDef": {
							"para": "A meta-markup language, used to create markup languages such as DocBook.",
							"GlossSeeAlso": ["GML", "XML"]
						},
						"GlossSee": "markup"
					}
				}
			}
		}
	}
	var data = {"task0":{"title":"empty task from model","duration":0,"cost":0,"eta":"1/1/12","link":"http://google.com","done":false},"task1":{"title":"empty task1","duration":0,"cost":0,"eta":"1/1/12","link":"http://google.com","done":false},"task2":{"title":"empty task2","duration":0,"cost":0,"eta":"1/1/12","link":"http://google.com","done":false},"task3":{"title":"empty task3","duration":0,"cost":0,"eta":"1/1/12","link":"http://google.com","done":false},"task4":{"title":"empty task4","duration":0,"cost":0,"eta":"1/1/12","link":"http://google.com","done":false}};
	var dataSep = {
		"task0": {
			"title": "empty task from model",
			"id" : 0,
			"duration": 0,
			"cost": 0,
			"eta": "1/1/12",
			"link": "http://google.com",
			"done": false
		},
		"task1": {
			"title": "empty task1",
			"id" : 1,
			"duration": 0,
			"cost": 0,
			"eta": "1/1/12",
			"link": "http://google.com",
			"done": false
		},
		"task2": {
			"title": "empty task2",
			"id" : 2,
			"duration": 0,
			"cost": 0,
			"eta": "1/1/12",
			"link": "http://google.com",
			"done": false
		},
		"task3": {
			"title": "empty task3",
			"id" : 3,
			"duration": 0,
			"cost": 0,
			"eta": "1/1/12",
			"link": "http://google.com",
			"done": false
		},
		"task4": {
			"title": "empty task4",
			"id" : 4,
			"duration": 0,
			"cost": 0,
			"eta": "1/1/12",
			"link": "http://google.com",
			"done": false
		}
	}
	
	//this.in_memory_data = dataSep;
	console.log('get tl: ', app.in_memory_data);
	if(!app.in_memory_data){
		app.in_memory_data = {};
	}
	function updateList(in_memory_data, newData){
		for (var i in newData) {
			in_memory_data[i] = newData[i];
		};
		return in_memory_data;
	}

	app.get('/task_source', function(req, res)
	{
		res.writeHead(200, { 'Content-Type': 'application/json' });
		console.log(app.in_memory_data);
		res.write(JSON.stringify(app.in_memory_data));
		res.end();
	});
	app.post('/task_source', function(req, res)
	{
		res.writeHead(200, { 'Content-Type': 'application/json' });
		if(req.body) res.write(JSON.stringify(updateList(app.in_memory_data, req.body))); 
		else res.write('no data');
		res.end();
	});
	app.put('/task_source/123', function(req, res)
	{
		res.writeHead(200, { 'Content-Type': 'application/json' });
		//if(req.body) data = req.body;
		res.write(JSON.stringify(dataSep));
		res.end();
	});
}
