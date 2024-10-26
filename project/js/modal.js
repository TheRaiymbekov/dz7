// MODAL
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeIcon = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
setTimeout(openModal , 10000)

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
modalTrigger.onclick = () => openModal()
closeIcon.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal)
    closeModal()
}
const myScroll = () => {
    if (window.innerHeight + window.scrollY > window.innerWidth) {
        openModal()
        window.removeEventListener('scroll', myScroll)
    }
}

window.addEventListener('scroll', myScroll)

// POST DATA

const form = document.querySelector('form')

const chat_id = '@TESTBOT12345456789'
const token = '8190037452:AAGbH583kujq7FZsNkVaxPMVK7GnyatC8t0'
const api_url = `https://api.telegram.org/bot${token}/sendMessage`

form.onsubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const user = {}
    formData.forEach((item,index) =>{
        user[index] = item
    })
    const {name, phone} = user
    const text = `Имя : ${name}\nНомер:${phone}`

    fetch(api_url,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({chat_id: chat_id, text}),
    })
}