import GenderService from "../services/gender.service.js"

class GenderEntity {
    constructor(genderName) {
        const genderService = GenderService.getInstance()
        this.id = genderService.getLastGenderID()
        this.gender = genderName
    }
}

export default GenderEntity