const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://dineshnikkala:dinesh@cluster0.2nnroxy.mongodb.net/?retryWrites=true&w=majority";

function connectToDb(uri) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, function (err, client) {
            if (err) {
                console.log("Error while connecting to mongodb");
                console.log(err);
                reject(err);
            } else {
                console.log("Successfully connected to db");
                resolve(client.db("dinesh"));
            }
        });
    });
}

const insertAgents = (module.exports.insertAgents = (collectionName, records) => {
    return new Promise((resolve, reject) => {
        connectToDb(uri)
            .then((db) => {
                db.collection(collectionName).insertMany(records, function (err, result) {
                    if (err) {
                        console.log("Error while inserting data.");
                        reject(err);
                    } else {
                        console.log("Successfully inserted!");
                        resolve(result);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    })
});


const fetchAgents = module.exports.fetchAgentsByCrieteria = (collectionName,criteria) => {
    return new Promise((resolve, reject) => {
        connectToDb(uri)
            .then((db) => {
                db.collection(collectionName).find(criteria).toArray(function (err, result) {
                    if (err) {
                        console.log("Error while inserting data.");
                        reject(err);
                    } else {
                        console.log("Successfully fetched!");
                        resolve(result);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    })
}

const updateAgentsByCriteria = module.exports.updateAgentsByCriteira = (collectionName, criteria, updateObj) => {
    return new Promise((resolve, reject) => {
        connectToDb(uri)
            .then((db) => {
                db.collection(collectionName).updateMany(criteria,{$set: updateObj}  , function (err, result) {
                    if (err) {
                        console.log("Error while updating data.");
                        reject(err);
                    } else {
                        console.log("Successfully updated documents!");
                        resolve(result);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    })
}

const deleteAgentByCriteria = module.exports.deleteAgentByCriteria = (collectionName, criteria) => {
    return new Promise((resolve, reject) => {
        connectToDb(uri)
            .then((db) => {
                db.collection(collectionName).deleteMany(criteria, function (err, result) {
                    if (err) {
                        console.log("Error while deleting data.");
                        reject(err);
                    } else {
                        console.log("Successfully updated documents!");
                        resolve(result);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    })
}
