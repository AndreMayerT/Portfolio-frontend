let data = {}
var profileImage = document.querySelector('.profileMain img')
var profileName = document.querySelector('.profileMain h2')

fetch('https://api.github.com/users/AndreMayert/repos')
.then(response => response.json())
.then(myData => {
    data = myData

    profileImage.src = data.avatar_url
    profileName.textContent = data.name
    console.log(data)
})