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
  client = require('twilio')(accountSid, authToken),
  loopTime = 86400000;

if(options.send === 'daily'){
  loopTime = 86400000;// set timeout daily
}else if(options.send === 'hourly'){
  loopTime = 3600000;// set timeout ever 30 minutes
}else if(options.send === 'half-hour'){
  loopTime = 1800000;// set timeout ever 30 minutes
}else if(options.send === 'test'){
  loopTime = 180000;// set timeout ever 30 minutes
}

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
        setTimeout(loop, loopTime);
        // send text with temperature
        sendText(temperature, humidity);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});