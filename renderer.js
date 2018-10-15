// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


// https://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework

// file system module
const fs = require('fs');

// dialogs module
const {dialog} = require('electron').remote;


/* event handlers */

document.getElementById('select-file').addEventListener('click',function(){
    dialog.showOpenDialog(function (fileNames) {
        if(fileNames === undefined){
            console.log("No file selected");
        }else{
            document.getElementById("actual-file").value = fileNames[0];
            readFile(fileNames[0]);
        }
    }); 
},false);

document.getElementById('save-changes').addEventListener('click',function(){
    var actualFilePath = document.getElementById("actual-file").value;
    
    if(actualFilePath){
        saveChanges(actualFilePath,document.getElementById('content-editor').value);
    }else{
        alert("Please select a file first");
    }
},false);

document.getElementById('delete-file').addEventListener('click',function(){
    var actualFilePath = document.getElementById("actual-file").value;
    
    if(actualFilePath){
        deleteFile(actualFilePath);
        document.getElementById("actual-file").value = "";
        document.getElementById("content-editor").value = "";
    }else{
        alert("Please select a file first");
    }
},false);

document.getElementById('create-new-file').addEventListener('click',function(){
    var content = document.getElementById("content-editor").value;
    
    dialog.showSaveDialog(function (fileName) {
        if (fileName === undefined){
            console.log("You didn't save the file");
            return;
        }
        
        fs.writeFile(fileName, content, function (err) {
            if(err){
                alert("An error ocurred creating the file "+ err.message)
            }
            
            alert("The file has been succesfully saved");
        });
    }); 
},false);

/* end of event handlers */


function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }
        
        document.getElementById("content-editor").value = data;
    });
}

function deleteFile(filepath){
    if (fs.existsSync(filepath)) {        
        // File exists deletings
        fs.unlink(filepath,function(err){
            if(err){
                alert("An error ocurred updating the file"+ err.message);
                console.log(err);
                return;
            }
        });
    } else {
        alert("This file doesn't exist, cannot delete");
    }    
}

function saveChanges(filepath,content){
    fs.writeFile(filepath, content, function (err) {
        if(err){
            alert("An error ocurred updating the file"+ err.message);
            console.log(err);
            return;
        }
        
        alert("The file has been succesfully saved");
    }); 
}