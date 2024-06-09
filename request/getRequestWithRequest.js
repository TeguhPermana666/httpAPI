const https = require('https');

const options = { // key to adapting to their differing requirements
    host: 'jsonplaceholder.typicode.com', // domain name or ip
    path: '/users?_limit=2', // come after domain name (include:query param )
    method: 'GET',
    headers:{ // specific type data the user can handle
        'Content-Type': 'application/json'
    }
}

let request = https.request(options, (res)=>{
    if (res.statusCode !== 200){
        console.error(`Error : ${res.statusCode}`);
        res.resume();
        return;
    }
    else{
        let data = '';
        res.on('data', (chunk)=>{
            data += chunk;
        });
        res.on('end', ()=>{
            console.log(`Retrieve Data : ${data}`);
            console.log(JSON.parse(data));
        });
    }
});

request.end().on('error', (err)=>{
    console.error(`Encountered an error trying to make a request:${err.message}`);
});