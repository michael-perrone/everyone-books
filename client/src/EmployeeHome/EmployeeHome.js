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
import Advertisement from '../Shared/Advertisement/Advertisement';

const EmployeeHome = (props) => {
    const [success, setSuccess] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [employeeId, setEmployeeId] = React.useState('');
    const [business, setBusiness] = React.useState();
    const [notification, setNotification] = React.useState([]);
    const [businessAddedYou, setBusinessAddedYou] = React.useState(false);
    const [mult, setMult] = React.useState(false); 
    const [bookingToView, setBookingToView] = React.useState({});
    const [showBackDrop, setShowBackDrop] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const [type, setType] = React.useState("Choice");
    const [ads, setAds] = React.useState([]);

    React.useEffect(function() {
        Axios.post("/api/ads/getRandomE", {limit: 3}).then(response => {
            setAds(response.data.ads);
        })
    }, [])

    React.useEffect(() => {
        Axios.get('/api/getEmployee', {headers: {'x-auth-token': props.employeeToken}}).then(
            response => {
                if (response.status === 200) {  
                    setEmployeeId(response.data.employee._id)
                    setBusiness(response.data.employee.business)
                }
                else if (response.status === 204) {
                    setBusiness("None");
                    setEmployeeId(props.employee.id)
                }


                setLoading(false);
              
            }
        )
    }, [])

    React.useEffect(() => {
        if (notification.type === "BAEDR") {
            setType("Alert")
        }
    }, [notification.type])

    React.useEffect(function () {
        if (business === "None") {
            Axios.get('api/notifications/employeeNotificationsHs', {headers: {'x-auth-token': props.employeeToken}}).then(
                response => {
                    if (response.status === 200) {
                        setMult(true);
                    }
                    else if (response.status === 201) {
                        setBusinessAddedYou(true);
                        setNotification(response.data.notification);
                    }
                }
            )
        }
    }, [business]); 

   

    function denied(notificationId) {
        const notiCopy = notification;
        notification.type = "BAEDR";
        setType("Alert");
        setNotification(notiCopy);
    }

    function hide() {
        setShowBackDrop(false);
        
      //  loadSchedule() // check this dont love how much this runs;
      }

      function goToBusinessSearch() {
          props.history.push("/businesslist")
      }

      function goToEmployeePortal() {
        props.history.push(`/employee/${props.employee.id}/employeePortal`);
        console.log(`/employee/${props.employee.id}/employeePortal`);
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
            {businessAddedYou && <MessageView fromEmployeeView={true} denied={denied} height={"375px"} notification={notification} type={type}/>}
            {(business === "None" && loading === false) &&
            <div id={styles.secret}>
             <div style={{width: '370px', padding:'8px', paddingTop: '17px', minHeight: "270px", height: "600px", marginTop: '20px', display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <p style={{lineHeight: '30px', padding: "5px"}}>Thanks for joining Everyone-Books! We are glad to have you with us. If you have an employer, you need to give them your unique ID that we have assigned you. Your unqiue Id is <span style={{fontWeight: 'bold'}}>{employeeId}</span>, your employer can use this Id to invite you to their business. {businessAddedYou && <label style={{fontWeight: "bold"}}>You have a pending invite from a business.</label>}</p>
                <button onClick={goToBusinessSearch} id={styles.askButton}>Ask Employer for Invite To Business</button>
                <div style={{width: "100%", height: "2px", backgroundColor: "black"}}></div>
                <p style={{lineHeight: '30px'}}>If you do not have an employer, you can click the button below to enter the careers portal. In the careers portal, you can enter your skills and past experiences and find employers looking to find a great employee like you! Good luck in your search. </p>
                <button onClick={goToEmployeePortal} id={styles.askButton}>Enter the Employee Careers Portal</button>
             </div>
              {!businessAddedYou && <div style={{paddingBottom: "30px"}} id={styles.adverContainer}>
                {ads.map(ad => {
                   return  <div style={{marginTop: "30px"}}>
                             <Advertisement ad={ad}/>
                          </div>
                })}
              </div>}
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
        employee: state.authReducer.employee.employee,
        employeeToken: state.authReducer.employeeToken
    }
}

export default withRouter(connect(mapStateToProps)(EmployeeHome));

