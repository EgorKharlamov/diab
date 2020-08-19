const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const startServer = async(p)=>{
  app.listen(p);
}

const port = 9000
startServer(port).then(()=>console.log(`front server started at port ${port}`))