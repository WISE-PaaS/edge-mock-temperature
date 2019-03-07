const mqtt = require('mqtt')

// -- Get env variables for rabbitmq service
// const vcapServices = JSON.parse(process.env.VCAP_SERVICES);
// const mqttUri = vcapServices['p-rabbitmq'][0].credentials.protocols.mqtt.uri
const mqttUri = 'mqtt://eb869bc9-31f7-46dd-928b-4c6e08a65302%3A34341485-7f96-4eca-a93b-397a6ec23fbe:AxFiXoqYCZwJqRooDYFUWrK2D@wise-msghub.eastasia.cloudapp.azure.com:1883'

// const connectOpts = {
//   host: ,
//   port: 1883,
//   username: ,
//   password: 
// };

// Use mqttUri or connectOpts
const client = mqtt.connect(mqttUri);

client.on('connect', (connack) => {
  setInterval(() => {
    publishMockTemp();
  }, 3000);
});

// Publish mock random temperature periodically
function publishMockTemp() {
  const temp = Math.floor((Math.random() * 7) + 22);

  client.publish('livingroom/temperature', temp.toString(), { qos: 2 }, (err, packet) => {
    if (!err) console.log('Data sent to livingroom/temperature -- ' + temp);
  });
}
