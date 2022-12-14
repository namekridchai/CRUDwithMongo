const mongoose = require('mongoose');
const {Schema} = mongoose
const checklistSchema= new mongoose.Schema({
    nameTask:  {
        type:String,
        required:true
    }, // String is shorthand for {type: String}
    startDate: {
        type:Number,
        required:true,
        min:[0,"in my System we start count day at day1"]
    },
    deadline:{
        type:Number,
        required:true,
        min:0
    },
    importanceness:{
        type:String,
        enum:['urgent','mustdoNUrgent','mustNotDo']
    },

    Person:
        {type:Schema.Types.ObjectId,ref:'Person'}
    
 
  });
 
  const Checklist = mongoose.model('Checklist', checklistSchema);
  module.exports = Checklist;