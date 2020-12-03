const fortuneCookie = require ('fortune-cookie')
const morgan = require ('morgan')
const express = require('express')

const cors = require('cors')

const cookies = () => {
    const idx = Math.floor( Math.random() * fortuneCookie.length)
    return fortuneCookie[idx]
}

// configuration
const PORT = parseInt (process.argv[2]) || parseInt(process.env.PORT)  || 3000

// create an instance of express
const app = express()

// use morgan to log all request. use the combined format
app.use(morgan('combined'))


// resources
// GET api/cookie 

app.get('/api/cookie', cors(), async (req, resp) => {
    
    const count = parseInt(req.query['count']) || 1

		resp.status(200)
		resp.type('application/json')

    if (count == 1){
        resp.json({cookie: cookies()})
    }
    else {
        var displayArray = []
        for (var i = 0; i < count; i++){
            displayArray.push({cookie: cookies()})
        }
    
            resp.json(displayArray)
    }

// serve frontend
app.use(express.static ( __dirname + '/projectdayfront'))


})


// start server
app.listen(PORT, () => {
    console.info (`Application started on ${PORT} at ${new Date()}`)
})