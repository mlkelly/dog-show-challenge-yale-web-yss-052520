// document.addEventListener('DOMContentLoaded', () => {
// })

// helper functions
function qs(selector){
    return document.querySelector(selector)
}

function ce(element){
    return document.createElement(element)
}

// variables
const tBody = qs("#table-body")
const dogForm = qs("#dog-form")
const formDiv = qs("div#edit")

// GET dogs
function fetchDogs(){
    tBody.innerHTML = ""
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => showDogs(data))
}

// iterate through dogs
function showDogs(dogs){
    dogs.forEach(dog => displayDog(dog))
}

// display single dog
function displayDog(dog){
    const tr = ce("tr")
    tr.dataset.id = dog.id //helps label tr sections w dog, to make reading code easier

    const tdName = ce("td")
    tdName.innerText = dog.name

    const tdBreed = ce("td")
    tdBreed.innerText = dog.breed 

    const tdSex = ce("td")
    tdSex.innerText = dog.sex 

    const tdBtn = ce("td")
    const btn = ce("button")
    btn.innerText = "Edit"
    btn.dataset.id = dog.id

    btn.addEventListener("click", () => {
        // when you click edit this will populate the form w current dog info
        dogForm[0].value = dog.name
        dogForm[1].value = dog.breed
        dogForm[2].value = dog.sex
        dogForm[3].value = dog.id

    })

    tdBtn.appendChild(btn)
    tr.append(tdName, tdBreed, tdSex, tdBtn)
    tBody.appendChild(tr)
}

dogForm.addEventListener("submit", () => {
    event.preventDefault()
    debugger
    // PATCH edits
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            name: event.target[0].value,
            breed: event.target[1].value,
            sex: event.target[2].value
        })
    }

    // grab new dog and display
    fetch(`http://localhost:3000/dogs/${event.target[3].value}`, configObj)
    .then(fetchDogs())
    
    dogForm.reset()
})

fetchDogs()
