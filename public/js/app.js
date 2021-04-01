const weatherForm = document.querySelector('form');
const search = document.querySelector('#locationInput');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value; 
    url = '/weather?address=' + location

    messageOne.textContent = "Loading ..."
    messageTwo.textContent = ""

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Error : ' + data.error
            }
            else {
                messageOne.innerHTML = '<B>Location : </B>' + data.location
                messageTwo.innerHTML = '<b>Forecast : </B>' + data.forecast
                console.log(data)
            }
        }) 
    })
})