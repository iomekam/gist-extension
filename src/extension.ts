// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import OctokitClient from './oktokit';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('gist-uploader.createGist', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active text editor found");
      return;
    }

    const selection = editor.selection;
    let highlightedText = "";
    if (!selection.isEmpty) {
      highlightedText = editor.document.getText(selection);
    }

    const description = await vscode.window.showInputBox({
      prompt: "Enter a description for your Gist"
    }) || "";

    const octokitClient = new OctokitClient();

    try {
      const gist = await octokitClient.createGist(
				highlightedText || editor.document.getText(),
        description,
        true);
      vscode.env.clipboard.writeText(gist.html_url);
      vscode.window.showInformationMessage(`Gist created: ${gist.html_url} (URL copied to clipboard)`);
    } catch (error) {
      vscode.window.showErrorMessage(`Error creating Gist`);
    }
  });

  context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
export function deactivate() {}
