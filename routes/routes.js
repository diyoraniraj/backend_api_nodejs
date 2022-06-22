const express = require('express');
const { findByIdAndDelete, findOne } = require('../model/model');
const Model = require('../model/model');
const router = express.Router()

router.post('/post', (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    try {
        Model.findOne({
            name: req.body.name
          }, function(err, name) 
          {
            if (err) {
                return err
            } else if (name) 
            {
                res.statusCode = 500
                return res.send({"message": "User already exists!!"})
            } else {
        const dataToSave = data.save();
        res.status(200).json(data)
        }
      })
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/getAll', async (req, res) => {
   try {
    const Data = await Model.find();
    res.json(Data)
    console.log("List of all mongo db data", Data);
   }
   catch(error) {
    res.status(500).json({message: error.message})
   }
})

router.get('/getOne/:id', async (req, res) => {
    try {
        const Data = await Model.findById(req.params.id);
        res.json(Data)  
       }
       catch(error) {
        res.status(500).json({message: error.message})
       }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
  try{
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id)
      res.send('Document With ${data.name} has been deleted successfully .....')
  } 
  catch(error) {
    res.status(400).json({message: error.message})
  }
})



module.exports = router;