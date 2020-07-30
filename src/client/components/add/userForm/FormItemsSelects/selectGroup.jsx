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

export class SelectGroup extends React.Component {
    static propTypes = {
        onChangeFunction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            group: '',
            valid: true,
            options: []
        };
        this.onChange = this.onChange.bind(this);
        this.onOptionsChange = this.onOptionsChange.bind(this);
        this.setValidation = this.setValidation.bind(this);
    }

    setValidation(value) {
        this.setState({valid: value});
    }

    onChange(newGroup) {
        this.props.onChangeFunction(newGroup);
        this.setState({group: newGroup});
    }

    onOptionsChange(newOptions) {
        this.setState({
            group: newOptions[0],
            options: newOptions
        });
    }

    render() {
        const style = this.state.valid ? selectStyle : invalidSelectStyle;
        const mobileStyle = this.state.valid ? selectMobileStyle : invalidMobileSelectStyle;

        return <div className={'FormItem'}>
            <label>Группа</label>
            <MediaQuery maxDeviceWidth={980}>
                <Select
                    components={{DropdownIndicator}}
                    value={this.state.group}
                    onChange={this.onChange}
                    options={this.state.options}
                    styles={mobileStyle}
                    placeholder={'Выбрать'}
                />
            </MediaQuery>
            <MediaQuery minDeviceWidth={981}>
                <Select
                    components={{DropdownIndicator}}
                    value={this.state.group}
                    onChange={this.onChange}
                    options={this.state.options}
                    styles={style}
                    placeholder={'Выбрать'}
                />
            </MediaQuery>
        </div>;
    }
}
