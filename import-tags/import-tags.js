let fs = require("fs");

//const jsonObjectOrigin = JSON.parse(fs.readFileSync('./import-tags/tags_flat.json', 'utf8'));
const tagInstancesOrigin = JSON.parse(fs.readFileSync('./import-tags/tags_flat.json', 'utf8'));

//mapping to tagInstances-result.json file.
const tagInstancesResult = tagInstancesOrigin.map( item => {
    const container ={};
    container["name"] = item.tag;
    container["caseID"] = item.id;
    container["parentTagID"] = "";
    container["dateCreated"] = "";
    container["Author"] = "";
    //console.log("File: tagInstances-result.json created");
    return container;
})

//mapping to tags-result.json file.

var tagsLookup = {};
var tagItems = tagInstancesOrigin;
var tagsResult = [];

for (var item, i = 0; item = tagItems[i++];) {
  var tagName = item.tag;

  if (!(tagName in tagsLookup)) {
    tagsLookup[tagName] = 1;
    let jsonItem = {"name": tagName, "id": ""};
    //tagsResult.push(tagName);
    tagsResult.push(jsonItem);
  }
}

fs.writeFile("./import-tags/tags-result.json", JSON.stringify(tagsResult, null, 4), (err) =>{
    if (err) {
        console.error("Files => tags-result.json: " + err);
        return;
    }
    console.log("Files => tags-result.json: created");
})
//End mapping.

//fs.writeFile("./import-tags/result-tags.json", JSON.stringify(jsonObjectOrigin, null, 4), (err) =>{
fs.writeFile("./import-tags/tagInstances-result.json", JSON.stringify(tagInstancesResult, null, 4), (err) =>{
    if (err) {
        console.error("Files => tagInstances-result.json: " + err);
        return;
    }
    console.log("Files => tagInstances-result.json: created");
})


console.log("Done!");


