import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import {
    DropdownIndicator,
    coloredSelectStyle,
    coloredMobileSelectStyle,
    invalidColoredSelectStyle,
    invalidColoredMobileSelectStyle
} from './stylesConsts.jsx';
import color1 from '../../../../../assets/colors/color1.svg';
import color2 from '../../../../../assets/colors/color2.svg';
import color3 from '../../../../../assets/colors/color3.svg';
import color4 from '../../../../../assets/colors/color4.svg';
import color5 from '../../../../../assets/colors/color5.svg';
import color6 from '../../../../../assets/colors/color6.svg';
import color7 from '../../../../../assets/colors/color7.svg';
import MediaQuery from 'react-responsive';

export default class SelectColor extends React.Component {
    static propTypes = {
        onChangeFunction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            color: '',
            valid: true,
            options: [
                {value: 'color1', label: <img src={color1} alt={'color1'} className={'ColorImage'}/>},
                {value: 'color2', label: <img src={color2} alt={'color2'} className={'ColorImage'}/>},
                {value: 'color3', label: <img src={color3} alt={'color3'} className={'ColorImage'}/>},
                {value: 'color4', label: <img src={color4} alt={'color4'} className={'ColorImage'}/>},
                {value: 'color5', label: <img src={color5} alt={'color5'} className={'ColorImage'}/>},
                {value: 'color6', label: <img src={color6} alt={'color6'} className={'ColorImage'}/>},
                {value: 'color7', label: <img src={color7} alt={'color7'} className={'ColorImage'}/>}
            ]
        };
        this.onChange = this.onChange.bind(this);
        this.setValidation = this.setValidation.bind(this);
    }

    onChange(newColor) {
        this.props.onChangeFunction(newColor);
        this.setState({color: newColor});
    }

    setValidation(value) {
        this.setState({valid: value});
    }

    render() {
        const style = this.state.valid ? coloredSelectStyle : invalidColoredSelectStyle;
        const mobileStyle = this.state.valid ? coloredMobileSelectStyle : invalidColoredMobileSelectStyle;

        return <div className={'FormItem'}>
            <label>Любимый цвет</label>
            <MediaQuery minDeviceWidth={981}>
                <Select
                    components={{DropdownIndicator}}
                    value={this.state.color}
                    styles={style}
                    placeholder={'Выбрать'}
                    options={this.state.options}
                    onChange={this.onChange}
                />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={980}>
                <Select
                    components={{DropdownIndicator}}
                    value={this.state.color}
                    styles={mobileStyle}
                    placeholder={'Выбрать'}
                    options={this.state.options}
                    onChange={this.onChange}
                />
            </MediaQuery>
        </div>;
    }
}
