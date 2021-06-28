# \<Project name\>

## Installation

1. install nodejs (node v14.x+npm v6.x or node v16.x+npm v7.x) for your platform
2. go to project's directory
3. run `npm i` or `npm i --legacy-peer-deps`


## Dev mode

1. make installation
2. do to project's directory
3. run `npm start`


### NPM packages

npm-check-updates
```bash
$ [sudo] npm i -g npm-check-updates
$ ncu [-u]
```

depcheck
```bash
$ [sudo] npm i -g depcheck
$ depcheck
```

### Nginx

Run
```
$ /usr/bin/nginx [-t] [-c ~/my-nginx.conf] [-g "daemon off;"]
```

`-t` - Don’t run, just test the configuration file. NGINX checks configuration for correct syntax and then try to open files referred in configuration.
`-c` - Specify which configuration file NGINX should use instead of the default.
`-g "daemon off;"` - do not exit from terminal

```
$ sudo nginx -s stop
```

```
$ sudo nginx -s reload
```

### Docker

Build
```
$ docker build -t project-name:0.0.1 .
```

`-t` - add project name

Run
```
docker run [-d] -p "8080:9090" project-name:0.0.1
```
Use key `-d` to exit from terminal without stop server\image

8080 - your local port to open app

9090 - server's port of app

Image list
```
$ docker image ls
```

Running images
```
$ docker ps
```

Stop image, get image name from `$ docker ps`
```
$ docker stop <CONTAINER ID>
```

Remove image
```
$ docker image rm -f <image id>
```


### Autotests

Required libraries:
1. mocha
1. ts-mocha
2. @types/mocha
3. puppeteer
4. @types/puppeteer
5*. mochawesome

Running example:
```
$ ts-mocha --timeout 10000 -p ./tsconfig.test.json ./test/*
```

Use reporter
```
npm i mochawesome
$ ts-mocha --timeout 10000 -p ./tsconfig.test.json ./test/* --reporter mochawesome --reporter-options reportDir=customReportDir,reportFilename=customReportFilename
```
