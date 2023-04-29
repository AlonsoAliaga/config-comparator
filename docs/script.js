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
createTableVersion();
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
let t = ["current-config","new-config","appearance","compare-button","f-c-b","d-o-b"];
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
  let schem1 = jsyaml.DEFAULT_SCHEMA;
  reader1.onloadend = function(event) {
    // console.log(`Starting load of ${currentFile.name}`)
    let result = event.target.result;
    // console.log(`Successfully result ${currentFile.name}`)
    //processed1 = result;
    console.log(result);
    /*
    processed1 = jsyaml.load(result, { schem1 });
    console.log(`Successfully loaded ${currentFile.name}`)
    console.log(processed1)
    */
    //if(processed2) processComparator();

    var reader2 = new FileReader();
    let schem2 = jsyaml.DEFAULT_SCHEMA;
    reader1.onloadend = function(event2) {
      // console.log(`Starting load of ${newFile.name}`)
      let result2 = event2.target.result;
      // console.log(`Successfully result ${newFile.name}`)
      //processed2 = result2;
      console.log(result2);
      //processed2 = jsyaml.load(result2, { schem2 });
      //console.log(`Successfully loaded ${newFile.name}`)
      //console.log(processed2)
      if(result) processComparator(result,result2);
    }

    reader1.readAsText(newFile)
  }
  reader1.readAsText(currentFile)
}
function mergeObjects2(obj1, obj2) {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        typeof obj2[key] === "object" &&
        obj2[key] !== null &&
        typeof obj1[key] === "object" &&
        obj1[key] !== null
      ) {
        mergeObjects(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
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
  let fixedYAML = jsyaml.dump(firstToModify,{skipInvalid:true})
  let differenceYAML;
  if(Object.keys(difference).length === 0) {
    differenceYAML = "#We couldn't find any missing option. Your config is up-to-date!";
  }else{
    differenceYAML = jsyaml.dump(difference,{skipInvalid:true})
  }
  document.getElementById("output-fixed").innerText = fixedYAML;
  document.getElementById("output-differences").innerText = differenceYAML;
  // console.log(fixedYAML);
  // console.log(differenceYAML);
  //console.log(YAML)
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
  console.log(evt.target.id)
  clearResults();
  processed1 = undefined;
  processed2 = undefined;
  document.getElementById("output-fixed").innerText = "Loading..";
  document.getElementById("output-differences").innerText = "Loading..";
  if(typeof file == "undefined") {
    let f = document.getElementById(evt.target.id);
    if(f) f.value = "";
    alert('Configuration cannot be empty!');
    console.log(`Wrong! File is null: '${file.name}'`);
    return;
  }
  if(!file.name.endsWith(".yml")) {
    let f = document.getElementById(evt.target.id);
    if(f) f.value = "";
    alert('Configuration must be a valid yaml file!');
    console.log(`Wrong! File type not allowed: '${file.name}'`);
    return;
  }
}
function processData(result) {
  let errorFull = document.getElementById("error-full");
  if(errorFull) {
    let allowed = [];
    for(let errorType of Object.keys(errorsFormat)) {
      let option = document.getElementById(`${errorType}-option`);
      if(option && option.checked) allowed.push(errorType);
    }
    errorFull.style.display = "block";
    let totalErrors = getErrors(result);
    let totalErrorsSize = totalErrors.size;
    totalErrors = new Map([...totalErrors].filter(([key,value])=>allowed.includes(value.type)));
    let filteredErrorsSize = totalErrorsSize - totalErrors.size;
    if(totalErrors.size == 0) {
      let divError = document.createElement("div");
      divError.classList.add("error-content","no-errors");
      divError.setAttribute("align-text","center")
      let p = document.createElement("p");
      p.innerHTML = `NO ERRORS FOUND IN YOUR .log FILE!${filteredErrorsSize > 0?`<br>Ignored errors: ${filteredErrorsSize}`:``}`
      divError.append(p);
      errorFull.append(divError);
    }else{
      let divErrorH = document.createElement("div");
      divErrorH.classList.add("error-content","error-header");
      divErrorH.setAttribute("align-text","center")
      let pH = document.createElement("p");
      pH.innerHTML = `Errors found: ${totalErrors.size}${filteredErrorsSize > 0?`<br>Ignored errors: ${filteredErrorsSize}`:``}`
      divErrorH.append(pH);
      errorFull.append(divErrorH);
      for(let [index,error] of totalErrors) {
        let type = error.type;
        if(type == "MissingDependency") {
          let divError = document.createElement("div");
          divError.classList.add("error-content","error-yellow");
          divError.setAttribute("align-text","left")
          let p = document.createElement("p");
          p.innerHTML = `${error.message}`
          divError.append(p);
          errorFull.append(divError);
        }else if(type == "CouldNotPassEvent") {
          let divError = document.createElement("div");
          divError.classList.add("error-content","error-red");
          divError.setAttribute("align-text","left")
          let p = document.createElement("p");
          p.innerHTML = `${error.message}`
          divError.append(p);
          errorFull.append(divError);
        }else if(type == "CannotTranslateNull") {
          let divError = document.createElement("div");
          divError.classList.add("error-content","error-red");
          divError.setAttribute("align-text","left")
          let p = document.createElement("p");
          p.innerHTML = `${error.message}`
          divError.append(p);
          errorFull.append(divError);
        }
      }
      /*
      for(let [type,errors] of totalErrors) {
        for(let [pluginName,error] of errors) {
          if(type == "MissingDependency") {
            let divError = document.createElement("div");
            divError.classList.add("error-content","error-yellow");
            divError.setAttribute("align-text","left")
            let p = document.createElement("p");
            p.innerHTML = `${error.message}`
            divError.append(p);
            errorFull.append(divError);
          }else if(type == "CouldNotPassEvent") {
            let divError = document.createElement("div");
            divError.classList.add("error-content","error-red");
            divError.setAttribute("align-text","left")
            let p = document.createElement("p");
            p.innerHTML = `${error.message}`
            divError.append(p);
            errorFull.append(divError);
          }else if(type == "CannotTranslateNull") {
            let divError = document.createElement("div");
            divError.classList.add("error-content","error-red");
            divError.setAttribute("align-text","left")
            let p = document.createElement("p");
            p.innerHTML = `${error.message}`
            divError.append(p);
            errorFull.append(divError);
          }
        }
      }
      */
    }
  }
}
function getErrors(result) {
  //console.log(result);
  let errors = new Map();
  for(let errorIdentifier of Object.keys(errorsFormat)) {
    console.log(`Checking for ${errorIdentifier}..`);
    if(errorIdentifier == "MissingDependency") {
      let errorformat = errorsFormat[errorIdentifier];
      let matchs = result.match(errorformat.regex);
      if(matchs) {
        for(let match of matchs) {
          let index = result.indexOf(match);
          if(errors.has(index)) {
            console.log(`Duplicated error index: ${index} | ${errorIdentifier} | ${match}`);
            continue;
          }
          let nameMatcher = match.match(/Could not load 'plugins\/([A-z0-9.-]+)\.jar' in folder /g);
          let dependenciesMatcher = match.match(/org\.bukkit\.plugin\.UnknownDependencyException: Unknown\/missing dependency plugins: \[([^']+)\]. Please/g);
          let pluginNameMatcher = match.match(/Please download and install these plugins to run '([^']+)'\./g);
          let jarName = nameMatcher[0].replace(/Could not load 'plugins\//g,"").replace(/\.jar' in folder /g,"") + ".jar";
          let dependencies = dependenciesMatcher[0].replace(/org\.bukkit\.plugin\.UnknownDependencyException: Unknown\/missing dependency plugins: /g,"").slice(0, -8);
          let pluginName = pluginNameMatcher[0].replace(/Please download and install these plugins to run '/g,"").slice(0,-2);
          // if(!errors.has(errorIdentifier)) {
          //   errors.set(errorIdentifier,new Map());
          // }
          // let map = errors.get(errorIdentifier);
          // let error = {
          //   message: `Failed to install <strong>${pluginName}</strong> (File: ${jarName})<br>
          //   Couldn't install ${jarName} plugin due to missing dependencies: ${dependencies}`
          // }
          // map.set(pluginName,error)
          let error = {
            type: errorIdentifier,
            message: `Failed to install <strong>${pluginName}</strong> (File: ${jarName})<br>
            Couldn't install ${jarName} plugin due to missing dependencies: ${dependencies}`
          }
          errors.set(index,error)
        }
      }
    }else if(errorIdentifier == "CouldNotPassEvent") {
      console.log(`Checking for ${errorIdentifier}..`);
      let errorformat = errorsFormat[errorIdentifier];
      let matchs = result.match(errorformat.regex);
      //console.log(errorformat.regex);
      //console.log(matchs);
      if(matchs) {
        for(let match of matchs) {
          let index = result.indexOf(match);
          if(errors.has(index)) {
            console.log(`Duplicated error index: ${index} | ${errorIdentifier} | ${match}`);
            continue;
          }
          let left = match.replace(/Could not pass event /g,"");
          let eventName = left.split(" ")[0];
          left = left.slice(eventName.length).trim().slice(3);
          let pluginName = left.split(" ")[0];
          let version = left.split(" ")[1];
          // if(!errors.has(errorIdentifier)) {
          //   errors.set(errorIdentifier,new Map());
          // }
          // let map = errors.get(errorIdentifier);
          // let error = {
          //   message: `Plugin <strong>${pluginName}</strong> (${version}) threw an exception!<br>
          //   Error when passing event '${eventName}'. Contact the developer so he can fix this issue!`
          // }
          // map.set(pluginName,error)
          let error = {
            type: errorIdentifier,
            message: `Plugin <strong>${pluginName}</strong> (${version}) threw an exception!<br>
            Error when passing event '${eventName}'. Contact the developer so he can fix this issue!`
          }
          errors.set(index,error)
        }
      }
    }else if(errorIdentifier == "ErrorWhileEnablingCannotTranslateNull") {
      console.log(`Checking for ${errorIdentifier}..`);
      let errorformat = errorsFormat[errorIdentifier];
      let matchs = result.match(errorformat.regex);
      //console.log(errorformat.regex);
      //console.log(matchs);
      if(matchs) {
        for(let match of matchs) {
          let index = result.indexOf(match);
          if(errors.has(index)) {
            console.log(`Duplicated error index: ${index} | ${errorIdentifier} | ${match}`);
            continue;
          }
          let left = match.replace(/Could not pass event /g,"");
          let eventName = left.split(" ")[0];
          left = left.slice(eventName.length).trim().slice(3);
          let pluginName = left.split(" ")[0];
          let version = left.split(" ")[1];
          // if(!errors.has(errorIdentifier)) {
          //   errors.set(errorIdentifier,new Map());
          // }
          // let map = errors.get(errorIdentifier);
          // let error = {
          //   message: `Plugin <strong>${pluginName}</strong> (${version}) threw an exception!<br>
          //   Error when passing event '${eventName}'. Contact the developer so he can fix this issue!`
          // }
          // map.set(pluginName,error)
          let error = {
            type: errorIdentifier,
            message: `Plugin <strong>${pluginName}</strong> (${version}) threw an exception!<br>
            Error when passing event '${eventName}'. Contact the developer so he can fix this issue!`
          }
          errors.set(index,error)
        }
      }
    }else if(errorIdentifier == "CannotTranslateNull") {
      console.log(`Checking for ${errorIdentifier}..`);
      let errorformat = errorsFormat[errorIdentifier];
      let matchs = result.match(errorformat.regex);
      //console.log(matchs);
      if(matchs) {
        for(let match of matchs) {
          let index = result.indexOf(match);
          if(errors.has(index)) {
            console.log(`Duplicated error index: ${index} | ${errorIdentifier} | ${match}`);
            continue;
          }
          let first = match.match(errorformat.first);
          let left = match.replace(first[0],"");
          //console.log(left)
          let packageMatcher = left.match(errorformat.package);
          let package = packageMatcher[0];
          //console.log(package)
          let clazz = package.match(errorformat.class)[0].slice(0,-1);
          //console.log(clazz)
          let method = package.replace(clazz,"");
          let clazzAndLine = method.match(errorformat.classAndLine)[0]
          method = method.replace(clazzAndLine,"").slice(1);;
          let jarLocation = left.replace(package,"").trim();
          let line = clazzAndLine.match(/\.java\:[\d?]+/g)[0].slice(6);
          let jarName = jarLocation.replace(/\.jar\:[\d?]+/g,"").slice(2,-1);
          // if(!errors.has(errorIdentifier)) {
          //   errors.set(errorIdentifier,new Map());
          // }
          // let map = errors.get(errorIdentifier);
          // let error = {
          //   message: `Plugin <strong>${pluginName}</strong> (${version}) threw an exception!<br>
          //   Error when passing event '${eventName}'. Contact the developer so he can fix this issue!`
          // }
          // map.set(pluginName,error)
          let error = {
            type: errorIdentifier,
            message: `A plugin threw an exception while translating colors!<br>
            Class error: ${clazz}<br>
            Method error: ${method}<br>
            Line error: ${line}<br>
            File name: ${jarName}.jar<br>
            <span style="font-weight: bold;color: #a30a00;font-size: 19px">⚠️ Warning: ⚠️</span><br>
            If plugin was working fine before you edited any .yml file to customize, then YOU REMOVED something from it!<br>
            We highly suggest you to reinstall the plugin and be careful when editing stuff or contact the developer.`
          }
          errors.set(index,error)
        }
      }
    }
  }
  // const sortNumAsc = new Map([...errors].sort((a, b) => a[0] - b[0]));
  const sortNumAsc = new Map([...errors].sort());
  return sortNumAsc;
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