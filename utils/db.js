import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.SB_PORT || 27017;
const database = process.env.DB_DATABASE || 'file_manager';

class DBClient {
  constructor() {
    this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
      }).catch((error) => console.log(error));
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const collection = this.db.collection('users');
    const countUsers = await collection.countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const collection = this.db.collection('files');
    const countFiles = await collection.countDocuments();
    return countFiles;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
