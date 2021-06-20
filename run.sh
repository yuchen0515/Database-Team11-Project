baseDir=$(pwd);
frontendDir=${baseDir}/vue-js-client-crud/;
backendDir=${baseDir}/node-js/;

$(cd ${frontendDir} ; npm install ; npm run serve;) & $(cd ${backendDir} ; npm install ; node server.js);
