const express = require('express')
require('dotenv').config()
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
PORT = process.env.PORT
const mongoose = require('mongoose');


// db cunnect
const dbCunnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://sudipta:Avl2a0mEfMkCu0Cy@cluster0.gtvd9qi.mongodb.net/data?retryWrites=true&w=majority`);
        console.log('Db cunnect sucessfully')
    } catch (error) {
        console.log(error)
    }
}

const nameSchema = new mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const nameModel = mongoose.model('names', nameSchema)



app.post('https://newsarver.onrender.com/name', async (req, res) => {
    try {
        const name = req.body;
        const modelSave = nameModel({
            name: name.name
        })
        await modelSave.save()
        res.send(name.name)
    } catch (error) {
        console.log(error.message)
    }
})

app.get('https://newsarver.onrender.com/data', async (req, res) => {
    try {
        const user = await nameModel.find({})
        if (user) {
            res.send(user);
        }
    } catch (error) {

    }
})




app.get('https://newsarver.onrender.com/all', (req, res) => {
    res.send('Amar sonr bangla ami tomai valobasi')
})



app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, async () => {
    await dbCunnect()
    console.log(`https://localhost${PORT}`)
})