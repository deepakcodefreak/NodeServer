const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();
app.set('view engine','hbs')


hbs.registerHelper('currentYear',()=> {
  return new Date().getFullYear();
})


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n' , (error) => {
    console.log(`Error: ${error}`);
  })
next();
})

// app.use((req,res,next) => {
// res.render('maintenance.hbs',{
//   pageTitle:'maintenance Page',
//   welcomeMesage:'Welcome to maintenance page of our webSite',
//
//   })
//
// })

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    welcomeMesage:'Welcome to our official website',
    pageTitle:'HomePage',
  })
})

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    })
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:'Unable to connect...'
  })
})

app.use(express.static(__dirname + '/public'))

app.listen(port,()=>{
  console.log(`Website is live on port ${port}`);
});
