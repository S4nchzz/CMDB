import MovieService from "./services/movie.service.js"

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


const init = () => {
    manageMovieCreation()
}

init()