const express = require('express');
const { createCppFile } = require('./createCppFile');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res)=>{
    return res.json({Hello:"world"});
})

app.post('/run', async (req, res)=>{

    const {language = "cpp", code} = req.body;

    if(code === undefined){
        return res.status(400).json({success:false, error:"empty code"});
    }

    const filePath = await createCppFile(language, code);

    return res.json({filePath});
})

app.listen(5000, ()=>{
    console.log("listening on port 5000");
})