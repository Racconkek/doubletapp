import React from 'react';

import './notFound.css';

export class notFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={'notFound'}>
            Страница не найдена
        </div>;
    }
}
