const getMeta = (url, code, callback) =>{
    let myHeaders = new Headers();
    myHeaders.append("Authorization", 'Basic ' + btoa(code + ":"));

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => callback(result))
    .catch(error => console.log('error', error));
}
const getData = (code, url, callback) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", 'Basic ' + btoa(code + ":"));

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url + "/commits?per_page=100", requestOptions)
    .then(response => response.json())
    .then(result => callback(result))
    .catch(error => console.log('error', error));
}

export {
    getMeta
}