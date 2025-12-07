/**
 * Clase que representa la entidad de un género de película.
 */
class GenreEntity {
    /**
     * Constructor de GenreEntity.
     * @param {string} genreName - El nombre del género.
     * @param {number} id - El identificador único del género.
     */
    constructor(genreName, id) {
        this.id = id
        this.genre = genreName
    }
}

export default GenreEntity