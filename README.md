# Box Jump

Electron application with a simple game.

## Run the game

```
$ git clone https://github.com/popdemtech/box-jump.git
$ cd box-jump
$ npm install
$ npm run start
```

## Build the standalone app

```
$ npm run make
```

Navigate to the exectuable.
* MacOS: `./out/make/zip/darwin/x64/[filename]`
* Windows: `./out/electron-app-win32-x64/box-jump`

Double-click or in some way activate the executable to run it. Move it to the appropriate Application directory or a place your operating system looks for executables to run like a usual desktop application.

## Development

```
$ git clone https://github.com/popdemtech/box-jump.git
$ cd box-jump
$ npm install
$ npm run start
```

The above commands clone the application boilerplate, change directory to the cloned application, installs application dependencies, and starts a local application respectively.

Alter index.html, main.js, box-jump.js to suite your needs. And, importantly, add new files and libraries to supersize the functionality! Have fun with it.

See the [Electron documentation](https://www.electronjs.org/docs/latest/tutorial/examples) for more.
