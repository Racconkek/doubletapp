import React from 'react';
import MediaQuery from 'react-responsive';

import './studentsInfo.css';
import './stidentsInfoMobile.css';
import {ControlPanel} from './controlPanel/controlPanel.jsx';
import {StudentListHeader} from './studentListHeader.jsx';
import {Student} from '../student/student.jsx';

export class StudentsInfo extends React.Component {
    constructor(props) {
        super(props);
        this.deleteStudentFromList = this.deleteStudentFromList.bind(this);
        this.loadStudents = this.loadStudents.bind(this);
        this.filterStudents = this.filterStudents.bind(this);
        this.sortStudents = this.sortStudents.bind(this);
        this.state = {
            isLoaded: false,
            students: [],
            studentsToShow: []
        };
    }

    componentDidMount() {
        this.loadStudents();
    }

    loadStudents() {
        // eslint-disable-next-line no-useless-escape
        let url = window.location.protocol + '\/\/' +
            window.location.hostname + ':' +
            window.location.port +
            '/students';
        fetch(url)
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        students: result.students,
                        studentsToShow: result.students.sort(this.sortByField('name'))
                    });
                },
                _error => {
                    this.setState({
                        isLoaded: false,
                        students: [],
                        studentsToShow: []
                    });
                }

            );
    }

    deleteStudentFromList(id) {
        this.setState(prevState => ({
            students: prevState.students.filter(student => student._id !== id),
            studentsToShow: prevState.studentsToShow.filter(student => student._id !== id)
        }));
    }

    filterStudents(value) {
        let filteredStudents = this.state.students.filter(item =>
            item.name.toLowerCase().search(value.toLowerCase()) !== -1
        );
        this.setState({studentsToShow: filteredStudents});
    }

    sortByField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    sortStudents(value) {
        this.setState(prevState => {
            let sortedStudents = prevState.studentsToShow.sort(this.sortByField(value));
            return {studentsToShow: sortedStudents};
        }
        );
    }

    render() {
        const {isLoaded, studentsToShow} = this.state;
        if (!isLoaded) {
            return <div className={'StudentsInfo'}>
                <ControlPanel filterFunction={this.filterStudents} sortFunction={this.sortStudents}/>
                <MediaQuery minDeviceWidth={981}>
                    <StudentListHeader/>
                </MediaQuery>
                <div className={'StudentsListLoading'}>Загрузка</div>
            </div>;
        }

        return <div className={'StudentsInfo'}>
            <ControlPanel filterFunction={this.filterStudents} sortFunction={this.sortStudents}/>
            <MediaQuery minDeviceWidth={981}>
                <StudentListHeader/>
            </MediaQuery>
            <div className={'StudentsList'}>
                {
                    studentsToShow.map(item => <Student
                        key={item._id}
                        id={item._id}
                        photo={item.photo}
                        name={item.name}
                        specialty={item.specialty}
                        group={item.group}
                        age={item.age}
                        rating={item.rating}
                        color={item.color}
                        deleteFunction={this.deleteStudentFromList}
                    />)
                }
            </div>
        </div>;
    }
}
