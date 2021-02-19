const mqtt = require('mqtt')

/** 
 * -- Gets credentials from env variables
 */
// const esServices = JSON.parse(process.env.ENSAAS_SERVICES);
// const mqttUri = esServices['p-rabbitmq'][0].credentials.protocols.mqtt.uri

/** 
 * Use credentials directly from local device
 * Ispect the credentials inside the secret and fill out the following variables.
 */
// ---mqtt---
const username = '';
const password = '';
const externalHosts = '';


const mqttUri = `mqtt://${username}:${password}@${externalHosts}:1883`;

/** 
 * Connects to the IoTHub service using MQTT URI
 */
const client = mqtt.connect(mqttUri);
client.on('connect', (connack) => {
  setInterval(() => {
    publishMockTemp();
  }, 3000);
});

/** 
 * Publish mock random temperature periodically 
 */
function publishMockTemp() {
  const temp = Math.floor((Math.random() * 8) + 22);
// Please fill in your own number, user can check it in in your mqtt pod, use $kubectl logs -f pod_name
  client.publish('livingroom/temperature/{own number}', temp.toString(), { qos: 0 }, (err, packet) => {
    if (!err) console.log('Data sent to livingroom/temperature -- ' + temp);
  });
}
