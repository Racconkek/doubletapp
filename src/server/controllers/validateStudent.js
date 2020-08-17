// eslint-disable-next-line func-names
module.exports = async function validateStudent(studentInfo, specialties) {
    const isNameValid = studentInfo.name.search(/([A-ZA-ЯЁ][a-zа-яё]+ ?){1,2}([A-ZA-ЯЁ][a-zа-яё]+)?/) !== -1;
    const isEmailValid = studentInfo.email.search(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== -1;
    const isAgeValid = parseInt(studentInfo.age, 10) >= 1 && parseInt(studentInfo.age, 10) <= 1000;
    const isRatingValid = parseInt(studentInfo.rating, 10) >= 0 && parseInt(studentInfo.rating, 10) <= 100;
    const isSexValid = ['male', 'female', 'other'].includes(studentInfo.sex);
    const isColorValid = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7'].includes(studentInfo.color);
    let isSpecialtyValid = false;
    let isGroupValid = false;
    let specialtiesResult;

    try {
        specialtiesResult = await specialties.find({}).toArray();
    } catch (err) {
        console.log(err);
        throw new Error('Не удалось получить список специальностей для проверки');
    }

    isSpecialtyValid = specialtiesResult.map(item => item.name).includes(studentInfo.specialty);
    if (isSpecialtyValid) {
        const specialty = specialtiesResult.find(item => item.name === studentInfo.specialty);
        isGroupValid = specialty.groups.includes(studentInfo.group);
    }

    return isNameValid &&
        isEmailValid &&
        isAgeValid &&
        isRatingValid &&
        isSexValid &&
        isColorValid &&
        isSpecialtyValid &&
        isGroupValid;
};
