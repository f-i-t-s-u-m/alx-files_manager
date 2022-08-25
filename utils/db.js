import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.SB_PORT || 27017;
const database = process.env.DB_DATABASE || 'file_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(database);
    }).catch((error) => console.log(error));
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    console.log(users);
    const countUsers = await users.countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const countFiles = await files.countDocuments();
    return countFiles;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
