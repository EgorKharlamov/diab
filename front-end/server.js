// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');
const app = express();

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const startServer = async(p)=>{
  app.listen(p);
};

const port = 9000;
startServer(port).then(()=>console.log(`front server started: http://localhost:${port}`));
