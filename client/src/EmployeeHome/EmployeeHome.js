import React from 'react';
import styles from './EmployeeHome.module.css';
import Schedule from '../Shared/Nav/Schedule/Schedule';
import Axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../Spinner/Spinner';
import MessageView from '../Notifications/MessageView/MessageView';
import OtherAlert from '../OtherAlerts/OtherAlerts';
import ViewBooking from '../Business/ViewBooking/ViewBooking';
import {withRouter} from 'react-router-dom';

const EmployeeHome = (props) => {
    const [success, setSuccess] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [employeeId, setEmployeeId] = React.useState('');
    const [business, setBusiness] = React.useState('None');
    const [notification, setNotification] = React.useState([]);
    const [businessAddedYou, setBusinessAddedYou] = React.useState(false);
    const [mult, setMult] = React.useState(false); 
    const [bookingToView, setBookingToView] = React.useState({});
    const [showBackDrop, setShowBackDrop] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [services, setServices] = React.useState([]);

    React.useEffect(() => {
        Axios.get('/api/getEmployee', {headers: {'x-auth-token': props.employeeToken}}).then(
            response => {
                if (response.status === 200) {
                    setLoading(false)
                }
                setEmployeeId(response.data.employee._id)
                setBusiness(response.data.employee.business)
            }
        )
    }, [])

    React.useEffect(function () {
        Axios.get('api/notifications/employeenotifications', {headers: {'x-auth-token': props.employeeToken}}).then(
            response => {
                if (response.status === 200) {
                    if (response.data.notifications.length > 1) {
                        setMult(true);
                    }
                    else if (response.data.notifications.length === 1) {
                        if (response.data.notifications[0].type === "BAE") {
                            setBusinessAddedYou(true);
                            setNotification(response.data.notifications[0]);
                        }
                    }
                }
            }
        )
    }, []); 

   

    function denyHit() {
        setBusinessAddedYou(false);
        setSuccess("");
        setTimeout(() => setSuccess("You have declined this business' employement invitation."))
    }

    function hide() {
        setShowBackDrop(false);
        
      //  loadSchedule() // check this dont love how much this runs;
      }

      function goToBusinessSearch() {
          props.history.push("/businesslist")
      }

    function viewBooking(booking) {
                return () => {
                  Axios.post('/api/getBookings/moreBookingInfoEmployee', {bookingId: booking._id}, {headers: {'x-auth-token': props.employeeToken}}).then(response => {
                      if (response.status === 200) {
                          const newBooking = booking;
                          newBooking.services = response.data.services;
                          newBooking.customer = response.data.customer;
                          newBooking.products = response.data.products;
                          newBooking.employeeName = response.data.employeeName;
                          setBookingToView(newBooking);
                          setShowBackDrop(true);
                          Axios.get("/api/services/getServicesAndProducts", {headers: {'x-auth-token': props.employeeToken}}).then(response => {
                              setServices(response.data.services);
                              setProducts(response.data.products)
                          }).catch(error => {
                              console.log(error);
                          })
                      }
                  }).catch(error => {
                    console.log(error);
                  })  
                }
              }

    return (
        <div id={styles.employeeHome}>
            {loading && <Spinner/>}
            {businessAddedYou && <MessageView fromEmployeeView={true} denyHit={denyHit} height={"375px"} notification={notification} type={"Choice"}/>}
            {(business === "None" && loading === false) &&
             <div style={{width: '370px', padding:'8px', paddingTop: '17px', boxShadow: '0px 0px 2px black', height: '270px', marginTop: '20px', display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <p style={{lineHeight: '30px'}}>Thanks for joining Everyone-Books! We are glad to have you with us. If you have an employer, you need to give them your unique ID that we have assigned you. Your unqiue Id is <span style={{fontWeight: 'bold'}}>{employeeId}</span>, your employer can use this Id to invite you to their business. {businessAddedYou && <label style={{fontWeight: "bold"}}>You have a pending invite from a business.</label>}</p>
                <button onClick={goToBusinessSearch} id={styles.askButton}>Ask Employer for Invite To Business</button>
            </div>}
            {business !== "None" && loading === false && <Schedule viewBooking={viewBooking}/>}
            {showBackDrop && <div style={{display: "flex", position: "absolute", top: 0, lef: 0, width: "100%", justifyContent: "center"}}><div onClick={() => setShowBackDrop(false)} id={styles.backDrop}></div> <ViewBooking products={products} services={services} hide={hide} booking={bookingToView}/></div>}
            {mult && business === "None" && <p>You have multiple notifications awaiting you!</p>}
            <OtherAlert alertType={"success"} alertMessage={success} showAlert={success !== ""}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employeeToken: state.authReducer.employeeToken
    }
}

export default withRouter(connect(mapStateToProps)(EmployeeHome));