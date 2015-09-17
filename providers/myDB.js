// Loading and initializing the library:
var options = {
    // pgFormatting - redirects query formatting to PG
    // promiseLib - overrides default promise library
    // connect - database 'connect' notification
    /*
    connect: function(client){
            var cp = client.connectionParameters
            console.log("Connected to database '" + cp.database + "'")
        },
    // disconnect - database 'disconnect' notification
    disconnect: function(client){
        var cp = client.connectionParameters
        console.log("Disconnecting from database '" + cp.database + "'")
    },
    // query - query execution notification
    query: function (e) {
        console.log("Query:", e.query)
        if (e.ctx) {
            // this query is executing inside a task or transaction,
            if (e.ctx.isTX) {
                console.log('// this query is inside a transaction')
            } else {
                console.log('// this query is inside a task')
            }

        }
    },
    // task - task notification
    task: function (e) {
        console.log("Start Time: " + e.ctx.start)
        if (e.ctx.finish) {
            // this is a task `finish` event
            console.log("Finish Time: " + e.ctx.finish)
            if (e.ctx.success) {
                // e.ctx.result = the data resolved
            } else {
                // e.ctx.result = the rejection reason
            }
        } else {
            // this is a task `start` event
        }
    },
    // transact - transaction notification
    transact: function (e) {
        console.log("Start Time: " + e.ctx.start)
        if (e.ctx.finish) {
            // this is a transaction `finish` event
            console.log("Finish Time: " + e.ctx.finish)
            if (e.ctx.success) {
                // e.ctx.result = the data resolved
            } else {
                // e.ctx.result = the rejection reason
            }
        } else {
            // this is a transaction `start` event
        }
    },
    // error - error notification
    error: function (err, e) {
        console.log("Error: " + err)
        e.myError = err
        if (e.cn) {
            console.log('// this is a connection-related error')
            console.log('// cn = connection details that were used.')
        }
        if (e.query) {
            console.log("Query:", e.query)
            if (e.params) {
                console.log("Parameters:", e.params)
            }
        }
        if (e.ctx) {
            console.log('// print transaction details')
        }
    }//*/
    // extend - protocol extension event
}
var pgp = require('pg-promise')(options)

exports.newConnection = function(){
    return pgp(global.conString)
}
