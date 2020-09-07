import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import './controlPanel.css';
import './controlPanelMobile.css';
import magnifiericon from '../../../../../assets/magnifiericon.svg';
import sorticon from '../../../../../assets/sorticon.svg';

export default class ControlPanel extends React.Component {
    static propTypes = {
        filterFunction: PropTypes.func.isRequired,
        sortFunction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };

        this.buttonValues = ['name', 'rating', 'age', 'color'];
        this.buttonNames = ['Имя', 'Рейтинг', 'Возраст', 'Цвет'];
        this.filterStudents = this.filterStudents.bind(this);
        this.sortStudents = this.sortStudents.bind(this);
    }

    filterStudents(e) {
        this.props.filterFunction(e.target.value);
    }

    sortStudents() {
        this.setState(prevState => {
            let current = (prevState.current + 1) % 4;
            this.props.sortFunction(this.buttonValues[current]);
            return {current: current};
        });
    }

    render() {
        return <div className={'Filter'}>
            <div className={'Search'}>
                <img src={magnifiericon} alt={'magnifier'} className={'Magnifier'}/>
                <input placeholder="Поиск по имени" className={'SearchPlace'} onChange={this.filterStudents}/>
            </div>
            <MediaQuery minDeviceWidth={981}>
                <button className={'SortButton'} onClick={this.sortStudents}>
                    {this.buttonNames[this.state.current]}
                    <img src={sorticon} alt={'sorticon'} className={'SortIcon'}/>
                </button>
            </MediaQuery>
        </div>;
    }
}
