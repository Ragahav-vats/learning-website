const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name: {
    type : String,
    default : '',
    required : [true,'Name is required'],
    match: /^[a-zA-Z ]{2,15}$/,
    validate: {
      validator: async function(v) {
        const user = await this.constructor.findOne({ name: v, deleted_at : null });
        return !user;
      },
      message: props => `The specified username is already in use.`
}
  },

  email: {
    type : String,
    default : '',
    required : [true,'Email is required'],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/,
    validate: {
    validator: async function(v) {
    const user = await this.constructor.findOne({ email: v, deleted_at : null, role_type: 'user' });
        return !user;
      },
      message: props => `The specified Email is already in use.`
}
  },

  mobile_number : {
    type : Number,
    default : ''
  },

  password : {
    type : String,
    required :  [true,'password is required'],
    default : ''
  },

  address : {
    type : String,
    default : ''
  },

  gender : {
    type : String,
    default : ''
  },

  role_type : {
    type : String,
    enum : ['user','admin'],
    required :  [true,'Role Type is required'],
    default : 'user'
  },

  status : {
    type : Boolean,
    default : true
  },

  actual_price : {
    type : Number,
    default : '',
    required : [true, 'Actual price is required']
  },

  sale_price : {
    type : Number,
    default : '',
    required : [true, 'Sale price is required']
  },

  short_description : {
    type : String,
    default : '',
    required : [true, 'Short Description is required']
  },

  image : {
    type : String,
    default : ''
  },

    images : {
    type : Array,
    default : []
  },

   is_development : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Development is required']
  },

   is_design : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Design is required']
  },

   is_marketing : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Marketing is required']
  },

   is_android : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Android is required']
  },

   is_ios : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is ios is required']
  },

   is_flutter : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Flutter is required']
  },

   is_react_native : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is React Native is required']
  },

  is_python : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Python is required']
  },

  is_machine_learning : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Machine Learning is required']
  },

  is_data_analysis : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Data Analysis is required']
  },

  is_ai : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is AI is required']
  },

  is_deep_learning : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is Deep Learning is required']
  },

  is_nlp : {
    type : string,
    default : 1, // 1-yes, 2-No
    required : [true, 'Is NLP  is required']
  },

  created_at : {
    type : Date,
    default : Date.now()
  },

  updated_at : {
    type : Date,
    default : Date.now()
  },

  deleted_at :{
    type : Date,
    default : ''
  },

});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
