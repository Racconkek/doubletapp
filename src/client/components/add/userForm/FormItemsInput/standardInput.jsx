import React from 'react';
import PropTypes from 'prop-types';

import './standardInput.css';

export class StandardInput extends React.Component {
    static propTypes = {
        onChangeFunction: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valid: true
        };
        this.onChange = this.onChange.bind(this);
    }

    setValidation(value) {
        this.setState({valid: value});
    }

    onChange(e) {
        let newValue = e.target.value;
        this.props.onChangeFunction(newValue);
        this.setState({value: newValue});
    }

    render() {
        const styles = {border: this.state.valid ? 'none' : '2px solid red'};
        return <div className={'FormItem'}>
            <label>{this.props.label}</label>
            <input type={'text'}
                placeholder={this.props.placeholder}
                value={this.state.value}
                style={styles}
                className={'FormInput'}
                onChange={this.onChange}
                required
            />
        </div>;
    }
}
