const https = require('https');
// Data : Fake data from JSON placeholder
// (API URL, callbacks to handle the HTTP response) 
let request = https.get('https://jsonplaceholder.typicode.com/users?_limit=2',(res)=>{
    if(res.statusCode !== 200){
        console.error(`Error : ${res.statusCode}`);
        res.resume(); // ignore the stream data => quick for discard data than used garbage collection
        return;
    }
    else{
        let data = ''; // store the data array
        // Create event listener => stream the data HTTP response in chunks
        // => ketika response object emit a data event => store the data in data variable
        res.on('data', (chunk)=>{
            data += chunk;
        });
        // End event, ketika semua data terbaca dengan parse JSON string stored in data
        res.on('end', ()=>{
            console.log(`Retrieve Data : ${data}`);
            console.log(JSON.parse(data));
        });
    }
});

request.on('error', (err)=>{
    console.error(`Encountered an error trying to make a request:${err.message}`);
});