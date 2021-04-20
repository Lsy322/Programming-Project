var request = require("request");
const prefix = "auth0|"

module.exports = {
    getToken : () =>{

        return new Promise(function (resolve,reject){
            var options = { method: 'POST',
            url: 'https://dev-1ksx3uq3.us.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: '{"client_id":"BdIdNXziWgcAJcVKchqH6uvuxhx5Gi3R","client_secret":"1e57081D2ktIty8o5zEAv9s38Vb788Z3fAxLbHuGGQAdimnKWURMlSR75Xg2_3Xx","audience":"https://dev-1ksx3uq3.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };
          
          request(options, function (error, response, body) {
            if (error) {
                reject(error)
            }else{
                resolve(JSON.parse(body))
            }
          });
        })  
    },

    Singlefetch : (fetchId, TOKEN, METHOD, URL) =>{
        return new Promise(function (resolve,reject){
            var element = fetchId
            if (element.indexOf(prefix) == -1){
                 element = prefix + fetchId
            }
            var options = { method: METHOD,
            url: URL + element,
            headers: { 'authorization':'Bearer ' + TOKEN , 'content-type': 'application/json' },
            body: {},
            json:true};
        
            request(options, function (error, response, body) {
            if (error) {
                reject(error)
            }else{
                resolve(body)
            }
            }) 
        })
    },
    
    SinglefetchWithdata : (fetchId, TOKEN, METHOD, URL, DATA) =>{
        return new Promise(function (resolve,reject){
            var element = fetchId
            if (element.indexOf(prefix) == -1){
                 element = prefix + fetchId
            }
            var options = { method: METHOD,
            url: URL + element,
            headers: { 'authorization':'Bearer ' + TOKEN, 'content-type': 'application/json' },
            body: DATA,
            json:true};
        
            request(options, function (error, response, body) {
            if (error) {
                reject(error)
            }else{
                resolve(body)
            }
            }) 
        })
    },
    Mutifetch : (IdArray, TOKEN, METHOD, URL) =>{
        var fetchedArray = []
        return new Promise(function (resolve,reject){
            for (let index = 0; index < IdArray.length; index++) {
                var element = IdArray[index];
                if (element.indexOf(prefix) == -1){
                    element = prefix + element
                }
                var options = { method: METHOD,
                url: URL + element,
                headers: { 'authorization':'Bearer ' + TOKEN, 'content-type': 'application/json' },
                body: {},
                json:true};
        
                request(options, function (error, response, body) {
                if (error) {
                    reject(error)
                }else{
                    fetchedArray.push(body)
                    if (fetchedArray.length == IdArray.length){
                        resolve(fetchedArray)
                    }
                }
                }) 
            } 
        })
    }
} 
