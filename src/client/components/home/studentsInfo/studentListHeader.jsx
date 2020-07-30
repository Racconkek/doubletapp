import React from 'react';

import './studentListHeader.css';

export class StudentListHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={'StudentsListHeader'}>
            <div className={'StudentsListHeaderName'}>ФИО</div>
            <div className={'StudentsListHeaderSpecialty'}>Специальность</div>
            <div className={'StudentsListHeaderGroup'}>Группа</div>
            <div className={'StudentsListHeaderAge'}>Возраст</div>
            <div className={'StudentsListHeaderRating'}>Рейтинг</div>
        </div>;
    }
}
