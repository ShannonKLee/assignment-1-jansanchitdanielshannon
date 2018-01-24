#!/usr/bin/env node
const request = require('request');
const xml2js = require('xml2js');

let apikey = '';
let username = '';
let password = '';
let cmd_args = process.argv.slice(2);

while (cmd_args.length > 0) {
  cur_arg = cmd_args.shift();

  switch (cur_arg) {
    case '--apikey':
      apikey = cmd_args.shift();
      break;
    case '--username':
      username = cmd_args.shift();
      break;
    case '--password':
      password = cmd_args.shift();
      break;
  }
}

if (!(apikey && username && password)) {
  console.error('Missing apikey, username, or password');
  process.exit(1);
}

function getCollection(userkey, callback) {
  request.post({
    url: 'https://pastebin.com/api/api_post.php',
    form: {
      api_dev_key: apikey,
      api_user_key: userkey,
      api_option: 'list'
    }
  }, function (error, response, body) {
    if (error) {
      console.error('Unknown error');
      return;
    }

    xml2js.parseString(body, function (error, result) {
      if (error) {
        console.error('Cannot parse output as XML');
        return;
      } else if (!(typeof result === 'object' &&
                   typeof result.paste === 'object')) {
        console.error('User has no pastes');
        return;
      }

      callback(Array.isArray(result.paste) ? result.paste : [result.paste]);
    });
  });
}

function getSortedCollection(userkey, callback) {
  // implement
  getCollection(userkey, callback);
}

request.post({
  url: 'https://pastebin.com/api/api_login.php',
  form: {
    api_dev_key: apikey,
    api_user_name: username,
    api_user_password: password
  }
}, function (error, response, body) {
  if (error) {
    console.error('Invalid apikey, username, or password');
    return;
  }

  const userkey = body;

  // use the following to test your functions
  getCollection(userkey, function(array){
    console.log("Total items in collection ",array.length)
      console.log("First item in collection ",array[0])
  })

  getSortedCollection(userkey, function(array) {
    console.log("Collection sorted ",array)
  })
});
