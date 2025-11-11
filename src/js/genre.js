import GenreEntity from "./entities/genre.entity.js"
import GenreService from "./services/genre.service.js"

const manageMovieGenreCreation = () => {
    const onSubmit = (e) => {
        e.preventDefault()

        const genreService = GenreService.getInstance()
        const movieGenre = e.target['genre'].value
        genreService.addGenre(movieGenre)
        printGenreList()
    }

    const form = document.querySelector('form')
    form.addEventListener('submit', onSubmit)
}

const printGenreList = () => {
    const genreService = GenreService.getInstance()
    const divGenreList = document.getElementById('genreList')

    const childs = []
    genreService.getGenres().forEach(genreEntity => {
        const element = document.createElement('span')
        element.id = genreEntity.id
        element.className = 'genreSpan'
        element.textContent = genreEntity.genre
        removeOnClick(element)
        childs.push(element)
    })

    divGenreList.innerHTML = ''
    divGenreList.append(...childs)

    if (genreService.getGenres().length == 0) {
        const element = document.createElement('h5')
        element.textContent = 'No existen géneros'
        divGenreList.append(element)
        return
    }
}

const removeOnClick = (spanElement) => {
    const genreService = GenreService.getInstance()
    spanElement.addEventListener('mousedown', () => {
        genreService.removeElementById(spanElement.id)
        printGenreList()
    })
}

const setUpRemoveAllButton = () => {
    const genreService = GenreService.getInstance()
    const button = document.getElementById('removeAllGenres')
    button.addEventListener('mousedown', () => {
        genreService.removeAllGenres()
        printGenreList()
    })
}

const init = () => {
    setUpRemoveAllButton()
    manageMovieGenreCreation()
    printGenreList()
}

init()