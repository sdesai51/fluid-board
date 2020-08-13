# fluidboard README


## Fluidboard Extension Description 

This extension redirects the its user to a 404 URL which contains a code = parameter which must be copied into the extension on prompting the user to login w/ DevOps (oAuth2 process for authentication). The login attempt then creates a POST request to an Azure Function which retrieves the user's access token and communicates it to the client side of the application to validate the creation of Work Items in a new POST request. Lastly, a certain number of work items are created using a POST request to Azure DevOps (determined by the number of times [bug] is included in the project file).

## Steps to Test Extension Development

1. Open the extension project files 
2. Click F5 to open the development test environment
3. Press Ctrl-Shift-P to open the Command Palette
4. Run the Write Items command (activation event for extension)
5. Copy the code from the redirect URL
6. Click "Log in with DevOps" when prompted to sign in and paste the code (serves as authentication code) copied from browser
7. Work items are created using Azure DevOps -> [this step is still in development]




