import markicon from '../../../../../assets/markicon.svg';
import arrowicon from '../../../../../assets/arrowicon.svg';
import React from 'react';

export const selectStyle = {
    container: styles => ({
        ...styles,
        width: 380,
        height: 48,
        marginTop: 10,
        marginRight: 0,
        marginBottom: 10,
        marginLeft: 0,
        borderRadius: 6,
        boxShadow: '0 7px 64px rgba(0, 0, 0, 0.07)'
    }),
    control: styles => {
        return ({
            ...styles,
            border: 'none',
            height: 48,
            boxShadow: 'none',
            ':hover': {
                border: 'none'
            }
        });
    },
    valueContainer: styles => ({
        ...styles,
        paddingLeft: 20
    }),
    singleValue: styles => ({
        ...styles,
        fontWeight: 'normal',
        fontSize: 16,
        color: 'rgba(0,0,0,0.3)'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    placeholder: () => ({
        fontWeight: 'normal',
        fontSize: 16,
        color: 'rgba(0,0,0,0.3)'
    }),
    menu: styles => ({
        ...styles,
        border: 'none'
    }),
    option: (styles, {isSelected, isFocused}) => ({
        ...styles,
        fontWeight: 'normal',
        fontSize: 16,
        backgroundColor: isSelected || isFocused ? 'rgba(73, 194, 232, 0.11)' : null,
        color: '#000000',
        backgroundImage: isSelected ? 'url(' + markicon + ')' : null,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center right 14px',
        margin: '0 11px',
        borderRadius: 5,
        width: 'calc(100% - 22px)'
    })
};

export const selectMobileStyle = {
    ...selectStyle,
    container: styles => ({
        ...styles,
        width: '100%',
        height: 48,
        marginTop: 10,
        marginRight: 0,
        marginBottom: 10,
        marginLeft: 0,
        borderRadius: 6,
        boxShadow: '0 7px 64px rgba(0, 0, 0, 0.07)'
    })
};

export const coloredSelectStyle = {
    ...selectStyle,
    singleValue: styles => ({
        ...styles,
        display: 'flex',
        alignItems: 'center'
    }),
    menuList: styles => ({
        ...styles,
        display: 'flex',
        justifyContent: 'space-between'
    }),
    option: (styles, {isSelected, isFocused}) => ({
        ...styles,
        backgroundColor: isSelected || isFocused ? 'rgba(73, 194, 232, 0.11)' : null,
        backgroundImage: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'none'
    })
};

export const coloredMobileSelectStyle = {
    ...coloredSelectStyle,
    ...selectMobileStyle,
    menuList: styles => ({
        ...styles,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-around'
    }),
    option: (styles, {isSelected, isFocused}) => ({
        ...styles,
        backgroundColor: isSelected || isFocused ? 'rgba(73, 194, 232, 0.11)' : null,
        borderRadius: 5,
        width: '15px'
    })
};

export const invalidSelectStyle = {
    ...selectStyle,
    control: styles => {
        return ({
            ...styles,
            border: '2px solid red',
            height: 48,
            boxShadow: 'none',
            ':hover': {
                border: 'none'
            }
        });
    }
};

export const invalidColoredSelectStyle = {
    ...coloredSelectStyle,
    control: styles => {
        return ({
            ...styles,
            border: '2px solid red',
            height: 48,
            boxShadow: 'none',
            ':hover': {
                border: 'none'
            }
        });
    }
};

export const invalidMobileSelectStyle = {
    ...selectMobileStyle,
    control: styles => {
        return ({
            ...styles,
            border: '2px solid red',
            height: 48,
            boxShadow: 'none',
            ':hover': {
                border: 'none'
            }
        });
    }
};

export const invalidColoredMobileSelectStyle = {
    ...coloredMobileSelectStyle,
    control: styles => {
        return ({
            ...styles,
            border: '2px solid red',
            height: 48,
            boxShadow: 'none',
            ':hover': {
                border: 'none'
            }
        });
    }
};

export const DropdownIndicator = () => <img src={arrowicon} alt={'arrow'} className={'DropdownIndicator'}/>;
