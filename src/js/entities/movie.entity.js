import MovieService from "../services/movie.service.js";

export class MovieEntity {
    constructor(id, title, releaseDate, popularity, genres = [] ) {
        this.id = id

        this.title = title;
        this.releaseDate = releaseDate;
        this.popularity = popularity;
        this.votes = [];
        this.rating = 0;
        this.numVotes = 0;
        this.genres = genres.length ? genres : [1];
    }
}