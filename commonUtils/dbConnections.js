const { MongoClient } = require('mongodb');
// const logger = require('../logger/logger.service');
module.exports = {
    websightsConnection: () => {
        const client = new MongoClient('mongodb+srv://team7:team7@ziaatral.prhqvsk.mongodb.net/');
        return client.connect()
          .then(() => {
              console.log('WebSights Mongo Successfully Connected');
              return client.db('demo')
          })
          .catch((err) => console.log('Mongo Connection Error', err));
    },
    CPConnection: () => {
        const client = new MongoClient('mongodb+srv://team7:<password>@ziaatral.prhqvsk.mongodb.net/');
        return client.connect()
          .then(() => {
            console.log('Combined Platform Mongo Successfully Connected');
              return client.db('combined-platform')
          })
          .catch((err) => console.log('Mongo Connection Error', err));
    }
};