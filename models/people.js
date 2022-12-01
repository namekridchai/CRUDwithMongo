const mongoose = require('mongoose');
const Checklist = require('./checklist');
const {Schema} = mongoose;
const  PersonSchema= new mongoose.Schema({
    name:  {
        type:String,
        required:true
    }, // String is shorthand for {type: String}
    email: {
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    Checklists:
        [{type:Schema.Types.ObjectId,
                ref:'Checklist'
        }]
    

  });
  PersonSchema.post('findOneAndDelete',async function(people){
    if(people.Checklists.length){
       const c = await Checklist.deleteMany({
            _id:{$in:people.Checklists}
        })
        console.log(c);
    }    
})
  const Person = mongoose.model('Person',PersonSchema);

  module.exports =  Person;