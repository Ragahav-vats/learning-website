const express = require('express');
const multer  = require('multer');
const { register, login, changePassword, forgotPassword} = require('../../controllers/website/user.controller');
const upload = multer({ dest: 'uploads/users' });



var router = express.Router();

 module.exports = server => {

    //    const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'uploads/products')
    //     },
    //     filename: function (req, file, cb) {
    //         var extension = path.extname(file.originalname);
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //         cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    //     }
    // })

    // const upload = multer({ storage: storage })

    // // const singleImage = upload.single('image');
    // // const multipleImage = upload.array('images', 6);
    // const uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

       router.post('/register', upload.none(),register);
       router.post('/login', upload.none(),login);
       router.put('/change-password', upload.none(),changePassword);
       router.post('/forgot-password', upload.none(),forgotPassword);
    // router.post('/create', uploadMiddleware,create);
    // router.post('/view',upload.none(), view);
    // router.post('/details/:id',upload.none(), details);
    // router.put('/update/:id',uploadMiddleware, update);
    // router.post('/change-status',upload.none(), changeStatus);
    // router.post('/destroy',upload.none(), destroy);

     server.use('/api/website/users',router);
}