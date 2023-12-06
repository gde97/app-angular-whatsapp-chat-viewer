# WHATSAPP CHAT VIEWER - FRONTEND

## PART 2 OF THIS APP

Made with Angular CLI, Angular Material.

Developed with VS Code.

## Description

This app is for the need to save all old chat exported from whatsapp
in a database to allow apps to retrieve all data much easier than a txt file.

It's possible to have:
- different users
- infinite chat for user with different names
- infinite messages for a chat
- know if is present the attachment and its name

### To do in Angular
- export chats
- manage user profile

## Requirements

|             | I used this version |
| ----------- | ------------------- |
| node.js     | 18.10.0             |
| angular CLI | 16.2.8              |

In this page [Version compatibility](https://angular.io/guide/versions) there are all requirements for a specific version of Angular.

### To install a specific version of Node.js

In this page [Node.js dist](https://nodejs.org/dist/) there are all versions.
Choose the right version for Angular and for your OS.

### To install a specific version of Angular CLI

```bash
npm install -g  @angular/cli@(version number)
#example
npm install -g  @angular/cli@16.2.8
```

If you are on Windows with PowerShell, to allow use of ng commands you have to execute the command:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Usage

### Before everithing

In the folder
Install all dependency with the command

```bash
npm install
```

### Development server

Run the dev server.

```bash
ng serve
```

When it starts open automatically the browser, if you want you can navigate to `http://localhost:4200/`.

The application will automatically reload if you change any of the source files in forlder src/.

### Build

To build the project run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.
