
const userModel = require("../../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();
var jwt = require('jsonwebtoken');


// var slugify = require('slugify')

const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

exports.register = async(request,response) => {
        checkEmail = await userModel.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    // if(checkEmail){
    //     const data = {
    //         _status : false,
    //         _message : 'Email Id already exit !!',
    //         _data : null
    //     }

    //     response.send(data)
    // }

    dataSave = request.body;
    dataSave.role_type = 'user';
    dataSave.password = await bcrypt.hash(request.body.password, saltRounds);

    userModel(dataSave).save()
    .then((result) => {

    console.log(process.env.secret_key)

        token = jwt.sign({ userInfo : result } , process.env.secret_key);

        const data = {
            _status : true,
            _message : 'Register user successfully !',
            _token : token,
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : error.message,
            _data : null
        }

        response.send(data)
    });

}

exports.login = async (request, response) => {
    checkEmail = await userModel.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(!checkEmail){
        const data = {
            _status : false,
            _message : 'Email Id doest not exit !!',
            _data : null
        }

        response.send(data)
    }

    var checkPassword = await bcrypt.compare(request.body.password, checkEmail.password);
    
    if(!checkPassword){
        const data = {
            _status : false,
            _message : 'Password is incorrect !!',
            _data : null
        }

        response.send(data)
    }

    if(checkEmail.status == 0){
        const data = {
            _status : false,
            _message : 'Your account is deactivated. Please contact support !!',
            _data : null
        }

        response.send(data)
    }

    token = jwt.sign({ userInfo : checkEmail } , process.env.secret_key);

    const data = {
        _status : true,
        _message : 'Login successfully !',
        _token : token,
        _data : checkEmail
    }

    response.send(data)
};

exports.changePassword = async(request, response) => {

    var token = request.headers.authorization.split(' ');
    var decoded = jwt.verify(token[1], process.env.secret_key);

    userInfo = await userModel.findOne({
        _id: decoded.userInfo._id, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(!userInfo){
        const data = {
            _status : false,
            _message : 'User doest not exit !!',
            _data : null
        }

        response.send(data)
    }

    var checkPassword = await bcrypt.compare(request.body.current_password, userInfo.password);
    
    if(!checkPassword){
        const data = {
            _status : false,
            _message : 'Password is incorrect !!',
            _data : null
        }

        response.send(data)
    }

    if(request.body.new_password != request.body.current_password){
        const data = {
            _status : false,
            _message : 'New Password and current password cannot be same !!',
            _data : null
        }

        response.send(data)
    }

    if(request.body.new_password == request.body.confirm_password){
        const data = {
            _status : false,
            _message : 'New Password and confirm password must be same !!',
            _data : null
        }

        response.send(data)
    }

    var password = await bcrypt.hash(request.body.confirm_password, saltRounds);

    await userModel.updateOne({
        _id : decoded.userInfo._id
    }, {
        $set : {
            password : password
        }
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Change Password successfully !!',
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        var errorMessages = {};
        for( var i in error.errors){
            errorMessages[i] = error.errors[i].message;
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errorMessages,
            _data : null
        }

        response.send(data)
    })
}


exports.create = async(request,response) => {
     const saveData = request.body

    if(request.file){
      saveData.image = request.file.filename
    }

     if(request.body != undefined){
        if(request.body.name != undefined || request.body.name != ''){
            var slug = slugify(request.body.name, {
                lower : true,
                strict : true
            })

            saveData.slug = await generateUniqueSlug(productModel, slug);
        }
    }


    await userModel(saveData).save()
    .then((result) => {
        const data = {
        _status : true,
        _message : 'Record Found sucessfully !!',
        _data : result
      }
    response.send(data)
    })
    .catch((error) => {

      var errorMessages = {};

      for( var i in error.errors){
        errorMessages[i] = error.errors[i].message;
      }


        const data = {
        _status : false,
        _message : 'something went wrong !!',
        _error : errorMessages,
        _data : null
      }
    response.send(data)
    })
}

exports.view = async(request,response) => {
    
}

exports.details = async(request,response) => {
    
}

exports.changeStatus = async(request,response) => {
    
}

exports.update = async(request,response) => {
    
}

exports.destroy = async(request,response) => {
    
}