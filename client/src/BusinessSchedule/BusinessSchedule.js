import React from 'react';
import ShiftCreator from './ShiftCreator/ShiftCreator';
import WeekSelector from './WeekSelector/WeekSelector';
import axios from 'axios';
import styles from './BusinessSchedule.module.css';
import {connect} from 'react-redux';
import ShiftSchedule from './ShiftSchedule/ShiftSchedule';
import ShiftEditor from './ShiftEditor/ShiftEditor';


function BusinessSchedule(props) {
    const [schedule, setSchedule] = React.useState('');
    const [employees, setEmployees] = React.useState('');
    const [shifts, setShifts] = React.useState([])
    const [loading, setLoading] = React.useState(true);
    const [anyNum, setAnyNum] = React.useState(1);
    const [bookingColumnsNumber, setBookingColumnsNumber] = React.useState();
    const [bookingColumnsType, setBookingColumnsType] = React.useState();
    const [shiftBeingEdited, setShiftBeingEdited] = React.useState("");

    function getNewShifts() {
        setAnyNum(anyNum => anyNum + 1);
    }

    React.useEffect(() => {
        let businessId;
        if (props.admin) {
            businessId = props.admin.admin.businessId
        }
        else if (props.employee) {
            businessId = props.match.params.businessId
        }
        console.log(businessId)
        axios.post('/api/business/businessschedule', {businessId})
        .then(
            response => {
                if (response.status === 200) {
                    setSchedule(response.data.schedule)
                    setEmployees(response.data.employees)
                    setBookingColumnsNumber(response.data.bookingColumnNumber)
                    setBookingColumnsType(response.data.bookingColumnsType)
                }
            }
        )
    },[])

 React.useEffect(() => {
    axios.post('api/shifts/get',
     {shiftDate: props.shiftDate, businessId: props.admin.admin.businessId})
     .then(response => {
         if (response.status === 204) {
             setShifts([])
             setLoading(false)
         }
         if (response.data.shifts) {
            setShifts(response.data.shifts)
            setLoading(false)
         }
     }
    ).catch(error => {
        console.log(error)
    })

}, [props.shiftDate, anyNum]) 

function getShifts() {
    console.log("yo?");
    axios.post('api/shifts/get',
    {shiftDate: props.shiftDate, businessId: props.admin.admin.businessId})
    .then(response => {
        if (response.status === 204) {
            setShifts([])
            setLoading(false)
        }
        if (response.data.shifts) {
           setShifts(response.data.shifts)
           setLoading(false)
        }
    }
   ).catch(error => {
       console.log(error)
   })
}

function deleteShift(shiftId) {
    return () => {
        axios.post("/api/shifts/deleteOne", {shiftId}, {headers: {"x-auth-token": props.adminToken}}).then(response => {
            if (response.status === 200) {
                const newShifts = [...shifts].filter(e => e._id !== shiftId);
                setShifts(newShifts);
            }
          }    
        )
    }
}

function selectEditingShift(id) {
     setShiftBeingEdited(id)
}

    return (
        <div id={styles.container}>
            <div id={styles.leftHolder}>
                <WeekSelector/>
                {props.editingShift && <ShiftEditor getShifts={getShifts} shiftBeingEdited={shiftBeingEdited} bookingColumnsNumber={bookingColumnsNumber} bookingColumnsType={bookingColumnsType} schedule={schedule} admin={props.admin.admin} employees={employees}/>}
                {!props.editingShift && <ShiftCreator bookingColumnsNumber={bookingColumnsNumber} bookingColumnsType={bookingColumnsType} schedule={schedule} admin={props.admin.admin} employees={employees} getNewShifts={getNewShifts}/>}
            </div>
            <div id={styles.rightHolder}>
            <ShiftSchedule deleteShift={deleteShift} bookingColumnsType={bookingColumnsType} loading={loading} shiftBeingEdited={shiftBeingEdited} selectEditingShift={selectEditingShift} shiftDate={props.shiftDate} shifts={shifts}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shiftDate: state.scheduleReducer.dateChosen,
        admin: state.authReducer.admin,
        adminToken: state.authReducer.adminToken,
        editingShift: state.editShiftReducer.editingShift
    }
}

export default connect(mapStateToProps)(BusinessSchedule);