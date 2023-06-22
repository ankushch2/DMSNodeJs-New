const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
const PORT= 9001;
require("./src/route/dms.route")(app);
require("./src/route/auth.route")(app);

const connectDB= require('./src/config/db.config');

connectDB().then(()=>
  console.log("Sucessfully connected DB")).
  catch(err=>
    console.log('failed to connect DB '+err));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})