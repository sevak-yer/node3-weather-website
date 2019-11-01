console.log('client side js file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address='+location).then((Response) => {
        Response.json().then((data) => {
            if (data.error) {
               messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast.summary+' It is currently '+data.forecast.temperature+' degrees celsius out. There is a '+data.forecast.precipitation_probability+' percent chance of rain   .';    
            }
        });
    }); 
});


