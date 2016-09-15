'use strict';

const fs = require('fs');
const concat = require('concat-files');
const os = require('os')

const dir = "./out/";
const prefix = 'out_';
let refs = [];

function writeFile(writeObject, outputFilename){
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	fs.writeFile(dir.concat(outputFilename), JSON.stringify(writeObject, null, " "), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("File saved to " + dir.concat(outputFilename));
			concat(outFiles, dir.concat("allesammen.md"), () =>{
				console.log('done...');
        console.log(refs);
			});
		}
	});
}


function readFile(filename, callback){
	fs.readFile(filename, 'utf8', function (err, data) {
		if (err) throw err;
		callback(data);
	});
}


const files =  ["0_Preface.md", "1_Introduction.md", "2_Method.md", "3_Literature_Review.md", "4_Interviews.md", "5_Proposed_Design.md", "6_Discussion.md", "7_Conclusion.md", "8_Bibliography.md"];


let outFiles = [];


let counter = 0;
files.forEach((file) => {
	
	readFile(file, (res) => {
		console.log(`Reading file ${file}`);

		let pattern = /\[CITE\]\[[^\]]+\]/g;
		let single = /\[CITE\]\[[^\]]+\]/;
		let comment = /\/\/ .*/g;
		let newLine = /\n{3,}/g;
    let reference = /\[CITE\]\[([^\]]*)/;

		let match = res.match(pattern);
    res = res.replace(comment, "");
    res = res.replace(newLine, "\n");
    // res = res.replace(/\\n/g, );
    res = res.replace(/\"\"/g, "");

		if(match && match.length > 0){  
			match.forEach((item) => {
        console.log(item);
        let title = item.match(reference);
        if(!refs[title[1]]){
           refs[title[1]] = ++counter; 
        }else{

        }
        res = res.replace(single, `[${refs[title[1]]}]`); 
			})
		}
      // console.log(res)
      outFiles.push(dir.concat(prefix.concat(file)));
      writeFile(res, prefix.concat(file));
		});
})