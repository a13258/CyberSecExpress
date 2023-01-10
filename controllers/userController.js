'use strict';
const mongoose = require('mongoose');
const User= mongoose.model('User');

exports.newUser = async (req, res)=>{
    const {macAddr} = req.body

    //validations
    if(macAddr == null || typeof macAddr !=='string' || macAddr.length != 17) {
        return res.json({status: '500', error:'Invalid Mac Address'})
    }

    var user = await User.findOne({macAddr}).lean()
    
    if(user) {
        return res.json({status:'200', error:'User already registered'})
    }

    // Add to database
    User.create({
        macAddr:macAddr
    }, function (err, docs) {
        if(err) {
            console.log(err)
            return res.json({status:'500', error:err})
        }
        else {
            console.log("New User : ", docs);
            return res.json({status:'201', message:'User created!'})
        }
    })
}

exports.eventsHandler = (request, response)=>{
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
  
    const data = `data: ${JSON.stringify(hrm)}\n\n`;
  
    response.write(data);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
  
    clients.push(newClient);
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
}
  
let clients = [];
let hrm = [];

function sendEventsToAll(newHRM) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newHRM)}\n\n`))
}

exports.userHRM = async (req, res)=>{
    const {macAddr, heartrateMeasurement} = req.body
    const newHRM = req.body;

    var user = await User.findOne({macAddr}).lean()

    if(heartrateMeasurement == null || typeof heartrateMeasurement !=='number') {
        return res.json({status: '500', error:'Invalid Heart Rate Measurement'})
    }
    
    if(!user) {
        return res.json({status:'500', error:'Invalid user'})
    }

    hrm.push(newHRM);
    sendEventsToAll(newHRM);


    User.findByIdAndUpdate(user._id, {$push: {heartrateMeasurement: heartrateMeasurement} },
                            function (err, docs) {
    if(err) {
        console.log(err)
        return res.json({status:'500', error:err})
    }
    else {
        console.log("Updated User : ", docs);
        return res.json({status:'200'})
    }
    });

}