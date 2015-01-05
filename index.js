// options to set
var options = {
  account_sid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  auth_token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  send: 'hourly', // daily, hourly, half-hour
  toPhone: 'XXXXXXXXXXX',
  fromPhone: 'XXXXXXXXXXX'
};

var tessel = require('tessel'),
  climatelib = require('climate-si7020'),
  climate = climatelib.use(tessel.port['D']),
  accountSid = options.account_sid,
  authToken = options.auth_token,
  client = require('twilio')(accountSid, authToken);

function sendText(temp, humid){
  var tempurature = temp;
  var humidity = humid;
  client.messages.create({
      body: 'The current tempurature is ' + tempurature + 'F and humidity is ' + humidity + '%RH',
      to: '+' + options.toPhone,
      from: '+' + options.fromPhone
  }, function(err, message) {
      process.stdout.write(message.sid);
  });
}

climate.on('ready', function () {
  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        var temperature = temp.toFixed(0),
          humidity = humid.toFixed(0);
        console.log('Degrees:', temperature + 'F', 'Humidity:', humidity + '%RH');
        // send text with temperature
        sendText(temperature, humidity);
        if(options.send === 'daily'){
          setTimeout(loop, 86400000);// set timeout daily
        }else if(options.send === 'hourly'){
          setTimeout(loop, 3600000);// set timeout ever 30 minutes
        }else if(options.send === 'half-hour'){
          setTimeout(loop, 1800000);// set timeout ever 30 minutes
        }
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});