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

    addMovie(title, releaseDate, popularity) {
        let movies = JSON.parse(localStorage.getItem('movieList'))
        if (movies && Array.isArray(movies)) {
            movies.push(new MovieEntity(title, releaseDate, popularity))
        } else if (movies) {
            movies = [movies, new MovieEntity(title, releaseDate, popularity)]
        }
        
        localStorage.setItem('movieList', movies ? JSON.stringify(movies) : JSON.stringify(new MovieEntity(title, releaseDate, popularity)))
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
}

export default MovieService