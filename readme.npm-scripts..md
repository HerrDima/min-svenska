# NPM scripts

### front:start-dev
Run webpack and webpack dev-server on 9090

### front:start-dev:transpile-only
The same as `front:start-dev` but without type checking

### front:build
Build front-end, folder is `./dist`

### back:start
Run backend in production mode, i.e. run from built files from `./dist-server/dist/index.js`

### back:build
Build back-end, folder is `./dist-server/dist/index.js`

### back:build:watch
Build back-end and watch into `./server` to rebuild back-end.
Rebuild front if needed.

### back:nodemon
Just nodemon for `./dist-server/dist/index.js`
Rebuild front if needed.

### back:prod:start
Build front and back, after that run back.
All in prod mode.
