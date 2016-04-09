var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var jwtconfig = require('../config/jwtconfig').jwtconfig;
var jwt = require('jwt-simple');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', function (req, res, next) {
    if (!req.body.userName || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password'});
    } else {
        var newUser = new User({
            userName: req.body.userName,
            password: req.body.password
        });
        console.log(newUser);
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                return res.json({success: false, msg: err});
            }
            res.json({success: true, msg: 'Successfully created a User!'});
        })
    }
});

router.post('/authenticate', function (req, res) {
    User.findOne({
        userName: req.body.userName
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({msg: 'Authentication failed. User not found'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var iat = new Date().getTime() / 1000;
                    var exp = iat + jwtconfig.tokenExpirationTime;
                    var payload = {
                        aud: jwtconfig.audience,
                        iss: jwtconfig.issuer,
                        iat: iat,
                        exp: exp,
                        sub: user.userName
                    };
                    var token = jwt.encode(payload, jwtconfig.secret);
                    res.json({token: 'JWT' + token});
                } else {
                    res.status(401).send({msg: 'Authentication failed. Wrong password'});
                }
            })
        }

    })
});

module.exports = router;
