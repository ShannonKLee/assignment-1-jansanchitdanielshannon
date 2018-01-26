#!/usr/bin/env node
const request = require('request');
const xml2js = require('xml2js');

let user_args = {'sort': 'paste_date'};
let cmd_args = process.argv.slice(2);

while (cmd_args.length > 0) {
  cur_arg = cmd_args.shift();

  switch (cur_arg) {
    case '--apikey':
    case '--username':
    case '--password':
    case '--sort':
      user_args[cur_arg.substring(2)] = cmd_args.shift();
      break;
  }
}

if (!(user_args.apikey && user_args.username && user_args.password)) {
  console.error('Missing apikey, username, or password');
  process.exit(1);
}

function getCollection(userkey, callback) {
  request.post({
    url: 'https://pastebin.com/api/api_post.php',
    form: {
      api_dev_key: user_args.apikey,
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
  getCollection(userkey, function (array) {
    if (!Array.isArray(array)) {
      return;
    }

    array.sort(function (a, b) {
      if (!(a && a[user_args.sort] &&
            b && b[user_args.sort])) {
        return 0;
      }

      return a[user_args.sort] > b[user_args.sort] ? 1 :
              a[user_args.sort] < b[user_args.sort] ? -1 : 0;
    });
    callback(array);
  });
}

request.post({
  url: 'https://pastebin.com/api/api_login.php',
  form: {
    api_dev_key: user_args.apikey,
    api_user_name: user_args.username,
    api_user_password: user_args.password
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
