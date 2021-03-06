
//setting up my npms, for logging and express
const express = require('express');
const morgan = require('morgan');

const app = express();

//connecting my module
const blogPostRouter = require('./blogPostRouter');


// Setting up my logging, module, and (i dont know why i need the third)
app.use(morgan('common'));

app.use(express.static('public'));

app.use('/blog-posts', blogPostRouter);

// starting/ closing my servers

let server;


function runServer(){
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject)=>{
    server = app.listen(port, function(){
      console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
      resolve(server);
    })
    .on('error',function(){
      reject(err);
    });
  })

};


function closeServer(){
  return new Promise((resolve, reject)=>{
    console.log('closing server')
    server.close(err =>{
      if (err){
        reject(err);
        return;
      }
      resolve();
    });
  });
};



// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });

module.export = {app,runServer, closeServer};
