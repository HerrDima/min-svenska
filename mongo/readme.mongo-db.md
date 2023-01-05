### MongoDB

1. Install or download mongodb

1.1 Install, mongodb 4.2

```bash
$ [sudo] apt update && sudo apt install gnupg -y
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
$ [sudo] apt update
$ [sudo] apt install mongodb-org
```

1.2 Remove
```bash
$ [sudo] apt-get remove --purge mongodb
$ [sudo] apt-get autoremove --purge mongodb

$ [sudo] service mongod stop
$ [sudo] apt-get purge mongodb-org*
$ [sudo] rm -r /var/log/mongodb
$ [sudo] rm -r /var/lib/mongodb
```

2. Mongodb \
2.1. Run

```bash
$ ~/soft/mongo/bin/mongod --config ./mongodb.config
```

2.2. Stop mongodb

```bash
$ ps -e | grep -i mongod // 24409 ttys000 0:00.00 grep mongod
$ kill <PID>
```

2.3. Make backup
```bash
$ ~/soft/mongo/bin/mongodump --port=27001 --db=main-db --archive=db-dump/db-dump-`date +%Y-%m-%d-%H-%M-%S`.zip
```

or
```bash
$ ~/soft/mongo/bin/mongodump --port=27001 --out=db/backup/001 --db=main-db
```

2.4. Restore backup

Clean folder db/data if needed.

```bash
$ ~/soft/mongo/bin/mongorestore --port=27001 --db=main-db --archive=db/back-0001.zip
```

or

```bash
$ ~/soft/mongo/bin/mongorestore db/backup/001 --port=27001 --db=main-db
```

2.5. Some commands in mongodb console/client (~/soft/mongo/bin/mongo):
```bash
$ ~/soft/mongo/bin/mongo --port=27001 --host=127.0.0.1 // run client
$ show databases // show all data bases name
$ use <data base name> // switched to db <data base name>
$ show collections // show all collection in current db
$ db.getCollectionNames() // the same: show collections
$ db.<collection name>.find() // show all documents of collection
$ db.shutdownServer() // shutdown server
$ db.<collection name>.stats() // show collection info
```

### DB replication

```bash
$ mongod --config ./mongodb-1.config // primary
> about to fork child process, waiting until server is ready for connections.
> forked process: 22066
> child process started successfully, parent exiting
$ mongod --config ./mongodb-2.config  // arbiter
$ mongod --config ./mongodb-3.config  // slave
$ mongod --config ./mongodb-4.config  // slave


$ mongo --port 27001
> MongoDB shell version v4.2.0
> connecting to: mongodb://127.0.0.1:27001/?compressors=disabled&gssapiServiceName=mongodb
> Implicit session: session { "id" : UUID("11c98e9f-aff2-41f8-80cf-a7c0f06b40a4") }
> MongoDB server version: 4.2.0

rs.status()

rs.initiate({"_id" : "MyBestReplica", members : [{"_id" : 0, priority : 3, host : "127.0.0.1:27001"}, {"_id" : 1, host : "127.0.0.1:27002", arbiterOnly : true}, {"_id" : 2, host : "127.0.0.1:27003"}, {"_id" : 3, host : "127.0.0.1:27004"} ]});
```

### DB search
No indexed needed (recommended)
```bash
db.<collection name>.find({ <property name>: /some reg exp/i }) // db.document.find({ content: /лиса/i })
```

Another way
```bash
db.<collection name>.createIndex( { <property name>: "text" } ) // db.document.createIndex( { title: "text", slug: "text" } )
db.<collection name>.find( { $text: { $search: "Some text" } } ) // will found in all indexed properties
```

```bash
{
  $text:
    {
      $search: <string>,
      $language: <string>,
      $caseSensitive: <boolean>,
      $diacriticSensitive: <boolean>
    }
}
```

Monitoring

To enable free monitoring, run the following command:
```bash
db.enableFreeMonitoring()
```

To permanently disable this reminder, run the following command:
```bash
db.disableFreeMonitoring()
```
