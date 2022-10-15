let data = {}


async function getProjectsData() {
    await fetch('https://api.github.com/users/AndreMayert/repos')
    .then(response => response.json())
    .then(myData => {
        data = myData

        data.sort(function(a,b){

            return new Date(b.created_at) - new Date(a.created_at);
        })

        console.log(data[0])

        document.getElementById('firstProjectLink').textContent = data[0].name
        document.getElementById('firstProjectLink').href = data[0].html_url

        if (data[0].description != null){
            document.getElementById('firstProjectDescription').textContent = data[0].description
        }

        document.getElementById('secondProjectLink').textContent = data[1].name
        document.getElementById('secondProjectLink').href = data[1].html_url
        if (data[1].description != null) {
            document.getElementById('secondProjectDescription').textContent = data[1].description
        }
    })
}

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

async function getCommitData() {
    await fetch("https://api.github.com/users/AndreMayerT/events")
    .then(response => response.json())
    .then(myData => {

        let commits_list = []
        for (let index = 0; index < myData.length; index++) {
            const element = myData[index];
            if (element.type == 'PushEvent'){
                commits_list.push(element)
            }
        }

        commits_list.sort(function(a,b){

            return new Date(b.created_at) - new Date(a.created_at);
        })

        document.getElementById('postTitle').textContent = commits_list[0].repo.name
        document.getElementById('postContent').textContent = commits_list[0].payload.commits[0].message


        const commit_time = new Date(commits_list[0].created_at)
        const diffDays = dateDiffInDays(new Date(), commit_time) 
        console.log(commits_list[0].created_at)
        console.log(diffDays)

        
        document.getElementById('postTime').textContent = `${diffDays} days ago`
    })
}

getProjectsData()
getCommitData()
