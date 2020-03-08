import Swal from 'sweetalert2';

const promptUser = async(setUrl) => {
    const { value: userInput } = await Swal.fire({
        title: 'Enter your {username}/{repo}. For ex: "ryqndev/boba-watch"',
        input: 'text',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        }
    })

    if (userInput){
        let [user, repo] = userInput.split('/');
        setUrl(`https://api.github.com/repos/${user}/${repo}`);
    }
}

const getMeta = (url, code, callback) =>{
    let myHeaders = new Headers();
    // myHeaders.append("Authorization", 'Basic ' + btoa(code));
    myHeaders.append("Authorization", "Basic NzFkMWVjZjZiZDY5ZWZhNGY0NWYzOGFmNDA0MWJjOWI2NzU3ODhjOTo=");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // credentials: 'include',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => callback(result))
    .catch(error => console.log('error at meta', error));
}
const getData = (url, code, callback) => {
    let myHeaders = new Headers();
    // myHeaders.append("Authorization", 'Basic ' + btoa(code));
    myHeaders.append("Authorization", "Basic NzFkMWVjZjZiZDY5ZWZhNGY0NWYzOGFmNDA0MWJjOWI2NzU3ODhjOTo=");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // credentials: 'include',
        redirect: 'follow'
    };

    fetch(url + "/commits?per_page=60", requestOptions)
    .then(response => response.json())
    .then(result => callback(result))
    .catch(error => { console.error(error);
    });
}

const aggregateCommits = async(res, code, setData) => {
    let myHeaders = new Headers();
    // myHeaders.append("Authorization", 'Basic ' + btoa(code));
    myHeaders.append("Authorization", "Basic NzFkMWVjZjZiZDY5ZWZhNGY0NWYzOGFmNDA0MWJjOWI2NzU3ODhjOTo=");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // credentials: 'include',
        redirect: 'follow'
    };
    let commits = await Promise.all(res.map(async(e) => {
        return await fetch(e.url, requestOptions).then(res => res.json());
    }));

    setData(commits);
}

export {
    promptUser,
    getMeta,
    getData,
    aggregateCommits
}