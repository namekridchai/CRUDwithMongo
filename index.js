const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');
const Checklist = require('./models/checklist')
const Person = require('./models/people')
const methodOverride = require('method-override');
const AppError = require('./err'); 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
main().then(err => console.log('whooo'));
const importanceness = ['urgent','mustdoNUrgent','mustNotDo'];
app.use(methodOverride('_method'));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/checklistStand');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const wrap = function(fun){
  return (req,res,next)=>{
      fun(req,res,next).catch((e)=>{
        next(new AppError('not found',404));
      });
  }
}

app.get('/checklists',async (req,res) =>{
  
  const {importanceness} = req.query;
  if(importanceness){
    const c = await Checklist.find({importanceness}).populate('Person','name');
    res.render('checklists/index',{c,importanceness});
  }
  else{
    const c = await Checklist.find({});
    res.render('checklists/index',{c,importanceness:"All"});
  }
 
})

app.get('/people',async (req,res) =>{
    const c = await  Person.find({});
    res.render('people/index',{c});
})

app.get('/people/new',(req,res) =>{
  res.render('people/new');
})

app.get('/people/:id',wrap(async(req,res,next) =>{
  const {id} = req.params;
  const c = await  Person.findById(id).populate("Checklists");

  res.render('people/show',{c});   
}))

app.post('/people',async (req,res) =>{
  console.log(req.body);
  const newPeople = new  Person(req.body);
  await newPeople.save();
   res.redirect(`people`);
})

app.get('/people/:id/checklists/new',async(req,res) =>{
  const{id} = req.params
  const person  = await Person.findById(id);
  res.render('checklists/new',{importanceness,person });
})

app.post("/people/:id/checklists",async (req,res) =>{
   const{id} = req.params;
   const newPerson  = await Person.findById(id);
   console.log(req.body);
   const newChecklist = new Checklist(req.body);
   newPerson.Checklists.push(newChecklist);
   newChecklist.Person = newPerson;
   console.log(newChecklist.Person);
   
   await newChecklist.save();
   await newPerson.save();
   res.redirect(`/people/${id}`)
  
})
app.get('/checklists/new',(req,res) =>{
  res.render('checklists/new',{importanceness});
})
app.get('/error',(req,res) =>{
  throw new AppError('ss',500);
})




app.get('/checklists/:id',wrap(async(req,res,next) =>{
    const {id} = req.params;
    const c = await Checklist.findById(id).populate("Person","name")
   
    res.render('checklists/show',{c});   
}))
app.get('/checklists/:id/edit',async (req,res) =>{
  const {id} = req.params;
  const c = await Checklist.findById(id);  
  res.render('checklists/edit',{c,importanceness});
})
app.put('/checklists/:id',async (req,res) =>{
  const {id} = req.params;
  await Checklist.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
  res.send('put!!!'); 
  
})

app.post('/checklists',async (req,res) =>{
   console.log(req.body);
   const newChecklist = new Checklist(req.body);
   await newChecklist.save();
    res.redirect(`checklists/${newChecklist._id}`);
})

app.delete('/checklists/:id',async (req,res)=>{
  const {id} = req.params;
  await Checklist.findByIdAndDelete(id);
  res.redirect('/checklists');
})

app.delete('/people/:id',async (req,res)=>{
  const {id} = req.params;
  await Person.findByIdAndDelete(id);
  res.redirect('/people');
})

app.use((err,req,res,next)=>{
  console.log('fg');
  const{status = 500,message = 'default'} = err;
  res.status(status).send(message);
 
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Example app listening on port ${port}`);
})