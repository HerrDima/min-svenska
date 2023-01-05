## PM2
```bash
$ sudo npm i -g pm2 \
$ sudo pm2 start ./run-server.sh --name server // start process with name 'server' \
$ pm2 monit // show current state \
$ pm2 kill // kill 'em all!
```

## Run server
```bash
$ npm run front:build
$ npm run back:build
$ npm run back:start
```

## Nginx

Run
```bash
$ /usr/bin/nginx [-t] [-c ~/my-nginx.conf] [-g "daemon off;"]
```

`-t` - Don’t run, just test the configuration file. NGINX checks configuration for correct syntax and then try to open files referred in configuration.
`-c` - Specify which configuration file NGINX should use instead of the default.
`-g "daemon off;"` - do not exit from terminal

```bash
$ sudo nginx -s stop
```

```bash
$ sudo nginx -s reload
```

## Docker

Install docker
```bash
$ sudo apt-get install ca-certificates curl gnupg lsb-release
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Remove\uninstall docker
```bash
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

Build
```bash
$ docker build -t project-name:0.0.1 .
```
`-t` - add project name

Run
```bash
$ docker run -it [-d] -p "8080:9090" project-name:0.0.1
```
Use key `-d` to exit from terminal without stop server\image

Use key `-it` to exit from terminal by ctrl+C

8080 - your local port to open app

9090 - server's port of app

Run with external folders
```bash
sudo docker run -it -v /home/storage/static-file:/usr/app/static-file -v /home/storage/db:/usr/app/db -p "8080:9191" project-name:0.0.1
```

Image list
```bash
$ docker image ls
```

Running images
```bash
$ docker ps
```

Stop image, get image name from `$ docker ps`
```bash
$ docker stop <CONTAINER ID>
```

Remove image
```bash
$ docker image rm -f <image id>
```

## Docker compose
Build
```bash
sudo docker-compose build
```

Use key `-d` to exit from terminal without stop server\image
```bash
sudo docker-compose up [-d]
```

Stop docker compose
```bash
sudo docker-compose down
```

## Monitoring, ctop

```bash
docker run --rm -ti --name=ctop --volume /var/run/docker.sock:/var/run/docker.sock:ro quay.io/vektorlab/ctop:latest -a
```

## K8s
1 - install `minikube` - https://minikube.sigs.k8s.io/docs/start/
2 - install `kubectl`
3 - `$ minikube start` - start minikube
4 - `kubectl apply -f ./pod.yml` - apply/run a pod.yml config
5 - `kubectl port-forward pod/my-site 9191:8080` - forward ports
6 - add your own image
- 6.1 Set the environment variables with eval $(minikube docker-env)
- 6.2 Build the image with the Docker daemon of Minikube (eg docker build -t my-image .)
- 6.3 Set the image in the pod spec like the build tag (eg my-image)
- 6.4 Set the imagePullPolicy to Never, otherwise Kubernetes will try to download the image.
