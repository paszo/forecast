const zipForm = document.getElementById("zip-form");
const zipInput = document.getElementById("zip");
const h1 = document.getElementById("h1");

zipForm.onsubmit = event => {
    event.preventDefault();
    const zip = zipInput.value.trim();

    fetch("/" + zip, {method: "GET"})
        .then(res => res.json())
        .then(res => {
            const temperature = res.temperature;
            h1.innerHTML = `It is ${temperature} &#176; in ${zip} .`;
        })
        .catch(() => {
            h1.innerHTML = `Error !`;
        })

    h1.innerHTML = 'Loading ...';
    zipInput.value = "";
    zipInput.focus();

}