const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');
const Checklist = require('./models/checklist')
const methodOverride = require('method-override');
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

app.get('/checklists',async (req,res) =>{
  
  const {importanceness} = req.query;
  if(importanceness){
    const c = await Checklist.find({importanceness});
    res.render('checklists/index',{c,importanceness});
  }
  else{
    const c = await Checklist.find({});
    res.render('checklists/index',{c,importanceness:"All"});
  }
 
})

app.get('/checklists/new',(req,res) =>{
  res.render('checklists/new',{importanceness});
})

app.get('/checklists/:id',async (req,res) =>{
  const {id} = req.params;
  const c = await Checklist.findById(id);  
  res.render('checklists/show',{c});
})
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
  //res.render('checklists/show',{c});
    res.redirect(`checklists/${newChecklist._id}`);
})

app.delete('/checklists/:id',async (req,res)=>{
  const {id} = req.params;
  await Checklist.findByIdAndDelete(id);
  res.redirect('/checklists');
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})