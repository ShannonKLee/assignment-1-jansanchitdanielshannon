# Assignment #1

## Team Members
- Jan Edmund Lazo
- Shannon Lee
- Sanchit Luthra

## Project Proposal

File Hosting Website.
Use [Pastebin API](https://pastebin.com/api) for file storage.

## Usage

```sh
node main.js --apikey <apikey> --username <username> --password <password> --sort <property>
```

## API

Implement the following two functions:

- getCollection: it should accept a callback, send a request to retrieve the full collection from your chosen API, wait until a response is received and callback with an array of objects, where each object is an item from the collection.  You are free to decide how many items are returned.

- getSortedCollection: it should accept a callback, retrieve the full collection, sort the collection using the criteria you think makes the most sense for its items and callback with a sorted array of objects.
