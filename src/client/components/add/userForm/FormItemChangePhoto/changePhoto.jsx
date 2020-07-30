import React from 'react';
import PropTypes from 'prop-types';

import './changePhoto.css';
import './changePhotoMobile.css';
import defaultPhoto from '../../../../../assets/defaultPhoto.svg';

export class ChangePhoto extends React.Component {
    static propTypes = {
        onChangeFunction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            photo: '',
            imagePreviewUrl: ''
        };
        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                photo: file,
                imagePreviewUrl: reader.result
            });
            this.props.onChangeFunction(file, reader.result);
        };

        reader.readAsDataURL(file);
    }

    render() {
        let logo = 'Загрузить аватар';
        let {imagePreviewUrl} = this.state;
        let $imagePreview = (<img src={defaultPhoto} className={'UserPhoto'} alt={'photo'}/>);
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className={'UserPhoto'} alt={'photo'}/>);
            logo = 'Сменить аватар';
        }

        return <div className={'FormItemChangePhoto'}>
            {$imagePreview}
            <div className={'ChangePhoto'}>
                <label className={'ChangePhotoButton'}>
                    {logo}
                    <input type={'file'}
                        accept={'image/*'}
                        onChange={this.onImageChange}
                        className={'InputFile'}
                        name={'userPhoto'}
                    />
                </label>
                <label className={'PhotoSize'}>500x500</label>
            </div>
        </div>;
    }
}
