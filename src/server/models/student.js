module.exports = class Student {
    constructor({name, email, age, specialty, group, rating, sex, color},
        photoUrl = 'https://res.cloudinary.com/raccoonkek/image/upload/v1597652002/students/defaultPhoto_zi6hss.svg',
        photoId = 'students/defaultPhoto') {
        this.name = name;
        this.email = email;
        this.age = age;
        this.specialty = specialty;
        this.group = group;
        this.rating = rating;
        this.sex = sex;
        this.color = color;
        this._photoUrl = photoUrl;
        this._photoId = photoId;
    }

    get photoUrl() {
        return this._photoUrl;
    }

    set photoUrl(photoUrl) {
        if (typeof photoUrl === 'string') {
            this._photoUrl = photoUrl;
        }
    }

    get photoId() {
        return this._photoId;
    }

    set photoId(photoId) {
        if (typeof photoId === 'string') {
            this._photoId = photoId;
        }
    }

    async isValid(specialties) {
        const isNameValid = typeof this.name === 'string' &&
            this.name.search(/([A-ZA-ЯЁ][a-zа-яё]+ ?){1,2}([A-ZA-ЯЁ][a-zа-яё]+)?/) !== -1;
        const isEmailValid = typeof this.email === 'string' &&
            this.email.search(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== -1;
        const isAgeValid = typeof this.age === 'string' &&
            parseInt(this.age, 10) >= 1 && parseInt(this.age, 10) <= 1000;
        const isRatingValid = typeof this.rating === 'string' &&
            parseInt(this.rating, 10) >= 0 && parseInt(this.rating, 10) <= 100;
        const isSexValid = typeof this.sex === 'string' &&
            ['male', 'female', 'other'].includes(this.sex);
        const isColorValid = typeof this.color === 'string' &&
            ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7'].includes(this.color);
        let isSpecialtyValid = false;
        let isGroupValid = false;
        let specialtiesResult;

        try {
            specialtiesResult = await specialties.find({}).toArray();
        } catch (err) {
            console.log(err);
            throw new Error('Не удалось получить список специальностей для проверки');
        }

        isSpecialtyValid = typeof this.specialty === 'string' &&
            specialtiesResult.map(item => item.name).includes(this.specialty);
        if (isSpecialtyValid) {
            const specialty = specialtiesResult.find(item => item.name === this.specialty);
            isGroupValid = typeof this.group === 'string' &&
                specialty.groups.includes(this.group);
        }

        return isNameValid &&
            isEmailValid &&
            isAgeValid &&
            isRatingValid &&
            isSexValid &&
            isColorValid &&
            isSpecialtyValid &&
            isGroupValid;
    }

    getObjectToDatabase() {
        return {
            name: this.name,
            email: this.email,
            age: this.age,
            specialty: this.specialty,
            group: this.group,
            rating: this.rating,
            sex: this.sex,
            color: this.color,
            photo: this.photoUrl,
            photoId: this.photoId
        };
    }
};
