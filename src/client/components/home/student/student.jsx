import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import './student.css';
import './studentMobile.css';
import {DeleteButton} from './deleteButton.jsx';
import ratingicon from '../../../../assets/staricon.svg';

export class Student extends React.Component {
    static propTypes = {
        photo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired,
        specialty: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired,
        deleteFunction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={ 'Student' }>
            <MediaQuery maxDeviceWidth={980}>
                <div className={'StudentPersonalData'}>
                    <div className={'StudentPhotoContainer'}>
                        <div className={'StudentPhotoBorder'}>
                            <img src={`/photo/${this.props.photo}`} className={ 'BorderPhoto' } alt={'photo'}/>
                        </div>
                        <div className={'StudentPhotoInner'}>
                            <img src={`/photo/${this.props.photo}`} className={ 'InnerPhoto' } alt={'photo'}/>
                        </div>
                    </div>
                    <div className={ 'StudentItem StudentName' }>{ this.props.name }</div>
                    <div className={'StudentColorAndRating'}>
                        <div className={ 'StudentItem StudentColor' }>
                            <img src={`/colors/${this.props.color}.svg`} alt={'color'} className={'StudentColorImage'}/>
                        </div>
                        <img src={ratingicon} alt={'ratingicon'} className={'RatingIcon'}/>
                        <div className={ 'StudentItem StudentRating' }>{ this.props.rating }</div>
                    </div>
                    <DeleteButton id={this.props.id} deleteFunction={this.props.deleteFunction}/>
                </div>
                <div className={'StudentEducationalData'}>
                    <div className={ 'StudentItem StudentAge' }>
                        <div className={'ListIcon'}> </div>
                        { this.props.age } год
                    </div>
                    <div className={ 'StudentItem StudentSpecialty' }>
                        <div className={'ListIcon'}> </div>
                        { this.props.specialty }
                    </div>
                    <div className={ 'StudentItem StudentGroup' }>
                        <div className={'ListIcon'}> </div>
                        { this.props.group }
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery minDeviceWidth={981}>
                <div className={'StudentPhotoContainer'}>
                    <div className={'StudentPhotoBorder'}>
                        <img src={`/photo/${this.props.photo}`} className={ 'BorderPhoto' } alt={'photo'}/>
                    </div>
                    <div className={'StudentPhotoInner'}>
                        <img src={`/photo/${this.props.photo}`} className={ 'InnerPhoto' } alt={'photo'}/>
                    </div>
                </div>
                <div className={ 'StudentItem StudentName' }>{ this.props.name }</div>
                <div className={ 'StudentItem StudentSpecialty' }>{ this.props.specialty }</div>
                <div className={ 'StudentItem StudentGroup' }>{ this.props.group }</div>
                <div className={ 'StudentItem StudentAge' }>{ this.props.age }</div>
                <div className={ 'StudentItem StudentRating' }>{ this.props.rating }</div>
                <div className={ 'StudentItem StudentColor' }>
                    <img src={`/colors/${this.props.color}.svg`} alt={'color'}/>
                </div>
                <DeleteButton id={this.props.id} deleteFunction={this.props.deleteFunction}/>
            </MediaQuery>
        </div>;
    }
}
