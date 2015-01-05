Tessel text temperature
================

Uses Tessel + Twilio to send a text notification when the temperature reaches a certain temperature.

## Software setup

1. Set up your Twilio account ([it's free!](https://www.twilio.com/try-twilio))
1. [Install your Tessel](start.tessel.io)

## Run instructions

1. Clone this repo
1. Set up your config.json file based on the example-config.json file
1. Run `npm install` to install Node dependencies
1. In `index.js`, set your options. (Twilio account info, phone number, send messages time frame)
1. [Connect Tessel to the internet](http://start.tessel.io/wifi)
1. Run the code on Tessel: `tessel run index.js`
1. If you want to run the code disconnected from your computer, run `tessel push index.js` to push the code into Tessel's memory, then use an [alternate power source](https://tessel.io/docs/untethered). Just remember to make sure Tessel's connected to the internet, or it won't be able to send the text.

## License

MIT © [Ryan Burgess](http://ryanburgess.com)

## Release History
* 1.1.0: Update documentation.
* 1.0.0: Initial release.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request