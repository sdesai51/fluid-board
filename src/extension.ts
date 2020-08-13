// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const needle = require('needle');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let userAuth = undefined;


export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "fluidboard" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('fluidboard.writeItems', () => {
		// The code you place here will be executed every time your command is executed

		if (userAuth === undefined) {
			userAuth = auth();
		}
		let messages: String[] = parse();
		writeToBoard(messages);
		// Display a message box to the user
		//parse();

	});

	context.subscriptions.push(disposable);
}

async function auth() {
	var appID = "CD853C2F-4328-40F1-8FCC-F458B9803D14";
	var state = "1234";
	var scope = "vso.work_full";
	var callback = "https://blz.tools/devops";
	var uri = `https://app.vssps.visualstudio.com/oauth2/authorize?client_id=${appID}&response_type=Assertion&state=${state}&scope=${scope}&redirect_uri=${callback}`;
	vscode.env.openExternal(vscode.Uri.parse(uri));
	await vscode.window.showInformationMessage('Please Sign in', "Login With DevOps");
	let ac = await getAC();
	//let ac = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJhdWkiOiI5ZjIwZjZhZi0yN2YzLTRiZmMtYTY0Mi01MGMxNzk2ZDgwN2YiLCJuYW1laWQiOiJmMjMzMGEyOC0yZDNkLTY2MjYtYWRhYi0wMmVlYmVmMDJlNzQiLCJzY3AiOiJ2c28ud29ya19mdWxsIHZzby5hdXRob3JpemF0aW9uX2dyYW50IiwiaXNzIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsImF1ZCI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJuYmYiOjE1OTY3NDQ0MjMsImV4cCI6MTU5Njc0NTMyM30.rgt9BGVPyu6KdHJlcBG_A_Vr-2FwMAfp3SPEObWcsJ6IaokI18Itg5SjQdjbq2rfOPtQoza-IW_Kv3pMFQc47dcbcbr_q7pqgFSCHoevNCMl2aSxD3gX-voe2mvbx5eW-VzEL6tFaPs_vb6k1czZFrmfafQUFscyFkRX-FN4Y9w4tcXHfl8edpECzo6sfTCzAi3v18inq3q_z7Pc2iBG0gariOM2JgmizLOWvuD-HkrK77rZvH6dWA-16UcoiLVj7Li0Bz21E-5Qfvul_cj3D_YCjREbg6GdjH_PUKpumm8Z51WPYuLPKcNdIf6w7iTsy_1tOB9gdpvJGNzpgyhrfQ';
	//return ac;
	if (ac) { return await azAuth(ac); }
	else {
		return undefined;
	}
}

async function getAC() {
	return new Promise(function (resolve, reject) {
		let ac = vscode.window.showInputBox({ value: "Enter Auth Code", placeHolder: 'code from external browser' });
		resolve(ac);
	});
}

function azAuth(ac) {
	const URL = `https://fluidboarduth.azurewebsites.net/api/AuthTrigger?code=iBzUGALjVu8BqF8%2F9jQFhRm9nH6tM8bjy4DcqeMWO42gjfbdxPyXRw%3D%3D&auth=${ac}`;
	console.log(ac);
	console.log(URL);
	return new Promise(function (resolve, reject) {
		needle.get(URL, function (err, res) {
			if (err) reject(err);
			resolve(res.body);
		});
	});
}

function parse(): String[] {
	if (vscode.window.activeTextEditor === undefined) {
		console.log("Cant Find Editor");
	}
	else {
		var currentUri = vscode.window.activeTextEditor.document.uri;
		vscode.workspace.openTextDocument(currentUri).then((document) => {
			let msgs = [];
			let text = document.getText().split('\n');
			for (var i = 0; i < text.length; i++) {
				let loc = text[i].indexOf('[bug]');
				if (loc !== -1) {
					let msg = text[i].substring(loc);
					console.log(msg);
					msgs.push(msg);
				}
			}
			return msgs;
		});
		//Then parse for comments

	}
	return [];
}

function writeToBoard(msgs: String[]) {
	vscode.window.showInformationMessage('Create Work Item', ...['Create'])
		.then(selection => {
			console.log("creating work item");
			console.log(createWorkItem());
			vscode.window.showInformationMessage('Created Work Item');
		});

}

function createWorkItem() {
	//Params is a sample body for the POST request 
	let params = {
		from: null,
		op: "add",
		path: "One/CSCP/Teams/Stratus",
		value: "Sample task"
	};
	let project: String = "One";
	let organization: String = "msazure";
	let type: String = "Task";
	const url = `https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/${type}?api-version=5.1`;
	const needle = require('needle');
	var options = { headers: { 'content-Type': 'application/json' } };
	return new Promise(function (resolve, reject) {
		needle.post(url, params, options, function (err, res) {
			if (err) reject(err);
			resolve(res);
		});
	});
}
