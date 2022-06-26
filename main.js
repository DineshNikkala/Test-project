"use strict";

// Required Modules
const express = require("express");
const app = express();
const fs = require("fs");
const async = require("async");
const csvToJson = require("csvtojson");

const utils = require("./utils.js");

// global variables
const port = 4444;

// CRUD OPERATION :
// Create
app.post("/insert-documents", (req, res) => {
    async.waterfall([
            function (callback) {
                let filePath = "./data-sheet.csv";
                if (!fs.existsSync(filePath)) {
                    console.log("Error file path does not exists");
                    callback(true, {
                        status: "Error",
                        message: "Error file path does not exists",
                    });
                } else {
                    csvToJson()
                        .fromFile(filePath)
                        .then((agents) => {
                            utils.insertAgents("agents", agents)
                                .then(res => {
                                    callback(null, {
                                        status: "Success",
                                        message: "Successfully inserted the records."
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    callback(true, {status: "Error", message: "Error while inserting data", error: err})
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            callback(true, {
                                status: "Error",
                                message: "Error while converting csv to json", error: err
                            })
                        });
                }
            },
        ],
        function (err, result) {
            res.send(result);
        }
    );
});

//Read
app.post('/fetch-documents', (req,res) => {
    let criteria = { "policy_type" : "Single", "policy_start_date" : {$gt: '2018-11-09'}}
    // criteria = {policy_mode:"12"}
    utils.fetchAgentsByCrieteria("agents", criteria)
        .then(response => {
           res.send({status: "Success", message: `Successfully fetched ${response.length} records`, data: response})
        })
        .catch(err => {
            console.log(err);
            res.send({status: "Error", message: "Error while fetching data", error: err})
        })
})

// Update
app.post('/update-documents', (req,res) => {
    let criteria = { "agent" : "Alex Watson", "policy_number" : '60G18LYQO157'}
    let updateObj = {policy_type: "Multiple"}
    utils.updateAgentsByCriteira("agents", criteria, updateObj)
        .then(response => {
            res.send({status: "Success", message: `Successfully updated records`})
        })
        .catch(err => {
            console.log(err);
            res.send({status: "Error", message: "Error while updating data"})
        })
})

//Delete
app.post('/delete-documents', (req,res) => {
    let criteria = {"category_name" : 'Commercial Auto'}
    utils.deleteAgentByCriteria("agents", criteria)
        .then(response => {
            res.send({status: "Success", message: `Successfully deleted records`})
        })
        .catch(err => {
            console.log(err);
            res.send({status: "Error", message: "Error while deleting records"})
        })
})

app.listen(port, (err, res) => {
    if (err) {
        console.log("Error while running server");
    } else {
        console.log(`Server is running at port ${port}`);
    }
});
