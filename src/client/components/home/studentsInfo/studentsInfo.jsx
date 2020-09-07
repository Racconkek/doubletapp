import React from 'react';
import MediaQuery from 'react-responsive';

import './studentsInfo.css';
import './stidentsInfoMobile.css';
import ControlPanel from './controlPanel/controlPanel.jsx';
import StudentListHeader from './studentListHeader.jsx';
import Student from '../student/student.jsx';

export class StudentsInfo extends React.Component {
    constructor(props) {
        super(props);
        this.deleteStudentFromList = this.deleteStudentFromList.bind(this);
        this.loadStudents = this.loadStudents.bind(this);
        this.onChangeFilterValue = this.onChangeFilterValue.bind(this);
        this.onChangeSortValue = this.onChangeSortValue.bind(this);
        this.state = {
            isLoaded: false,
            students: [],
            studentsToShow: [],
            filterValue: '',
            sortValue: 0
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

    onChangeFilterValue(value) {
        this.setState({filterValue: value});
    }

    sortByField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    onChangeSortValue(value) {
        this.setState({sortValue: value});
    }

    render() {
        const {isLoaded, students, filterValue, sortValue} = this.state;
        if (!isLoaded) {
            return <div className={'StudentsInfo'}>
                <ControlPanel filterFunction={this.onChangeFilterValue} sortFunction={this.onChangeSortValue}/>
                <MediaQuery minDeviceWidth={981}>
                    <StudentListHeader/>
                </MediaQuery>
                <div className={'StudentsListLoading'}>Загрузка</div>
            </div>;
        }

        return <div className={'StudentsInfo'}>
            <ControlPanel filterFunction={this.onChangeFilterValue} sortFunction={this.onChangeSortValue}/>
            <MediaQuery minDeviceWidth={981}>
                <StudentListHeader/>
            </MediaQuery>
            <div className={'StudentsList'}>
                {
                    students
                        .filter(item => item.name.toLowerCase().search(filterValue.toLowerCase()) !== -1)
                        .sort(this.sortByField(sortValue))
                        .map(item => <Student
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
