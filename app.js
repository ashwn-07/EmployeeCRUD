// Task1: initiate app and run server at 3000

    const express = require("express");
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extented: true }));

    require('dotenv').config();
    PORT = process.env.PORT;
    myconnstr =process.env.myconnstr;
    

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });

    const path = require("path");
    app.use(express.static(path.join(__dirname + "/dist/FrontEnd")));
    // Task2: create mongoDB connection
        const mongoose = require("mongoose");
        mongoose.connect(myconnstr)

            .then(() => {
                console.log("Connection established Successfully");
            })
            .catch((error) => {
                console.log(`Cannot connect due to ${error.message}`);
            });

    const empSchema = mongoose.Schema({
        name: {
            type: String,
            required: false,
        },
        position: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: false,
        },
        salary: {
            type: Number,
            required: false,
        },
    });
    const empmodel = mongoose.model("employee", empSchema);
    //Task 2 : write api with error handling and appropriate api mentioned in the TODO below

    //TODO: get data from db  using api '/api/employeelist'

    app.get("/api/employeelist", async (req, res) => {
        try {
            const data = await empmodel.find();

            res.send(data);
        } catch (error) {
            console.log(error);
        }
    });

    //TODO: get single data from db  using api '/api/employeelist/:id'

    app.get("/api/employeelist/:id", async (req, res) => {
        try {
            pos = req.params.id;
            const data = await empmodel.findById(pos);
            res.send(data);

        } catch (error) {
            console.log(error);
        }
    });

    //TODO: send data from db using api '/api/employeelist'
    //Request body format:{name:'',location:'',position:'',salary:''}

    app.post("/api/employeelist", async (req, res) => {
        try {
            item = req.body;
            //console.log(item)
            const data = await empmodel(item);
            data.save();
            res.send(data);

        } catch (error) {
            console.log(error);
        }
    });

    //TODO: delete a employee data from db by using api '/api/employeelist/:id'

    app.delete("/api/employeelist/:id", async (req, res) => {
        try {
            pos = req.params.id;
            // console.log(pos)
            const data = await empmodel.findOneAndDelete({ _id: pos });
            res.send(data);

        } catch (error) {
            console.log(error);
        }
    });

    //TODO: Update  a employee data from db by using api '/api/employeelist'
    //Request body format:{name:'',location:'',position:'',salary:''}

    app.put("/api/employeelist/", async (req, res) => {
        try {
            newdata = req.body;
            //console.log(newdata)
            pos = req.body._id;
            // console.log(pos)
            const data = await empmodel.findByIdAndUpdate(pos, {
                $set: {
                    name: newdata.name,
                    location: newdata.location,
                    position: newdata.position,
                    salary: newdata.salary,
                },
            });

            res.send(data);

        } catch (error) {
            console.log(error.message);
        }
    });

    //! dont delete this code. it connects the front end file.
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname + "/dist/Frontend/index.html"));
    });
