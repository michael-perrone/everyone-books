import React, {useEffect, useState} from 'react';
import styles from './ViewBooking.module.css';
import Maplist from '../../Shared/Maplist/Maplist';
import ServiceList from '../../Shared/ServiceList/ServiceList';
import { createMaplist } from '../../feutils/feutils';
import x from '../BookingHelpers/AdminBooking/x.png';
import StatementAppear from '../../Shared/StatementAppear/StatementAppear';
import OtherAlert from '../../OtherAlerts/OtherAlerts';
import Axios from 'axios';
import {connect} from 'react-redux';

function ViewBooking(props) {
    const [showProducts, setShowProducts] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [productsInBooking, setProductsInBooking] = useState(createMaplist(props.booking.products, "name"));
    const [time, setTime] = useState(props.booking.time);
    const [cost, setCost] = useState(props.booking.cost)
    const [servicesInBooking, setServicesInBooking] = useState(createMaplist(props.booking.services, "serviceName"));
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function addProducts() {
        for (let i = 0; i < selectedProducts.length; i++) {
            for (let t = 0; t < productsInBooking.length; t++) {
                if (selectedProducts[i]._id === productsInBooking[t]._id) {
                    setError("");
                    setTimeout(() => setError("Product already exists in booking"))
                    return;
                }
            }
        }
    }

    function addServices() {
        for (let i = 0; i < selectedServices.length; i++) {
            for (let t = 0; t < servicesInBooking.length; t++) {
                if (selectedServices[i]._id === servicesInBooking[t].id) {
                    setError("");
                    setTimeout(() => setError("Service already exists in booking"))
                    return;
                }
            }
        }
        Axios.post('api/getBookings/editBooking', {bookingId: props.booking._id, servicesToAdd: selectedServiceIds}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                setSuccessMessage("");
                setTimeout(() => setSuccessMessage("Services sucessfully updated"));
                const servicesHere = [...createMaplist(selectedServices, "serviceName"), ...servicesInBooking];
                setServicesInBooking(servicesHere);
                setTime(response.data.time);
                setCost(response.data.cost);
                props.reload();
            }
        }
    ).catch(error => {
        if (error.response.status === 400) {
            setError("");
            setTimeout(() => setError("Adding these service(s) to this booking will make the booking overlap with the next booking."));
            return;
            }
        })
    }

    function toSetProducts() {
       setShowProducts(true);
       setSelectedServices([]);
    }

    function toSetServices() {
        setShowProducts(false);
        setSelectedProducts([]);
    }

    function deleteProduct() {

    }

    function deleteService(serviceId) {
        Axios.post("api/getBookings/removeService", {bookingId: props.booking._id, serviceId}).then(
            response => {
                if (response.status === 200) {

                }
            }
        )
    }

    function selectService(service) {
        return function() {
          const selectedServicesArray = [...selectedServices];
          selectedServicesArray.push(service);
          setSelectedServices(selectedServicesArray);
          const selectedServiceIdsArray = [...selectedServiceIds];
          selectedServiceIdsArray.push(service._id);
          setSelectedServiceIds(selectedServiceIdsArray);
        }
      }

      function selectProduct(product) {
        return function() {
          console.log(product._id)
          const selectedProductsArray = [...selectedProducts];
          selectedProductsArray.push(product._id);
          setSelectedProducts(selectedProductsArray);
          const selectedProductIdsArray = [...selectedProductIds];
          setSelectedProductIds(selectedProductIdsArray);
        }
      }

      function minusService(id) {
        return function() {
            const selectedServiceIdsArray = [...selectedServiceIds].filter((e) => {
              return e !== id
            });
         setSelectedServiceIds(selectedServiceIdsArray);
         const selectedServicesArray = [...selectedServices].filter(e => e._id !== id);
         setSelectedServices(selectedServicesArray)
         }
    }

    function minusProduct(id) {
        return function() {
            const selectedProductIdsArray = [...selectedProductIds].filter((e) => {
              return e !== id
            });
         setSelectedProductIds(selectedProductIdsArray);
         const selectedProductsArray = [...selectedProducts].filter(e => e._id !== id);
         setSelectedProductIds(selectedProductsArray);
         }
    }

    return (
        <div id={styles.viewBookingContainer}>
            <p style={{fontWeight: "bold", fontSize: "18px", position: "absolute", top: 5}}>Booking Info</p>
            <img onClick={props.hide} style={{position: "absolute", right: 20, top: 20, cursor: "pointer"}} src={x}/>
            <div id={styles.leftContainer}>
                <div>
                    <p className={styles.bolder}>Employee Name:</p>
                    <p>{props.booking.employeeName}</p>
                </div>
                <div>
                    <p className={styles.bolder}>Customer Name:</p>
                    <p>{props.booking.customer.fullName}</p>
                </div>
                 <div>
                    <p className={styles.bolder}>Customer Phone:</p>
                    <p>{props.booking.customer.phoneNumber}</p>
                </div>
                <div>
                    <p className={styles.bolder}>Time of Service:</p>
                    <p>{time}</p>
                </div>
                <div>
                    <p className={styles.bolder}>Date of Service:</p>
                    <p>{props.booking.date}</p>
                </div>
                 <div>
                    <p className={styles.bolder}>Cost of Service:</p>
                    <p>{cost}</p>
                </div>
                <button style={{backgroundColor: "salmon", height: "35px", width: "120px", position: "absolute", bottom: "40px", fontWeight: "bold", boxShadow: "0px 0px 2px black", border: "none"}}>Delete Booking</button>
            </div>
            <div id={styles.rightContainer}>
                {showProducts ?
                <div style={{maxHeight: "180px", overflow: "auto"}}>
                    <p style={{textAlign: "center"}} className={styles.bolder}>Products</p>
                    <Maplist small={true} delete={deleteProduct} array={productsInBooking}/>
                </div>
                :
                <div style={{maxHeight: "180px", overflow: "auto"}}>
                     <p style={{textAlign: "center"}} className={styles.bolder}>Services</p>
                    <Maplist small={true} delete={deleteService} array={servicesInBooking}/>
                </div>
                }
                <div style={{position: "absolute", top: "270px", width: "220px"}}>
                    <div style={{display: "flex", justifyContent: "space-between", position: "relative", top: "1px"}}>
                        <p onClick={toSetServices} style={{paddingBottom: "8px", cursor: "pointer"}} className={showProducts ? styles.unselected : styles.selected}>Add Services</p>
                        <p onClick={toSetProducts} style={{paddingBottom: "8px", cursor: "pointer"}} className={showProducts ? styles.selected : styles.unselected}>Add Products</p>
                    </div>
                    
                   <div style={{width: "218px", height: "200px", borderLeft: "1.5px solid black",
                    borderRight: "1.5px solid black", borderBottom: "1.5px solid black" }}>
                   {showProducts ?
                        <ServiceList array={props.products} small={true} addService={(id) => selectProduct(id)} minusService={minusProduct} prod={true} small={true} selectedServices={selectedProductIds}/>
                           :
                          <ServiceList array={props.services} small={true} addService={(id) => selectService(id)} minusService={minusService} small={true}  selectedServices={selectedServiceIds}/>
                   }
                    </div>
                </div>
                <StatementAppear appear={selectedProducts.length > 0 && showProducts}>
                    <div className={styles.bottomButton}>
                   <button style={{height: "35px", width: "120px", boxShadow: "0px 0px 2px black", border: "none"}} onClick={addProducts}>Add Product(s)</button>
                   </div>
                </StatementAppear>
                <StatementAppear appear={selectedServices.length > 0 && !showProducts}>
                    <div className={styles.bottomButton}>
                   <button style={{height: "35px", width: "120px", boxShadow: "0px 0px 2px black", border: "none"}} onClick={addServices}>Add Service(s)</button>
                   </div>
                </StatementAppear>
            </div>
            <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
             <OtherAlert showAlert={error !== ""} alertMessage={error} alertType={"notgood"}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      adminToken: state.authReducer.adminToken
    };
};
  

export default connect(mapStateToProps)(ViewBooking);