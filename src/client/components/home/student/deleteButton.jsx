import React from 'react';

import photo from '../../../../assets/deleteButtonicon.svg';
import './deleteButton.css';
import './deleteButtonMobile.css';
import PropTypes from 'prop-types';

export default class DeleteButton extends React.Component {
    static propTypes = {
        deleteFunction: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        // eslint-disable-next-line no-useless-escape
        let url = window.location.protocol + '\/\/' +
            window.location.hostname + ':' +
            window.location.port +
            '/students/delete/' +
            this.props.id;
        console.log(url);
        fetch(url, {
            method: 'delete'
        })
            .then(res => {
                if (!res.ok) {
                    console.log(res.status);
                }
            })
            .catch(err => {
                console.log(err);
            });
        this.props.deleteFunction(this.props.id);
    }

    render() {
        return <button className={ 'StudentItem StudentDelete' } onClick={this.deleteStudent}>
            <img src={photo} alt={'delete'}/>
        </button>;
    }
}
