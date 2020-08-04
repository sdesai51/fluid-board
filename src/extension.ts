// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	if(vscode.window.activeTextEditor === undefined){

	}
	else{
		var currentUri = vscode.window.activeTextEditor.document.uri;
		vscode.workspace.openTextDocument(currentUri).then((document) => {
			let text = document.getText();
		  });
		  //Then parse for comments
		vscode.window.showInformationMessage('Create Work Item', ...['Create'])
		.then(selection => {
			var appID = "CD853C2F-4328-40F1-8FCC-F458B9803D14";
			var state = "1234";
			var scope = "vso.work_full";
			var callback = "https://blz.tools/devops";
			var uri = `https://app.vssps.visualstudio.com/oauth2/authorize?client_id=${appID}&response_type=Assertion&state=${state}&scope=${scope}&redirect_uri=${callback}`;
			console.log(uri);
			vscode.env.openExternal(vscode.Uri.parse(uri));
		});

	}
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fluidboard" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('fluidboard.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from FluidBoard!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
