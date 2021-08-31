const express = require('express')
const bodyParser = require('body-parser')

class CloudBaseRunServer {
    constructor() {
        this.server = express()
        this.server.use(bodyParser.urlencoded({ extended: false }))
        this.server.use(bodyParser.json())
    }
    setRoute(path, handlerFunction) {
        const handler = async (req, res) => {
            const event = req.body
            const result = await handlerFunction(event, {})
            res.send(result)
        }
        this.server.post(path, handler)
    }
    listen(port, ...args) {
        this.server.listen(port, ...args)
    }
}

module.exports.CloudBaseRunServer = CloudBaseRunServer
