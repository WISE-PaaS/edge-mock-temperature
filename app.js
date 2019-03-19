const mqtt = require('mqtt')

// -- Get env variables for rabbitmq service
const vcapServices = JSON.parse(process.env.VCAP_SERVICES);
const mqttUri = vcapServices['p-rabbitmq'][0].credentials.protocols.mqtt.uri
// externalHost: wise-msghub.eastasia.cloudapp.azure.com
// const mqttUri = 'mqtt://eb869bc9-31f7-46dd-928b-4c6e08a65302%3Aad063d1e-2ae5-4566-94c3-1a513b19ed73:s6jX0eEiuvpclN3C5EWv9qIhG@wise-msghub.eastasia.cloudapp.azure.com:1883';
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

  client.publish('building_hq/b100/temperature', temp.toString(), { qos: 2 }, (err, packet) => {
    if (!err) console.log('Data sent to building_hq/b100/temperature -- ' + temp);
  });
}
