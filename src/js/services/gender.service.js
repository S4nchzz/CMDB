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

    getGenders() {
        return JSON.parse(localStorage.getItem('genderList') || '[]') || []
    }

    getGenderByName(gender) {
        const ls = JSON.parse(localStorage.getItem('genderList'))
        if (!ls) {
            return []
        }

        return ls.filter(genderEntity => {
            if (genderEntity.gender == gender) return genderEntity
        });
    }

    getGenderById(genderId) {
        const ls = JSON.parse(localStorage.getItem('genderList'))
        if (!ls) {
            return []
        }

        return ls.filter(genderEntity => {
            if (genderEntity.id == genderId) return genderEntity
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

    removeElementById(removeGender) {
        if (!localStorage.getItem('genderList')) {
            throw new Error('Gender list no esta definido en localstorage')
        }

        const currentLs = JSON.parse(localStorage.getItem('genderList'))
        localStorage.setItem('genderList',
            JSON.stringify(currentLs.filter((gender) => gender.id !== parseInt(removeGender)))
        )
    }

    getLastGenderID() {
        if (!localStorage.getItem('genderList')) {
            return 0
        }

        const ls = JSON.parse(localStorage.getItem('genderList'))
        let maxId = 0;
        ls.forEach(obj => {
            if (obj.id > maxId) {
                maxId = obj.id
            }
        });

        return maxId + 1
    }

    removeAllGenders() { localStorage.removeItem('genderList') }
}

export default GenderService