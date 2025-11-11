import { MovieEntity } from "../entities/movie.entity.js"

class MovieService {
    constructor() {
        if (MovieService.instance) {
            return MovieService.instance
        }

        MovieService.instance = this
    }

    static getInstance() {
        if (MovieService.instance) {
            return MovieService.instance
        }

        return new MovieService()
    }

    genreList = new Set()
    addMovie(title, releaseDate, popularity) {
        if (this.genreList.size == 0) {
            alert('Elige un genero')
            return
        }

        const rdDate = new Date(releaseDate)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (
            rdDate.getFullYear() >= tomorrow.getFullYear() &&
            rdDate.getMonth() >= tomorrow.getMonth() &&
            rdDate.getDay() >= tomorrow.getDay()
        ) {
            alert('La fecha de estreno no puede ser posterior al dia que se da de alta.')
            return
        }

        let movies = JSON.parse(localStorage.getItem('movieList'))
        if (movies && Array.isArray(movies)) {
            movies.push(new MovieEntity(title, releaseDate, popularity, Array.from(this.genreList)))
        } else if (movies) {
            movies = [movies, new MovieEntity(title, releaseDate, popularity)]
        }
        
        localStorage.setItem('movieList', movies ? JSON.stringify(movies) : JSON.stringify(new MovieEntity(title, releaseDate, popularity, Array.from(this.genreList))))
    }

    getLastMovieID() {
        let movies = JSON.parse(localStorage.getItem('movieList'))

        if (movies && Array.isArray(movies)) {
            let maxID = Math.max(...movies.map((m) => m.id))
            return maxID + 1
        } else if (movies) {
            return movies.id + 1
        }

        return 1
    }

    addGenre(genre) {
        if (this.genreList.has(genre)) {
            this.genreList.delete(genre)
            return
        }
        
        this.genreList.add(genre)
    }
}

export default MovieService