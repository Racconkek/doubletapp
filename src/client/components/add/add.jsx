import React from 'react';
import {Link} from 'react-router-dom';

import {UserForm} from './userForm/userForm.jsx';

import './add.css';
import './addMobile.css';
import backicon from '../../../assets/backicon.svg';

export class Add extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={'AddStudent'}>
            <Link to={'/'} className={'BackToHome'}>
                <img src={backicon} alt={'back'} className={'BackIcon'}/>
                НАЗАД К СПИСКУ СТУДЕНТОВ
            </Link>
            <div className={'Info'}>
                <div className={'PageName'}>Новый студент</div>
            </div>
            <UserForm/>
        </div>;
    }
}
