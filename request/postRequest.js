const https = require('https');

const options = {
    host :'jsonplaceholder.typicode.com',
    path:'/users',
    method:'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    }
}

let request = https.request(options, (res) => {
    if (res.statusCode !== 201){
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
            console.log(`Retrieve Data : ${data}`);
            console.log(JSON.parse(data));
        })
    }
})

const requestData = {
    name: 'Teguh Permana',
    username: 'digitalocean',
    email:'teguhpermana096@gmail.com',
    address:{
        street: 'Jl. Made Bulet',
        city: 'Denpasar',
        zipcode: '12345',
    },
    phone: '081234567890',
    website:'gapunya.com',
    company:{
        name:'DigitalOcean',
        catchPhrase: 'Welcome to the developer cloud',
        bs:'cloud scale security'
    }
};
// request.write() => which accepts a string or buffer object to send along with the request
// JSON.stringfly => convert json to string.
request.write(JSON.stringify(requestData));
request.end(); // no more data to be added to the request and send's it
request.on('error', (err)=>{
    console.error(`Encountered an error trying to make a request:${err.message}`);
});