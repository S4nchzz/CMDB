import MovieService from "./services/movie.service.js"
import GenreService from "./services/genre.service.js"

/**
 * Maneja la creación de películas.
 */
const manageMovieCreation = () => {
    const form = document.getElementById('movieForm')
    
    const movieService = MovieService.getInstance()
    const onSubmit = (e) => {
        e.preventDefault()
        movieService.addMovie(
            e.target['title'].value,
            e.target['releaseDate'].value,
            e.target['popularity'].value
        )
    }

    form.addEventListener('submit', onSubmit)
}

/**
 * Imprime los géneros disponibles en el contenedor.
 */
const printAvailableGenres = () => {
    const container = document.getElementById('genreList')
    const genreService = GenreService.getInstance()
    genreService.getGenres().forEach(genre => {
        const genreElement = document.createElement('p')
        genreElement.id = genre.genre
        genreElement.className = 'genreItem'
        genreElement.textContent = genre.genre
        container.appendChild(genreElement)
    });
}

/**
 * Maneja la selección de géneros.
 */
const manageGenreSelector = () => {
    const container = document.getElementById('genreList')
    const movieService = MovieService.getInstance()

    const onClick = (e) => {
        e.currentTarget.className = e.currentTarget.className == 'genreItem' ? 'genreItemOn' : 'genreItem'
        movieService.addGenre(e.target.id)
    }

    Array.from(container.children).forEach((element) => {
        element.addEventListener('click', onClick)
    })
}

/**
 * Inicializa la aplicación.
 */
const init = () => {
    manageMovieCreation()
    printAvailableGenres()
    manageGenreSelector()
}

init()