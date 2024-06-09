const https = require('https');

const options = {
    host : 'jsonplaceholder.typicode.com',
    path : '/users/1',
    method : 'PUT',
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    },
};

const request = https.request(options, (res) => {
    if(res.statusCode !== 200){
        console.error(`Error : ${res.statusCode}`);
        res.resume();
        return;
    }
    else{
        let data = '';
        res.on('data', (chunk)=>{
            data += chunk;
        })
        res.on('end', ()=>{
            console.log(`Update Data: ${data}`);
            console.log(JSON.parse(data));
        });
    }
});

const requestData = {
    username: 'digitalocean',
};

request.write(JSON.stringify(requestData));
request.end();

request.on('error', (err)=>{
    console.error(`Encountered an error trying to make a request:${err.message}`);
})
