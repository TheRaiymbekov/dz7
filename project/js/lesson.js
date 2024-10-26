// PHONE CHECK
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996[2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick =() =>{
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK';
        phoneResult.style.color = 'green'
    }else{
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}
// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabParent = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none';
    })
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent(0)

let slideIndex = 0

setInterval(() => {
    slideIndex = (slideIndex + 1) % tabItems.length;
    hideTabContent();
    showTabContent(slideIndex);
}, 5000)

tabParent.onclick = (event)=>{
    if (event.target.classList.contains('tab_content_item')){
        tabItems.forEach((item,index) => {
            if(event.target === item){
                hideTabContent()
                showTabContent(index)
                slideIndex = index
            }
        })
    }
}

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')

const converter = (element, targetElement) => {
    element.oninput = () => {
        const request = async () => {
            try {
                const response = await fetch(`../data/converter.json`);
                const data = await response.json();
                if (element.id === 'som') {
                    targetElement.usd.value = (element.value / data.usd).toFixed(2)
                    targetElement.eur.value = (element.value / data.eur).toFixed(2)
                }
                if (element.id === 'usd') {
                    targetElement.som.value = (element.value * data.usd).toFixed(2)
                    targetElement.eur.value = (element.value * (data.usd / data.eur)).toFixed(2)
                }
                if (element.id === 'eur') {
                    targetElement.som.value = (element.value * data.eur).toFixed(2)
                    targetElement.usd.value = (element.value * (data.eur / data.usd)).toFixed(2)
                }
                if (element.value === '') {
                    targetElement.usd.value = ''
                    targetElement.som.value = ''
                    targetElement.eur.value = ''
                }
            } catch (error) {
            }
        }
        request()
    }
}

converter(somInput, { usd: usdInput, eur: eurInput });
converter(usdInput, { som: somInput, eur: eurInput });
converter(eurInput, { som: somInput, usd: usdInput });

// DRY - don`t repeat yourself
// KISS - keep it simple, stupid

// CARD SWITCHER

const card = document.querySelector('.card')
const prevButton = document.querySelector('#btn-prev')
const nextButton = document.querySelector('#btn-next')

let cardId = 1
const allCard = 200

const todos = async()=>{
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        const data = await response.json();
        const {id,title,completed} = data

        card.innerHTML = `
                <p>${title}</p>
                <p>${completed}</p>
                <span>${id}</span>
            `
    }catch (error){}
}
todos()

function slide(buttons){
    if (buttons === 'next') {
        cardId = (cardId % allCard) + 1;
    } else if (buttons === 'prev') {
        cardId = (cardId - 2 + allCard) % allCard + 1;
    }
    todos(cardId);
}
todos(cardId);

nextButton.onclick = (event)=>{
    slide('next')
}
prevButton.onclick = (event)=>{
    slide('prev')
}

const post = async () =>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await response.json();
    console.log(data)
}
post()
// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((response) => response.json())
//     .then((post)=>{
//         console.log(post)
//     })

//  WEATHER
const searchInput = document.querySelector('.cityName')
const searchBtn = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

// query params - настройки/свойства/параметры запроса

const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
 searchInput.oninput = async()=>{
    try{
        const response = await fetch(`${BASE_URL}?q=${searchInput.value}&appid=${API_KEY}&units=metric`)
        const data = await response.json()

        city.innerHTML = data.name || 'Город не найден';
        temp.innerHTML =data.main?.temp ? Math.round(data.main?.temp) + '&deg;C': 'Температура не найдена'
    }catch(error){
        console.log(error)
    }
 }


 const object = {
    address: {

    }
 }



















