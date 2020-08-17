import React from 'react';
import Select from 'react-select';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import {
    DropdownIndicator,
    selectStyle,
    selectMobileStyle,
    invalidSelectStyle,
    invalidMobileSelectStyle
} from './stylesConsts.jsx';

export class SelectSpecialty extends React.Component {
    static propTypes = {
        onChangeFunction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
            specialty: '',
            options: [],
            valid: true
        };
        this.onChange = this.onChange.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.setValidation = this.setValidation.bind(this);
    }

    componentDidMount() {
        this.loadSpecialties();
    }

    setValidation(value) {
        this.setState({valid: value});
    }

    loadSpecialties() {
        // eslint-disable-next-line no-useless-escape
        let url = window.location.protocol + '\/\/' +
            window.location.hostname + ':' +
            window.location.port +
            '/specialties';
        fetch(url)
            .then(res => res.json())
            .then(
                result => {
                    let specialtiesOptions = result.specialties.map(item => {
                        return {value: item.name, label: item.name};
                    });
                    this.setState({
                        specialties: result.specialties,
                        options: specialtiesOptions
                    });
                }
            );
    }

    onChange(newSpecialty) {
        this.setState(prevState => {
            let specialty = prevState.specialties.find(item => item.name === newSpecialty.value);
            if (specialty) {
                let newGroupOptions = specialty.groups.map(item => {
                    return {value: item, label: item};
                });
                this.props.onChangeFunction(newSpecialty, newGroupOptions);
                return {
                    specialty: newSpecialty
                };
            }
        });
    }

    onLoad(newOptions) {
        this.setState({options: newOptions});
    }

    render() {
        const style = this.state.valid ? selectStyle : invalidSelectStyle;
        const mobileStyle = this.state.valid ? selectMobileStyle : invalidMobileSelectStyle;

        return <div className={'FormItem'}>
            <label>Специальность</label>
            <MediaQuery maxDeviceWidth={980}>
                <Select
                    components={{DropdownIndicator}}
                    value={this.state.specialty}
                    onChange={this.onChange}
                    options={this.state.options}
                    styles={mobileStyle}
                    placeholder={'Выбрать'}
                />
            </MediaQuery>
            <MediaQuery minDeviceWidth={981}>
                <Select
                    components={{DropdownIndicator}}
                    value={this.state.specialty}
                    onChange={this.onChange}
                    options={this.state.options}
                    styles={style}
                    placeholder={'Выбрать'}
                />
            </MediaQuery>
        </div>;
    }
}
