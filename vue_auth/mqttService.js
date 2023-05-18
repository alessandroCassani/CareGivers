const mosca = require('mosca')
var settings = { port: 1234}
var broker =  new mosca.Server(settings)

broker.on('ready', ()=>{
  console.log('broker is running')
})

