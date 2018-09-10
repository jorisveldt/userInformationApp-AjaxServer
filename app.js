const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fs = require('fs');
let users = "../users.json";

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

//renders a page that displays all your users
app.get("/users", function(req, res) {
	fs.readFile('users.json', function(err, data) {
        if (err) {
        	throw (err);
    	}

  	users = JSON.parse(data);
  	
  });
  res.render("users", {users: users});
});

//point to the index.ejs as homepage
app.get('/', (req,res) => {
  res.render('index')
})


//point to the page with a search bar
app.get('/search', (req,res) => {
	res.render('search')
})

//shows the results from search page on results page
app.post('/search', function(req,res){
  fs.readFile('users.json', function(err,data){
    if(err){
      throw err;
    }
    let users = JSON.parse(data);
    console.log(req.body);
    let name = req.body;
    res.render('results',{users: users, name: name})
  });
});

//point to the page with the form for new users
app.get('/form', (req,res) => {
  res.render('form')
})

//adds data to the JSON file when people fill in the form
app.post('/form', (req,res) => {
	fs.readFile('users.json', (err,data) => {
		if(err){
			throw err;
		}
    let users = JSON.parse(data);
    newUser = req.body;
		users.push(newUser);

		fs.writeFile('users.json', JSON.stringify(users), function(err,data) {
      if(err){
        throw err;
      }
    })
	})
  res.redirect('/users')
})

//Port to print stuff
app.listen(3003, () => {
	console.log("App is running on port 3003")
})