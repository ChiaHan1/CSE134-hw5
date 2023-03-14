const postBtn = document.getElementById ('postBtn');
const getBtn = document.getElementById ('getBtn');
const putBtn = document.getElementById ('putBtn');
const deleteBtn = document.getElementById ('deleteBtn');

postBtn.addEventListener ('click', () => {
    sendPost ();
});
getBtn.addEventListener ('click', () => {
    sendGet ()
});
putBtn.addEventListener ('click', () => {
    sendPut ()
});
deleteBtn.addEventListener ('click', () => {
    sendDelete ()
});

async function sendPost () {
    // set date value
    document.getElementById ('date').value = new Date ().toLocaleString ();

    // get form data
    const formData = new FormData (document.querySelector ('form'));

    // endpoint url
    const url = 'https://httpbin.org/post';

    const XMLHttpRequestRadio = document.getElementById ('XMLHttpRequestRadio');
    const fetchRadio = document.getElementById ('fetchRadio');

    // if request type is XMLHttpRequest
    if (XMLHttpRequestRadio.checked) {
        const xhr = new XMLHttpRequest ();
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    const data = JSON.parse (this.responseText);
                    document.getElementById ('response').textContent = `${JSON.stringify (data, null, 2)}`;
                }
                else {
                    console.error ('Error:', this.statusText);
                }
            }
        }
        xhr.open ('POST', url);
        xhr.send (formData);
    }

    // if request type is fetch
    if (fetchRadio.checked) {
        const response = await fetch (url, {
            method: 'POST',
            body: formData,
        });

        if (!(response.ok)) {
            throw new Error('Error fetching response.');
        }
        else {
            const data = await response.json ();
            document.getElementById ('response').textContent = `${JSON.stringify (data, null, 2)}`;
        }
    }
}

async function sendGet () {
    // set date value
    document.getElementById ('date').value = new Date ().toLocaleString ();

    // get form data
    const formData = new FormData (document.querySelector ('form'));

    // endpoint url
    let url = 'https://httpbin.org/get';

    const XMLHttpRequestRadio = document.getElementById ('XMLHttpRequestRadio');
    const fetchRadio = document.getElementById ('fetchRadio');

    // if request type is XMLHttpRequest
    if (XMLHttpRequestRadio.checked) {
        const xhr = new XMLHttpRequest ();
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    const data = JSON.parse (this.responseText);
                    document.getElementById ('response').textContent = `${JSON.stringify (data, null, 2)}`;
                }
                else {
                    console.error ('Error:', this.statusText);
                }
            }
        }
        const params = new URLSearchParams(formData).toString();
        url += `?${params}`;

        xhr.open ('GET', url);
        xhr.send ();
    }

    // if request type is fetch
    if (fetchRadio.checked) {

        const params = new URLSearchParams(formData).toString();
        url += `?${params}`;

        const response = await fetch (url, {
            method: 'GET',
        });

        if (!(response.ok)) {
            throw new Error('Error fetching response.');
        }
        else {
            const data = await response.json ();
            document.getElementById ('response').textContent = `${JSON.stringify (data, null, 2)}`;
        }
    }
    

}

async function sendPut () {
    // set date value
    document.getElementById ('date').value = new Date ().toLocaleString ();

    // get form data
    const formData = new FormData (document.querySelector ('form'));

    // endpoint url
    const url = 'https://httpbin.org/put';

    const XMLHttpRequestRadio = document.getElementById ('XMLHttpRequestRadio');
    const fetchRadiofetch = document.getElementById ('fetchRadio');

    // if request type is XMLHttpRequest
    if (XMLHttpRequestRadio.checked) {
        const xhr = new XMLHttpRequest ();
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    const data = JSON.parse (this.responseText);
                    document.getElementById ('response').textContent = `${JSON.stringify (data, null, 2)}`;
                }
                else {
                    console.error ('Error:', this.statusText);
                }
            }
        }
        xhr.open ('PUT', url);
        xhr.send (formData);
    }

    // if request type is fetch
    if (fetchRadio.checked) {
        const response = await fetch (url, {
            method: 'PUT',
            body: formData,
        });

        if (!(response.ok)) {
            throw new Error('Error fetching response.');
        }
        else {
            const data = await response.json ();
            document.getElementById ('response').textContent = `${JSON.stringify (data, null, 2)}`;
        }
    }
    
}

async function sendDelete () {
    // set date value
    document.getElementById ('date').value = new Date ().toLocaleString ();

    // get form data
    const formData = new FormData (document.querySelector ('form'));

    // endpoint url
    let url = 'https://httpbin.org/delete';

    const XMLHttpRequestRadio = document.getElementById ('XMLHttpRequestRadio');
    const fetchRadio = document.getElementById ('fetchRadio');

    // if request type is XMLHttpRequest
    if (XMLHttpRequestRadio.checked) {
        const xhr = new XMLHttpRequest ();
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    const data = JSON.parse (this.responseText);
                    document.getElementById ('response').textContent = `${JSON.stringify (data, null, 2)}`;
                }
                else {
                    console.error ('Error:', this.statusText);
                }
            }
        }
        const params = new URLSearchParams(formData).toString();
        url += `?${params}`;

        xhr.open ('DELETE', url);
        xhr.send (params);
    }

    // if request type is fetch
    if (fetchRadio.checked) {

        const params = new URLSearchParams(formData).toString();
        url += `?${params}`;

        const response = await fetch (url, {
            method: 'DELETE',
        });

        if (!(response.ok)) {
            throw new Error('Error fetching response.');
        }
        else {
            const data = await response.json ();
            document.getElementById ('response').textContent = `${JSON.stringify (data, null, 2)}`;
        }
    }

}