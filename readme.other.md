# Other

## Fix IDEA file watching

1. Add the following line to either /etc/sysctl.conf file or a new *.conf file (e.g. idea.conf) under /etc/sysctl.d/ directory:
```bash
fs.inotify.max_user_watches = 524288
```

2. Then run this command to apply the change:
```bash
$ sudo sysctl -p --system
```

And don't forget to restart your IDE. \
Note: the watches limit is per-account setting. If there are other programs running under the same account which also uses Inotify the limit should be raised high enough to suit needs of all of them.

## Icons
https://www.favicon-generator.org/
https://material-ui.com/components/material-icons/
https://www.flaticon.com/authors/detailed-flat-circular/flat
https://material.io/resources/icons/?style=baseline
https://materialdesignicons.com/


## NPM packages

npm-check-updates
```bash
$ [sudo] npm i -g npm-check-updates
$ ncu [-u]
// OR
$ npx npm-check-updates [-u]
```

npm check updates
```bash
$ npm outdated
```

depcheck
```bash
$ [sudo] npm i -g depcheck
$ depcheck
```

## How to download backup

Execute this from your local machine:

Download:
```bash
$ scp deploy@188.166.70.236:~/<file-name>.zip ~/<file-name>.zip
$ scp -r deploy@188.166.70.236:~/<folder-name> ~/<folder-name>
```

Upload:
```bash
$ scp /path/to/file username@servername/ip:/destination/folder/
```

## Watch/repeat

```bash
$ nohup watch -n 3600 ./make-db-dump.sh & // make back up every one hour
```
