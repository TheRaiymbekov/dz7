const charactersList = document.querySelector('.characters-list')

async function cards()  {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data = await response.json();
        data.forEach((item) => {
            const data = document.createElement('div');
            data.setAttribute('class', 'character-card')
            data.innerHTML = `
        <div class="character-photo">
            <img src="https://wallpapercave.com/wp/wp3172887.jpg" alt="card-image">    
        </div>
        <h2> ${'' + item.title}</h2>
            <p> ${'' + item.body}</p>
        `
            charactersList.append(data)
        })
    }catch(e){}
}
cards()
