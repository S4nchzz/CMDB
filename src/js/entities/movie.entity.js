import MovieService from "../services/movie.service.js";

/**
 * Clase que representa la entidad de una película.
 */
export class MovieEntity {
    /**
     * Constructor de MovieEntity.
     * @param {number} id - El identificador único de la película.
     * @param {string} title - El título de la película.
     * @param {string} releaseDate - La fecha de estreno de la película.
     * @param {number} popularity - El nivel de popularidad de la película (0-100).
     * @param {Array<string>} [genres=[]] - Array de géneros asociados a la película.
     */
    constructor(id, title, releaseDate, popularity, genres = [] ) {
        this.id = id

        this.title = title;
        this.releaseDate = releaseDate;
        this.popularity = popularity;
        this.votes = [];
        this.rating = 0;
        this.numVotes = 0;
        this.genres = genres;
    }
}