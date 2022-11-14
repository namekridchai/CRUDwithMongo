const mongoose = require('mongoose');
const Checklist = require('./models/checklist')
main().then(err => console.log('whooo'));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/checklistStand');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const c = new Checklist({
    nameTask:'MathHw',
    startDate:1,
    deadline:10,
    importanceness:'mustdoNUrgent'
})

const cArr = [{
    nameTask:'ChemHw',
    startDate:3,
    deadline:3,
    importanceness:'mustdoNUrgent'
},{
    nameTask:'BioHw',
    startDate:4,
    deadline:1,
    importanceness:'urgent'
},
{
    nameTask:'playDota',
    startDate:1,
    deadline:10,
    importanceness:'mustNotDo'
},
{
    nameTask:'watchDoraemon',
    startDate:5,
    deadline:2,
    importanceness:'mustNotDo'
},
{
    nameTask:'ChineseTest',
    startDate:7,
    deadline:2,
    importanceness:'urgent'
},
{
    nameTask:'ChineseHw',
    startDate:4,
    deadline:5,
    importanceness:'mustdoNUrgent'
},
{
    nameTask:'playUno',
    startDate:3,
    deadline:1,
    importanceness:'mustNotDo'
},
]
const test = new Checklist({nameTask:'hoho'});
test.save();
// Checklist.insertMany(cArr).then(c=>{console.log(c)});