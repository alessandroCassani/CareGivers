const mosca = require('mosca')
var settings = { port: 1833}
var broker =  new mosca.Server(settings)

broker.on('ready', ()=>{
  console.log('broker is running')
})


broker.on('published', (packet)=>{
  message = packet.payload.toString();
  console.log(message)

})

broker.on('connection', (stream) => {
  console.log('someone connected!');
});

broker.on('start', function(){
  console.log("start");
  });

