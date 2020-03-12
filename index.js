const mqtt = require('mqtt')

/** 
 * -- Gets credentials from env variables
 */
// const esServices = JSON.parse(process.env.ENSAAS_SERVICES);
// const mqttUri = esServices['p-rabbitmq'][0].credentials.protocols.mqtt.uri

/** 
 * Use credentials directly from local device
 */
// externalHosts: rabbitmq-001-pub.sa.wise-paas.com
const mqttUri = 'mqtt://eb869bc9-31f7-46dd-928b-4c6e08a65302%3Aad063d1e-2ae5-4566-94c3-1a513b19ed73:s6jX0eEiuvpclN3C5EWv9qIhG@wise-msghub.eastasia.cloudapp.azure.com:1883';

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

  client.publish('livingroom/temperature', temp.toString(), { qos: 0 }, (err, packet) => {
    if (!err) console.log('Data sent to livingroom/temperature -- ' + temp);
  });
}
