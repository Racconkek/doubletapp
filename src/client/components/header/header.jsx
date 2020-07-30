import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';
import photo from '../../../assets/favicon.svg';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={ 'Header' }>
            <Link to={'/'}> <img src={photo} alt={ 'logo' } className={ 'Logo' }/> </Link>
            <Link to={'/'} className={ 'LogoText' }> <div> STUDENTS </div> </Link>
        </div>;
    }
}
