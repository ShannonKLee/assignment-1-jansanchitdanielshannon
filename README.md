# Assignment #1

## Team Members
- Jan Edmund Lazo
- Shannon Lee (100303637)
- Sanchit Luthra
- Sahil Gadhok

## Project Proposal

[Pastebin API](https://pastebin.com/api)

There are many available file sharing websites, including Google Drive, OneDrive, Airdrop, and Dropbox. However, we believe that these sites would benefit from including a social component, which is what our application aims to do. We will use the Pastebin API to aggregate the pastes, and our application will allow users to create groups, share pastes among group members, and comment on uploaded pastes. Comments will be associated to their corresponding paste only. This means that when a user deletes a paste, the comments will be deleted as well. If the user wants the comments to persist, they must change the expiration date of the paste in question. Users can also expect to be able to create new pastes within the application and add them to their group. 

The Pastebin API provides detailed documentation on its various functionalities, such as how to create and retrieve pastes, all of which require the POST method. No other HTTP methods are supported. The output is in an XML format, but we will be using a third party library, xml2json, to convert it to a JSON object. 

[Limitations?]

## Usage

```sh
node main.js --apikey <apikey> --username <username> --password <password> --sort <property>
```

## API

Implement the following two functions:

- getCollection: it should accept a callback, send a request to retrieve the full collection from your chosen API, wait until a response is received and callback with an array of objects, where each object is an item from the collection.  You are free to decide how many items are returned.

- getSortedCollection: it should accept a callback, retrieve the full collection, sort the collection using the criteria you think makes the most sense for its items and callback with a sorted array of objects.
