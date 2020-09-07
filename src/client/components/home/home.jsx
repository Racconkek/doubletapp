import React from 'react';
import {Link} from 'react-router-dom';

import {StudentsInfo} from './studentsInfo/studentsInfo.jsx';

import './home.css';
import './homeMobile.css';
import plusicon from '../../../assets/plusicon.svg';

export default function Home() {
    return <div className={'Home'}>
        <div className={'Info'}>
            <div className={'PageName'}>Студенты</div>
            <Link to={'/add'} className={'AddStudentButton'}>
                <img src={plusicon} alt={'plus'} className={'AddPlus'}/>
                Добавить студента</Link>
        </div>
        <StudentsInfo/>
    </div>;
}
