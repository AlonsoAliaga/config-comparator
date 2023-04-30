const errorsFormat = {
  "MissingDependency": {
    display: "Missing dependencies",
    regex: new RegExp("Could not load 'plugins\\/([A-z0-9.-]+)\.jar' in folder 'plugins'(\\r\\n|\\r|\\n|\\s)+org\.bukkit\.plugin\.UnknownDependencyException: Unknown\\/missing dependency plugins: \\[([^']+)\\]\. Please download and install these plugins to run '([^']+)'\.", "g")
  },
  "CouldNotPassEvent": {
    display: "Plugin event errors",
    regex: new RegExp("Could not pass event ([a-zA-Z0-9_-]+) to ([a-zA-Z0-9_-]+) v[a-zA-Z0-9._-]+", "g")
  },
  "ErrorWhileEnablingCannotTranslateNull": {
    regex: new RegExp("Error occurred while enabling ([a-zA-Z0-9_-]+) v([a-zA-Z0-9_.-]+) \(Is it up to date\?\)(\\r\\n|\\r|\\n)+java\.lang\.IllegalArgumentException: Cannot translate null text", "g")
  },
  "CannotTranslateNull": {
    display: "Config errors",
    regex: new RegExp(/at org\.apache\.commons\.lang\.Validate\.notNull\(Validate\.java\:([\d?.]+)\) \~\[[a-zA-Z0-9_.-]+jar\:[\d?.]+\](\r|\r\n|\n|\s)+at org\.bukkit\.ChatColor\.translateAlternateColorCodes\(ChatColor\.java\:([\d?.]+)\) \~\[[a-zA-Z0-9_.-]+jar\:([\d?.]+)\](\r|\r\n|\n|\s)+at (([a-zA-Z0-9_-])+\.)+([a-zA-Z0-9_-])+\([a-zA-Z0-9_.-]+\.java\:([\d?.]+)\) \~\[[a-zA-Z0-9_.-]+jar\:[\d?.]+\]/,"g"),
    // regex: new RegExp("at org\.apache\.commons\.lang\.Validate\.notNull\(Validate\.java\:[\d?]+\) \~\[[a-zA-Z0-9_.-]+jar\:[\d?]+\]((\\r|\\r\\n|\\n|\\s)+)at org\.bukkit\.ChatColor\.translateAlternateColorCodes\(ChatColor\.java\:([\d?]+)\) \~\\[([a-zA-Z0-9\_\-\.]+)jar\:[\d?\.]+\\](\\r|\\r\\n|\\n|\\s)+at (([a-zA-Z0-9\_\-])+\.)+([a-zA-Z0-9\_\-])+\([a-zA-Z0-9\_\.\-]+\.java\:([0-9\?]+)\) \~\\[[a-zA-Z0-9\_\-\.]+jar\:[0-9\?\.]+\\]", "g"),
    first: new RegExp(/at org\.apache\.commons\.lang\.Validate\.notNull\(Validate\.java\:([\d?.]+)\) \~\[[a-zA-Z0-9_.-]+jar\:[\d?.]+\](\r|\r\n|\n|\s)+at org\.bukkit\.ChatColor\.translateAlternateColorCodes\(ChatColor\.java\:([\d?.])+\) \~\[[a-zA-Z0-9_.-]+jar\:([\d?.]+)\](\r|\r\n|\n|\s)+at /,"g"),
    package: new RegExp(/(([a-zA-Z0-9_-])+\.)+([a-zA-Z0-9_-])+\([a-zA-Z0-9_.-]+\.java\:([\d?.]+)\)/,"g"),
    class: new RegExp(/(([a-zA-Z0-9_-])+\.)+/,"g"),
    classAndLine: new RegExp(/\([a-zA-Z0-9_.-]+\.java\:([\d?.]+)\)/g,"g"),
  },
}
//createTableVersion();
function createTableVersion() {
  let tableErrors = document.getElementById('table-errors');
  if(tableErrors) {
    let s = "";
    for(let errorType of Object.keys(errorsFormat)) {
      let data = errorsFormat[errorType];
      s += `<li><input type="checkbox" checked id="${errorType}-option"></input><label for="${errorType}-option" style="margin-bottom: 0px;margin-top: 0px;"> ${data.display}</label><br></li>`
    }
    tableErrors.innerHTML = s;
  }
}
function copyTextToClipboard(text) {
  let textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.bottom= 0;
  textArea.style.left= 0;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  alert('You text was copied! Ready to paste!\n\nThanks for using our tool!\n- AlonsoAliaga');
  document.body.removeChild(textArea);
}
function markAll() {
  for(let errorType of Object.keys(errorsFormat)) {
    let errorTypeOption = document.getElementById(`${errorType}-option`);
    if(errorTypeOption) {
      errorTypeOption.checked = true;
    }
  }
}
function unmarkAll() {
  for(let errorType of Object.keys(errorsFormat)) {
    let errorTypeOption = document.getElementById(`${errorType}-option`);
    if(errorTypeOption) {
      errorTypeOption.checked = false;
    }
  }
}
function test() {
  console.log("TESTING WORKS!")
}
let t = ["current-config","new-config","appearance","compare-button","f-c-b","d-o-b","download-fixed","download-differences"];
function toggleDarkmode() {
    if (document.getElementById('darkmode').checked == true) {
      document.body.classList.add('dark');
      //document.getElementById('result').classList.add("darktextboxes");
      for(let n of  t) {
        let d = document.getElementById(n);
        if(d) {
          d.classList.remove("lightbuttonboxes");
          d.classList.add("darkbuttonboxes");
        }
      }
      let success = document.getElementById('success_message');
      if(success) {
        success.classList.remove("successlight");
        success.classList.add("successdark");
      }
    } else {
      document.body.classList.remove('dark');
      //document.getElementById('result').classList.remove("darktextboxes");
      //Buttons
      for(let n of  t) {
        let d = document.getElementById(n);
        if(d) {
          d.classList.remove("darkbuttonboxes");
          d.classList.add("lightbuttonboxes");
        }
      }
      let success = document.getElementById('success_message');
      if(success) {
        success.classList.remove("successdark");
        success.classList.add("successlight");
      }
    }
    //console.log("Dark mode is now: "+(document.getElementById('darkmode').checked))
}
function checkSite(window) {
  setTimeout(()=>{
    let href = window.location.href;
    if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) {
      try{document.title = `Page stolen from https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}`;}catch(e){}
      window.location = `https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}/config-comparator/`}
  });
}
function selectTab(evt, tabName, buttonName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  if(evt) {
    evt.currentTarget.className += " active";
  }else if(buttonName) {
    let b = document.getElementById(buttonName);
    if(b) b.className += " active";
  }
}
//const jsyaml = require("js-yaml");
function compareFiles() {
  clearResults();
  processed1 = undefined;
  processed2 = undefined;
  let input1 = document.getElementById("current-config");
  let input2 = document.getElementById("new-config");
  let currentFile = input1.files[0];
  let newFile = input2.files[0];
  if(typeof currentFile == "undefined") {
    alert('Current configuration cannot be empty!');
    return;
  }
  if(!currentFile.name.endsWith(".yml")) {
    alert('Current configuration must be a valid yaml file!');
    return;
  }
  if(typeof newFile == "undefined") {
    alert('New configuration cannot be empty!');
    return;
  }
  if(!newFile.name.endsWith(".yml")) {
    alert('New configuration must be a valid yaml file!');
    return;
  }
  // console.log(`Attempting to compare '${currentFile.name}' & '${newFile.name}'`);
  input1.value = "";
  input2.value = "";
  var reader1 = new FileReader();
  //let schem1 = jsyaml.DEFAULT_SCHEMA;
  reader1.onloadend = function(event) {
    // console.log(`Starting load of ${currentFile.name}`)
    let result = event.target.result;
    // console.log(`Successfully result ${currentFile.name}`)
    //processed1 = result;
    //console.log(result);
    /*
    processed1 = jsyaml.load(result, { schem1 });
    console.log(`Successfully loaded ${currentFile.name}`)
    console.log(processed1)
    */
    //if(processed2) processComparator();

    //var reader2 = new FileReader();
    //let schem2 = jsyaml.DEFAULT_SCHEMA;
    reader1.onloadend = function(event2) {
      // console.log(`Starting load of ${newFile.name}`)
      let result2 = event2.target.result;
      // console.log(`Successfully result ${newFile.name}`)
      //processed2 = result2;
      //console.log(result2);
      //processed2 = jsyaml.load(result2, { schem2 });
      //console.log(`Successfully loaded ${newFile.name}`)
      //console.log(processed2)
      if(result) processComparator(result,result2);
    }

    reader1.readAsText(newFile)
  }
  reader1.readAsText(currentFile)
}
function mergeObjects(obj1, obj2) {
  const diff = {};
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        typeof obj2[key] === "object" &&
        obj2[key] !== null &&
        typeof obj1[key] === "object" &&
        obj1[key] !== null && !Array.isArray(obj2[key])
      ) {
        const nestedDiff = mergeObjects(obj1[key], obj2[key]);
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
      } else if (!obj1.hasOwnProperty(key)/* || obj1[key] !== obj2[key]*/) {
        diff[key] = obj2[key];
        obj1[key] = obj2[key];
      }
    }
  }
  return diff;
}
let processed1;
let processed2;
function processComparator(processedCurrent,processedNew) {
  let schem = jsyaml.DEFAULT_SCHEMA;
  let first = jsyaml.load(processedCurrent,schem)
  let second = jsyaml.load(processedNew,schem)
  let firstToModify = jsyaml.load(processedCurrent,schem)
  // console.log(first)
  // console.log(second)
  // setTimeout(() => {
  //   first["love"] = "HOLAAAAAAAAAAAAAAAAA";
  //   second["love"] = "HOLAAAAAAAAAAAAAAAAA 2222222222222222222";
  // }, 5000);
  // console.log(`Both files were proccessed!`);
  // //console.log(jsyaml)
  // console.log(`This is processed #1:`)
  // console.log(processed1)
  // console.log(`Successfully loaded #1`)
  // //processed1 = jsyaml.load(processedCurrent,schem);
  // console.log(processed1)
  // console.log(`This is processed #2:`)
  // console.log(processed2)
  // console.log(`Successfully loaded #2`)
  // //processed2 = jsyaml.load("Hello: 10",schem);
  // console.log(processed2)
  let resultsFull = document.getElementById("results");
  if(resultsFull) {
    resultsFull.style.display = "block";
  }
  selectTab(null, 'fixed-config',"f-c-b");
  let difference = mergeObjects(firstToModify,second);
  // console.log(`This is the new yaml #1:`)
  // console.log(firstToModify);
  // console.log(`This is difference:`)
  // console.log(difference);
  let fixedYAML = jsyaml.dump(firstToModify,{skipInvalid:true,lineWidth:-1,noCompatMode:true})
  let differenceYAML;
  if(Object.keys(difference).length === 0) {
    differenceYAML = "#We couldn't find any missing option. Your config is up-to-date!";
  }else{
    differenceYAML = jsyaml.dump(difference,{skipInvalid:true,lineWidth:-1,noCompatMode:true})
  }
  processed1 = fixedYAML;
  processed2 = differenceYAML;
  document.getElementById("output-fixed").innerText = fixedYAML;
  document.getElementById("output-differences").innerText = differenceYAML;
  // console.log(fixedYAML);
  // console.log(differenceYAML);
  //console.log(YAML)
}
function downloadFixed() {
  const blob = new Blob([processed1], { type: 'text/yaml' });

  // Create a URL object with the Blob data
  const url = window.URL.createObjectURL(blob);
  
  // Create a link element with download attribute pointing to the URL object
  const link = document.createElement('a');
  link.download = 'fixed.yml'; // Set the download file name
  link.href = url; // Set the link href to the URL object
  
  // Append the link element to the document body
  document.body.appendChild(link);
  
  // Programmatically click the link to initiate the download of the YAML file
  link.click();
  
  // Remove the link element from the document body
  document.body.removeChild(link);
  
  // Revoke the URL object to free up system resources
  window.URL.revokeObjectURL(url);
}
function downloadDifferences() {
  const blob = new Blob([processed2], { type: 'text/yaml' });

  // Create a URL object with the Blob data
  const url = window.URL.createObjectURL(blob);
  
  // Create a link element with download attribute pointing to the URL object
  const link = document.createElement('a');
  link.download = 'differences.yaml'; // Set the download file name
  link.href = url; // Set the link href to the URL object
  
  // Append the link element to the document body
  document.body.appendChild(link);
  
  // Programmatically click the link to initiate the download of the YAML file
  link.click();

  // Remove the link element from the document body
  document.body.removeChild(link);

  // Revoke the URL object to free up system resources
  window.URL.revokeObjectURL(url);
}
function readFile(evt) {
  clearIssues();
  var files = evt.target.files;
  var file = files[0];    
  // console.log(`Attempting to read ${file}`);
  document.getElementById("log-file").value = "";
  var reader = new FileReader();
  reader.onload = function(event) {
    let result = event.target.result;
    processData(result);
  }
  reader.readAsText(file)
}
function checkYamlFile(evt) {
  var files = evt.target.files;
  var file = files[0];
  clearResults();
  processed1 = undefined;
  processed2 = undefined;
  document.getElementById("output-fixed").innerText = "Loading..";
  document.getElementById("output-differences").innerText = "Loading..";
  if(typeof file == "undefined") {
    let f = document.getElementById(evt.target.id);
    if(f) f.value = "";
    console.log(`Wrong! File is null: '${file.name}'`);
    alert('Configuration cannot be empty!');
    return;
  }
  if(!file.name.endsWith(".yml")) {
    let f = document.getElementById(evt.target.id);
    if(f) f.value = "";
    console.log(`Wrong! File type not allowed: '${file.name}'`);
    alert('Configuration must be a valid yaml file!');
    return;
  }
  console.log(`Detected '${evt.target.id}' file!`);
}
window.onclick = function(event) {
  if (event.target == document.getElementById("error-full")) {
    clearIssues();
  }
}
function clearResults() {
  let errorFull = document.getElementById("results");
  if(errorFull) {
    errorFull.style.display = "none";
    //$("#results").empty();
  }
}
function clearIssues() {
  let errorFull = document.getElementById("error-full");
  if(errorFull) {
    errorFull.style.display = "none";
    $("#error-full").empty();
    /*
    let divs = errorFull.getElementsByTagName("div");
    console.log(`Clearing ${divs.length} issues..`)
    for (let i = 0; i < divs.length; i ++) {
      console.log(`Cleared issue #${i}..`)
      divs[i].remove();
    }
    */
  }
  // let errors = document.getElementsByClassName("error-content");
  // for(let e of errors) e.remove();
}
let times = 0;
function loadCounter() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hbGlhZ2EtcGFnZS1jb3VudC5nbGl0Y2gubWUvY291bnRlcj9zaXRlPTxzaXRlPiZrZXk9PGtleT4=").replace(/<site>/g,"config-comparator").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("visitor-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}

function forceParser() {
  //updateOutputText(event);
  setTimeout(()=>{
    $("#yaml_form").submit();
  },100);
}
function updateOutputText(event) {
  $("#yaml_form").submit();
}
function getUpdatedOutputText(data) {
  let obj;
  try{
    obj = JSON.parse(data);
  }catch(e) {
    return;
  }
  let indentationFormat = formats[document.getElementById('output-indentation').value] || formats.default;
  let result = JSON.stringify(obj, null, indentationFormat.space_key);
  return result;
}
toggleDarkmode();