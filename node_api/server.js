var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_api');

var Bear = require('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// middleware
router.use(function(req,res,next){
  console.log('something is happen!!');
  next();
})

router.route('/bears').post(function(req,res){
    var bear = new Bear();
    bear.name = req.body.name;
      console.log(bear);
    bear.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({
        message: 'bear is created!!!'
      })
    })
  })
  .get(function(req,res){
    Bear.find(function(err,bears){
      if(err){
        res.send(err);
      }
      res.json(bears);
    })
  })

router.route('/bears/:bear_id').get(function(req,res){
  Bear.findById(req.params.bear_id,function(err,bear){
    if(err){
      res.send(err)
    }
    res.json(bear);
  })
})
.put(function(req,res){
  Bear.findById(req.params.bear_id, function(err, bear){
    if(err){
      res.send(err)
    }
    bear.name = req.body.name;
    bear.save(function(err){
      if(err){
        res.send(err)
      }
      res.json({
        message: 'Bear is update success!!!'
      })
    })
  })
})
.delete(function(req,res){
  Bear.remove({
    _id: req.params.bear_id
  }, function(err,bear){
    if(err){
      res.send(err)
    }
    res.json({
      message: 'delete is success!!!'
    })
  })
})


router.get('/', function(req,res){
  console.log('something is get!!');
  res.json({
    message: 'hello, world!'
  })
})

app.use('/api', router);

app.listen(port);
console.log('magic is coming' + port);
