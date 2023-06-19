const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
require('dotenv').config()
const uri = process.env.DB_STRING
const client = new MongoClient(uri, { useUnifiedTopology: true });

app.get("/", async (req, res) => {
    let my_item = req.params.my_item;
    let item = await client.db("Todo")
                .collection("Todos")
                .find().toArray()
                .then( data => {
                 return res.render('index.ejs', { info: data})
                })
.catch( error => console.error(error))
})

// make a function that awaits mongo connection before allowing requests
async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
}
}
connectToMongo().catch(console.error);


console.log("here first")



// client.connect(err => {
//     if(err){ console.error(err); return false;}
//     // connection to mongo is successful, listen for requests
//     app.listen(PORT, () => {
//         console.log("listening for requests");
//     })
// });
// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
// .then(client => {
//     console.log(`Connected to ${dbName} Database`)
//     db = client.db(dbName)
// })
console.log("here third")

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())







app.post('/addBill', (req, res) => {
    db.collection('bills').insertOne({ billName: req.body.billName, billAmount: req.body.billAmount})
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
})


app.delete('/deleteBill', (req, res) => {
    db.collection('bills').deleteOne( { billName: req.body.billNameS})
    .then(result => {
        console.log('Bill Deleted')
        res.json('Bill Deleted')
    })
    .catch(error => console.error(error))

})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
