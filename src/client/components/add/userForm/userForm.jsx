import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import ChangePhoto from './FormItemChangePhoto/changePhoto.jsx';
import SelectSpecialty from './FormItemsSelects/selectSpecialty.jsx';
import SelectGroup from './FormItemsSelects/selectGroup.jsx';
import SelectColor from './FormItemsSelects/selectColor.jsx';
import SelectSex from './FormItemsSelects/selectSex.jsx';
import StandardInput from './FormItemsInput/standardInput.jsx';

import './userForm.css';
import './userFormMobile.css';

class UserForm extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            photo: '',
            imagePreviewUrl: '',
            name: '',
            email: '',
            age: 0,
            specialty: '',
            group: '',
            rating: 0,
            sex: '',
            color: ''
        };

        this.selectSpecialty = React.createRef();
        this.selectGroup = React.createRef();
        this.selectSex = React.createRef();
        this.selectColor = React.createRef();
        this.inputName = React.createRef();
        this.inputAge = React.createRef();
        this.inputRating = React.createRef();
        this.inputEmail = React.createRef();

        this.onSubmit = this.onSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onSpecialtyChange = this.onSpecialtyChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);
        this.onSexChange = this.onSexChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

    validateRating(rating) {
        const valid = parseInt(rating, 10) >= 0 && parseInt(rating, 10) <= 100;
        this.inputRating.current.setValidation(valid);
        return valid;
    }

    validateAge(age) {
        const valid = parseInt(age, 10) >= 1 && parseInt(age, 10) <= 1000;
        this.inputAge.current.setValidation(valid);
        return valid;
    }

    validateName(name) {
        const valid = name.search(/([A-ZA-ЯЁ][a-zа-яё]+ ?){1,2}([A-ZA-ЯЁ][a-zа-яё]+)?/) !== -1;
        this.inputName.current.setValidation(valid);
        return valid;
    }

    validateEmail(email) {
        const valid = email.search(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== -1;
        this.inputEmail.current.setValidation(valid);
        return valid;
    }

    validateSelect(value, ref) {
        const valid = value !== '';
        ref.current.setValidation(valid);
        return valid;
    }

    validateForm() {
        const {name, email, age, specialty, group, rating, sex, color} = this.state;
        return this.validateName(name) &&
            this.validateEmail(email) &&
            this.validateAge(age) &&
            this.validateRating(rating) &&
            this.validateSelect(specialty, this.selectSpecialty) &&
            this.validateSelect(group, this.selectGroup) &&
            this.validateSelect(sex, this.selectSex) &&
            this.validateSelect(color, this.selectColor);
    }

    onImageChange(file, result) {
        this.setState({
            photo: file,
            imagePreviewUrl: result
        });
    }

    onNameChange(newName) {
        this.setState({name: newName});
    }

    onEmailChange(newEmail) {
        this.setState({email: newEmail});
    }

    onAgeChange(newAge) {
        this.setState({age: newAge});
    }

    onSpecialtyChange(newSpecialty, newGroupOptions) {
        this.selectGroup.current.onOptionsChange(newGroupOptions);
        this.setState({
            specialty: newSpecialty,
            group: newGroupOptions[0]
        });
    }

    onGroupChange(newGroup) {
        this.setState({group: newGroup});
    }

    onRatingChange(newRating) {
        this.setState({rating: newRating});
    }

    onSexChange(newSex) {
        this.setState({sex: newSex});
    }

    onColorChange(newColor) {
        this.setState({color: newColor});
    }

    onSubmit(e) {
        e.preventDefault();
        const userPhoto = this.state.photo;
        const {name, email, age, specialty, group, rating, sex, color} = this.state;
        if (!this.validateForm()) {
            return;
        }

        const data = new FormData();
        data.append('userPhoto', userPhoto);
        data.append('userInfo', JSON.stringify({
            name: name,
            email: email,
            age: age,
            specialty: specialty.value,
            group: group.value,
            rating: rating,
            sex: sex.value,
            color: color.value
        }));
        // eslint-disable-next-line no-useless-escape
        let url = window.location.protocol + '\/\/' +
            window.location.hostname + ':' +
            window.location.port +
            '/students/add';
        fetch(url, {
            method: 'post',
            body: data
        })
            .then(res => {
                if (res.ok) {
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return <form className={'UserForm'} onSubmit={this.onSubmit}>
            <ChangePhoto onChangeFunction={this.onImageChange}/>
            <div className={'FormInfo'}>
                <StandardInput
                    label={'ФИО'}
                    placeholder={'Имя'}
                    onChangeFunction={this.onNameChange}
                    ref={this.inputName}
                />
                <StandardInput
                    label={'Email'}
                    placeholder={'Email'}
                    onChangeFunction={this.onEmailChange}
                    ref={this.inputEmail}
                />
                <StandardInput
                    label={'Возраст'}
                    placeholder={'Возраст'}
                    onChangeFunction={this.onAgeChange}
                    ref={this.inputAge}
                />
                <SelectSpecialty
                    onChangeFunction={this.onSpecialtyChange}
                    ref={this.selectSpecialty}
                />
                <SelectGroup
                    onChangeFunction={this.onGroupChange}
                    ref={this.selectGroup}
                />
                <StandardInput
                    label={'Рейтинг'}
                    placeholder={'0'}
                    onChangeFunction={this.onRatingChange}
                    ref={this.inputRating}
                />
                <SelectSex
                    onChangeFunction={this.onSexChange}
                    ref={this.selectSex}
                />
                <SelectColor
                    onChangeFunction={this.onColorChange}
                    ref={this.selectColor}
                />
            </div>

            <input type="submit" value="Создать" className={'SubmitButton'}/>
        </form>;
    }
}

const UserFormWithHistory = withRouter(UserForm);
export {UserFormWithHistory as UserForm};
