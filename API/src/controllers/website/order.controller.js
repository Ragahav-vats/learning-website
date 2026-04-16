
const orderModel = require("../../models/order");
const saltRounds = 10;
require('dotenv').config();
var jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');


// var slugify = require('slugify')

var instance = new Razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc',
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
});

exports.placeOrder = async(request,response) => {
          try {
        var token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);

    } catch (error) {
        const data = {
            _status: false,
            _message: 'Token is InCorrect !!',
            _data: null
        }

        response.send(data)
    }

    var totalOrders = await orderModel.find().countDocuments();
    var totalOrders = totalOrders + 1001;

    dataSave = request.body;
    dataSave.user_id = decoded.userInfo._id;
     dataSave.order_number = 'MONSTA_' + totalOrders;

    orderModel(dataSave).save()
    .then(async(result) => {

         var orderInfo = await instance.orders.create({
                "amount": request.body.net_amount * 100,
                "currency": "INR",
                "receipt": result._id,
                "partial_payment": false,
            })
             await orderModel.updateOne({ _id: result._id }, { $set: { order_id: orderInfo.id } })

        const data = {
            _status : true,
            _message : 'order placed successfully !',
            _order_info: orderInfo,
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        var errorMessages = {};
            for (var i in error.errors) {
                errorMessages[i] = error.errors[i].message;
            }

            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: errorMessages,
                _data: null
            }

            response.send(data)
        })

}

exports.changeStatus = async(request,response) => {

}

