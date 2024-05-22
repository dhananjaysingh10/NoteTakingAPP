const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path'); 

// setting up parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//setting up public static file
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// setting up view engine
app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    fs.readdir(`./files`, (err, files)=>{
        // console.log(files);
        res.render("index", {files: files});
    });  
});

app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata)=>{
       res.render("show",{title: req.params.filename, content: filedata});
    })
})

app.get('/file/delete/:filename', function(req, res){
    fs.rm(`./files/${req.params.filename}`, (err)=>{
        // console.log("Removed");
        res.redirect("/");
    })
})

app.post('/create',(req, res)=>{
    // console.log(req.body.title);
    //     console.log(req.body.details);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err)=>{
        console.log(req.body.title);
        console.log(req.body.details);
        res.redirect("/");
    });  
});

app.listen(3000,()=>{
    console.log("Server Running");
});
// console.log(__dirname);