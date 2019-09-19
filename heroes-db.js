const app = require('express')()
const bodyParser = require('body-parser')

app.use( bodyParser.json() )
app.use( require('./routes.js') )


app.listen(3001, () => {
    console.log('Escuchando por el puerto 3001')
})
