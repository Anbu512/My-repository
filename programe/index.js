// get text form text file

let upload = document.getElementById("upload");
let inputFileText;
let dictionary = document.getElementById("dictionary");
let dictionaryFileText;
let find = document.getElementById("find");
let findFileText;

function myFunction() {
    let startTime = performance.now();
    inputFile();
    let finishTime = performance.now();
    document.getElementById("Time").innerHTML = (`Time taken to process  ${(finishTime - startTime) / 1000} seconds`);
    document.getElementById("Memory").innerHTML = (`Memory taken to process ${(performance.memory.usedJSHeapSize) / 1000000} mb`);
}

function inputFile() {

    // get the input file text
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function () {
        inputFileText = fr.result.replace(",", " , ").toLowerCase();

        // get the english and french dictionary
        let fr2 = new FileReader();
        fr2.readAsText(dictionary.files[0]);
        fr2.onload = function () {
            dictionaryFileText = fr2.result.replace(/[\r]+/gm, ",").replace(/[\n]+/gm, "").split(",");

            let frenchArr = [];
            let englishArr = [];
            for (let i = 0; i < dictionaryFileText.length; i++) {
                if ((i + 2) % 2 == 0) {
                    englishArr.push(dictionaryFileText[i]);
                } else {
                    frenchArr.push(dictionaryFileText[i]);
                }
            }

            let dictionaryObj = {};
            englishArr.forEach(function (val, ind) {
                dictionaryObj[val] = frenchArr[ind];
            });
            //console.log(dictionaryObj);

            // translate english to french
            let result = inputFileText.replace(/(\w+)/g, (value, key) => dictionaryObj[key] || value);
            //console.log(result);
            document.getElementById("result").innerHTML = result;
            document.getElementById("result").style.overflow = "scroll";

            // geting words to find with frequency
            let fr3 = new FileReader();
            fr3.readAsText(find.files[0]);
            fr3.onload = function () {
                findFileText = fr3.result.split("\n");
                //console.log(findFileText);

                // gettting frequency of translated words
                let text = "";
                findFileText.forEach(function (eng, ind) {
                    let fre = frenchArr[ind];

                    function countWords(string, word) {
                        return string.split(word).length - 1;
                    }
                    let count = countWords(inputFileText, eng);
                    text += `    ${eng} --> ${fre} --> ${count} <br> <br>`;
                    document.getElementById("frequency").innerHTML = text;
                    document.getElementById("frequency").style.overflow = "scroll";
                });
            }
        }
    }
}
