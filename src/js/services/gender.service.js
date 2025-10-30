import GenderEntity from "../entities/gender.entity.js";

class GenderService {
    constructor() {
        if (GenderService.instance) {
            return GenderService.instance
        }

        GenderService.instance = this
    }

    static getInstance() {
        if (!GenderService.instance) {
            GenderService.instance = new GenderService();
        }
        return GenderService.instance;
    }

    getGenderByName(gender) {
        const ls = JSON.parse(localStorage.getItem('genderList'))
        if (!ls) {
            return
        }

        return ls.filter(genderEntity => {
            if (genderEntity.gender == gender) return genderEntity
        });
    }

    addGender(gender) {
        if (this.getGenderByName(gender).length !== 0) {
            alert('Este genero ya existe, utiliza otro')
            return
        }

        try {
            const lsOld = JSON.parse(localStorage.getItem('genderList'))
            lsOld.push(new GenderEntity(gender))
            localStorage.setItem('genderList', JSON.stringify(lsOld))
        } catch (e) {
            localStorage.setItem('genderList', JSON.stringify([new GenderEntity(gender)]))
        }
    }

    getGenders() {
        return JSON.parse(localStorage.getItem('genderList') || '[]') || []
    }
}

export default GenderService