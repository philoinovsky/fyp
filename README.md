# Final Year Project
## Structure
express.js + pug html template + truffle suite
## Run Project
under ./project
```
npm start
```
### Common Error
- port was already running
```
$ netstat -pantu | grep 3000
tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      53062/node
$ kill 53062
```