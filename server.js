const express =require('express');
const cors=require('cors');
const app=express();
const creatingTables=require('./setup.js');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is runing on port :${PORT}`)
    creatingTables();
})

