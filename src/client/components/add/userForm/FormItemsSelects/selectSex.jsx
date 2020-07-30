import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import {
    DropdownIndicator,
    selectStyle,
    selectMobileStyle,
    invalidSelectStyle,
    invalidMobileSelectStyle
} from './stylesConsts.jsx';
import MediaQuery from 'react-responsive';

export class SelectSex extends React.Component {
    static propTypes = {
        onChangeFunction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            sex: '',
            valid: true
        };
        this.onChange = this.onChange.bind(this);
        this.setValidation = this.setValidation.bind(this);
    }

    setValidation(value) {
        this.setState({valid: value});
    }

    onChange(newSex) {
        this.props.onChangeFunction(newSex);
        this.setState({sex: newSex});
    }

    render() {
        const style = this.state.valid ? selectStyle : invalidSelectStyle;
        const mobileStyle = this.state.valid ? selectMobileStyle : invalidMobileSelectStyle;

        return <div className={'FormItem'}>
            <label>Пол</label>
            <MediaQuery maxDeviceWidth={980}>
                <Select
                    components={{DropdownIndicator}}
                    value={this.state.sex}
                    onChange={this.onChange}
                    options={[
                        {value: 'male', label: 'Мужской'},
                        {value: 'female', label: 'Женский'},
                        {value: 'other', label: 'Другое'}
                    ]}
                    styles={mobileStyle}
                    placeholder={'Выбрать'}
                />
            </MediaQuery>
            <MediaQuery minDeviceWidth={981}>
                <Select
                    components={{DropdownIndicator}}
                    value={this.state.sex}
                    onChange={this.onChange}
                    options={[
                        {value: 'male', label: 'Мужской'},
                        {value: 'female', label: 'Женский'},
                        {value: 'other', label: 'Другое'}
                    ]}
                    styles={style}
                    placeholder={'Выбрать'}
                />
            </MediaQuery>
        </div>;
    }
}
