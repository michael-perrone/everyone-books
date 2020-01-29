import React from 'react';
import styles from '../../../Business/BookingHelpers/AdminBooking/AdminBooking.module.css';
import {connect} from 'react-redux';
import {CHOOSE_EMPLOYEE_FOR_SCHEDULE} from '../../../actions/actions';
import axios from 'axios';


const EmployeeSelector = (props) => {
    const [employeeSelected, setEmployeeSelected] = React.useState('')
    const [employees, setEmployees] = React.useState('');


   /*  React.useEffect(() => {
        axios.get('api/getemployees', {headers: {'x-auth-token': props.adminToken}})
        .then(response => {  
          setEmployees(response.data.employees)
        }
      )
    }, []) */

    function selectEmployeeWithClick(employeeToSelect) {
        return () => {
          setEmployeeSelected(employeeToSelect)
          props.employeeSelectForSchedule(employeeToSelect)
        };
      }

    return (
        <div className={styles.bookingHolderContainer}>
            <p style={{ marginBottom: "-8px" }}>Choose Employee</p>
            <div className={styles.bookingHolderSubContainer}>
              {employees && employees.map(element => {
                return (
                  <p
                    style={{
                      backgroundColor:
                        employeeSelected._id === element._id
                          ? "navy"
                          : "",
                      color:
                        employeeSelected._id === element._id
                          ? "white"
                          : ""
                    }}
                    onClick={selectEmployeeWithClick(element)}
                    className={styles.itemPTag}
                  >
                    {element.fullName}
                  </p>
                );
              })}
            </div>
          </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        employeeSelectForSchedule: (employee) => dispatch({type: CHOOSE_EMPLOYEE_FOR_SCHEDULE, payload: employee})
    }
}

const mapStateToProps = state => {
    return {
        adminToken: state.authReducer.adminToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSelector);