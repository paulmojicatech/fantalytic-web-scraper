import { MongoClient } from 'mongodb';
import { MONGO_CONN, DB_NAME } from '../env';

export class MongoDbAdapter {

    private _client = new MongoClient(MONGO_CONN);
    private _db = DB_NAME;

    async getCollection(collectionName: string, options: any = {}): 
        Promise<any[]> {
        return new Promise<any[]>(async (resolve, reject) => {

            try {
                const client = await this.connect();
                const items = await client
                    .db(this._db)
                    .collection(collectionName)
                    .find(options)
                    .toArray();
                resolve(items);
            } catch (ex) {
                reject(ex);
            }

        });

    }

    async getlastDocumentInCollection(collectionName: string, 
        options: any = {}, 
        sort: any): Promise<any> {
        let lastItem = {};
        const mongoConn = await this.connect();
        await mongoConn
            .db(this._db)
            .collection(collectionName)
            .find(options)
            .sort(sort)
            .limit(1)
            .forEach(item => {
                lastItem = item;
            });
        return Promise.resolve(lastItem);
    }

    async getJoinedTables(localTable: string, foreignTable: string, localField: string, foreignField: string, alias: string): Promise<any[]> {
        let items: any[] = [];
        try {
            let client = await this.connect();
            const joinClause = {
                $lookup: {
                    from: foreignTable,
                    localField,
                    foreignField,
                    as: alias
                }
            };
            await client
                .db(this._db)
                .collection(localTable)
                .aggregate([joinClause])
                .each(item => {
                    items = [...items, item];
                });
            return Promise.resolve(items);
    
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async addToCollection(collectionName: string, document: any): Promise<boolean> {
        let status = false;
        return new Promise<boolean>(async (resolve, reject) => {
            const client = await this.connect();
            await client
                .db(this._db)
                .collection(collectionName)
                .insertOne(document);
            status = true;
            resolve(status);
        });
    }

    async updateCollection(collectionName: string, options: any, document: any): Promise<boolean> {
        try {
            const mongoClient = await this.connect();
            const updatedDoc = await mongoClient
                .db(this._db)
                .collection(collectionName)
                .findOneAndUpdate(options, {$set: document});
            return Promise.resolve(updatedDoc.value);
        } catch (err) {
            return Promise.reject();
        }
        
    }

    async deleteItemFromCollection(collectionName: string, deleteClause: any): Promise<void> {
        const client = await this.connect();
        await client
            .db(this._db)
            .collection(collectionName)
            .deleteOne(deleteClause);

        return Promise.resolve();
    }

    async disconnect(): Promise<void> {
        if (this._client?.isConnected()) {
            await this._client.close(true);
        }
    }

    private async connect(): Promise<MongoClient> {
        return new Promise<MongoClient>(async(resolve, reject) => {
            try {
                await this._client.connect(async(err, db) => {
                    if (err) {
                        reject(err);                        
                    }
                    else {
                        resolve(db.connect());
                    }
                });
            }   
            catch(err) {
                reject(err);
            }
        });
    }

    private buildUpdateQuery(fields: any[]): any {
        let updateStatement: any = {};
        
        fields.forEach(field => {
            const key = Object.keys(field)[0];
            updateStatement[key] = field[key];
        });
        return updateStatement;
    }
}
