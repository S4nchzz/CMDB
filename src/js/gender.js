import GenderEntity from "./entities/gender.entity.js"
import GenderService from "./services/gender.service.js"

const manageMovieGenderCreation = () => {
    const onSubmit = (e) => {
        e.preventDefault()

        const genderService = GenderService.getInstance()

        const movieGender = e.target['gender'].value
        genderService.addGender(movieGender)
        printGenderList()
    }

    const form = document.querySelector('form')
    form.addEventListener('submit', onSubmit)
}


const printGenderList = () => {
    const genderService = GenderService.getInstance()
    const divGenderList = document.getElementById('genderList')

    const childs = []
    genderService.getGenders().forEach(genderEntity => {
        const element = document.createElement('span')
        element.id = genderEntity.id
        element.className = 'genderSpan'
        element.textContent = genderEntity.gender
        removeOnClick(element)
        childs.push(element)
    });

    divGenderList.innerHTML = ''
    divGenderList.append(...childs)

    if (genderService.getGenders().length == 0) {
        const element = document.createElement('h5')
        element.textContent = 'No existen generos'
        divGenderList.append(element)
        return
    }
}

const removeOnClick = (spanElement) => {
    const genderService = GenderService.getInstance()
    spanElement.addEventListener('mousedown', () => {
        genderService.removeElementById(spanElement.id)
        printGenderList()
    })
}


const init = () => {
    manageMovieGenderCreation()
    printGenderList()
}

init()