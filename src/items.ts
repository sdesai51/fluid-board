const needle = require('needle');

export async function getWorkItems(auth){
    const url = `https://dev.azure.com/msazure/One/_apis/wit/queries/{query}?api-version=5.1`;
    const params = {name:"Get User Work Items", wiql: "Select [System.Id] From WorkItems Where [Assigned to] = @Me"};
    var options = { headers: { 'content-Type': 'application/json-patch+json', "Authorization": "Bearer " + auth} };
    return new Promise(function (resolve, reject) {
        needle.post(url, params, options, function (err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
}

export function newItems(parsed: any[], currentWorkItems: any[]){
    let itemsToReturn = [];
    for (let i = 0; i < parsed.length; i++) {
        for (let j = 0; i < currentWorkItems.length; j++) {
            if(parsed[i] !== currentWorkItems[j]){
                itemsToReturn.push(parsed[i]);
            }
        }
    }
}