const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Todo'


    async function connectDB(){
await MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})
    }
   
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



// app.get('/', async (req, res) => {
//     await db.collection('bills').find().toArray()
//     .then( data => {
//         res.render('index.ejs', { info: data})
//     })
//     .catch( error => console.error(error))
// })

// app.get('/',async (req, res)=>{
//     const billItems = await db.collection('todos').find().toArray()
    
//    return res.render('index.ejs', { items: billItems})
// })

app.get('/',async (request, response)=>{
    const todoItems = await db.collection('Todos').find().toArray()
    response.render('index.ejs', { items: todoItems})
})


app.post('/addBill', (req, res) => {
    db.collection('Todos').insertOne({ billName: req.body.billName, billAmount: req.body.billAmount})
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
connectDB()