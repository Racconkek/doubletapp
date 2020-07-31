import React from 'react';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';

import './header.css';
import photo from '../../../assets/favicon.svg';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={ 'Header' }>
            <Link to={'/'}> <img src={photo} alt={'logo'} className={'Logo'}/> </Link>
            <Link to={'/'} className={'LogoText'}>STUDENTS</Link>
            <MediaQuery minDeviceWidth={981}>
                <a href={'https://github.com/Racconkek/doubletapp'} className={'LinkToGithub'}>
                    <div className={'LinkBy'}> by </div> Racconkek </a>
            </MediaQuery>
        </div>;
    }
}
