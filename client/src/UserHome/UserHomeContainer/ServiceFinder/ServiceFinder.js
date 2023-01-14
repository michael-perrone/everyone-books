import Axios from 'axios';
import React from 'react';
import FoundList from './FoundList/FoundList';
import styles from './ServiceFinder.module.css';
import {withRouter} from 'react-router-dom';

function ServiceFinder(props) {
    const [servicesFound, setServicesFound] = React.useState([]);
    const [productsFound, setProductsFound] = React.useState([]);
    const [serviceDown, setServiceDown] = React.useState(true);
    const [serviceUp, setServiceUp] = React.useState(false);
    const [businessNameUp, setBusinessNameUp] = React.useState(false);
    const [businessNameDown, setBusinessNameDown] = React.useState(false);
    const [costUp, setCostUp] = React.useState(false);
    const [costDown, setCostDown] = React.useState(false);

    function goToSelectedService(id) {
        return () => {
            props.history.push('/businesses/' + id);

        }
    }

    function goToSelectedProduct(product) {
        return () => {
            if (product.split(" ").length > 1) {
                let array = product.split(" ");
                let producty = "";
                for (let i = 0; i < array.length; i++) {
                    if (i !== array.length - 1) {
                        producty += array[i] + "_";
                    }
                    else {
                        producty += array[i];
                    }
                }
                props.history.push('/businessesByService/' + producty);
            }
            else {
                props.history.push('/businessesByService/' + product);
            }
        }
    }


    function searchForServices(e) {
        if (e.target.value.length < 3) {
            return;
        }
        Axios.post("/api/encyclopedia/services", {text: e.target.value}).then(
            response => {
                setServicesFound(response.data.services);
            }
            ).catch(error => {
                if (error.response.status === 406) {
                    setServicesFound([])
                }
        })
    }

    function searchForProducts(e) {
        if (e.target.value.length < 3) {
            return;
        }
        Axios.post("/api/encyclopedia/products", {text: e.target.value}).then(
            response => {
                setProductsFound(response.data.products);
            }
        ).catch(error => {
            if (error.response.status === 406) {
                setProductsFound([])
            }
        })
    }


    function sortServiceNames(e) {
        e.preventDefault();
        if (!serviceDown && !serviceUp) {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
               if (a.service.serviceName < b.service.serviceName) {
                   return -1;
                 }
                 if (a.service.serviceName > b.service.serviceName) {
                   return 1;
                 }
            })
            ifc(costDown, setCostDown);
            ifc(costUp, setCostUp);
            ifc(businessNameDown, setBusinessNameDown);
            ifc(businessNameUp, setBusinessNameUp);
            setServicesFound(newServices);
            setServiceDown(true);
        }
        else if (serviceDown && !serviceUp) {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
               if (a.service.serviceName > b.service.serviceName) {
                   return -1;
                 }
                 if (a.service.serviceName < b.service.serviceName) {
                   return 1;
                 }
            })
            setServicesFound(newServices);
            ifc(costDown, setCostDown);
            ifc(costUp, setCostUp);
            ifc(businessNameDown, setBusinessNameDown);
            ifc(businessNameUp, setBusinessNameUp);
            setServiceDown(false);
            setServiceUp(true);
        }
        else {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
               if (a.service.serviceName < b.service.serviceName) {
                   return -1;
                 }
                 if (a.service.serviceName > b.service.serviceName) {
                   return 1;
                 }
            })
            setServicesFound(newServices);
            ifc(costDown, setCostDown);
            ifc(costUp, setCostUp);
            ifc(businessNameDown, setBusinessNameDown);
            ifc(businessNameUp, setBusinessNameUp);
            setServiceDown(true);
            setServiceUp(false);
        }
    }

    function sortBusinessNames(e) {
        e.preventDefault();
        if (!businessNameDown && !businessNameUp) {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
               if (a.business.businessName < b.business.businessName) {
                   return -1;
                 }
                 if (a.business.businessName > b.business.businessName) {
                   return 1;
                 }
            })
            setServicesFound(newServices);
            ifc(costDown, setCostDown);
            ifc(costUp, setCostUp);
            ifc(serviceDown, setServiceDown);
            ifc(serviceUp, setServiceUp);
            setBusinessNameDown(true);
        }
        else if (businessNameDown && !businessNameUp) {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
               if (a.business.businessName > b.business.businessName) {
                   return -1;
                 }
                 if (a.business.businessName < b.business.businessName) {
                   return 1;
                 }
            })
            setServicesFound(newServices);
            ifc(costDown, setCostDown);
            ifc(costUp, setCostUp);
            ifc(serviceDown, setServiceDown);
            ifc(serviceUp, setServiceUp);
            setBusinessNameDown(false);
            setBusinessNameUp(true);
        }
        else {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
                 if (a.business.businessName < b.business.businessName) {
                   return -1;
                 }
                 if (a.business.businessName > b.business.businessName) {
                   return 1;
                 }
            })
            setServicesFound(newServices);
            ifc(costDown, setCostDown);
            ifc(costUp, setCostUp);
            ifc(serviceDown, setServiceDown);
            ifc(serviceUp, setServiceUp);
            setBusinessNameDown(true);
            setBusinessNameUp(false);
        }
    }

    function sortCosts(e) {
        e.preventDefault();
        if (!costDown && !costUp) {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
                return a.service.cost - b.service.cost;
            })
            setServicesFound(newServices);
            ifc(businessNameDown, setBusinessNameDown);
            ifc(businessNameUp, setBusinessNameUp);
            ifc(serviceDown, setServiceDown);
            ifc(serviceUp, setServiceUp);
            setCostDown(true);
        }
        else if (costDown && !costUp) {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
                return b.service.cost - a.service.cost;
            })
            setServicesFound(newServices);
            ifc(businessNameDown, setBusinessNameDown);
            ifc(businessNameUp, setBusinessNameUp);
            ifc(serviceDown, setServiceDown);
            ifc(serviceUp, setServiceUp);
            setCostDown(false);
            setCostUp(true);
        }
        else {
            const sf = servicesFound;
            const newServices = sf.sort((a,b) => {
                return a.service.cost - b.service.cost;
            })
            setServicesFound(newServices);
            ifc(businessNameDown, setBusinessNameDown);
            ifc(businessNameUp, setBusinessNameUp);
            ifc(serviceDown, setServiceDown);
            ifc(serviceUp, setServiceUp);
            setCostDown(true);
            setCostUp(false);
        }
    }


    function ifc(check, f) {
        if (check) {
            f(false);
        }
    }


    return (
        <div>
            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "26px", paddingTop: "20px", fontFamily: "Josefin Sans"}}>Service Finder</p>
            <div id={styles.inputHolder}>
                <div className={styles.subContainer}>
                    <div className={styles.row}>
                         <p className={styles.p}>Search for Services:</p>
                        <input style={{fontFamily: "Josefin Sans"}} onChange={searchForServices} className={styles.inputo}  placeholder={"Enter Service Name"}/>
                    </div>
                    {servicesFound.length > 0 && <div style={{display: "flex", marginTop: "50px", justifyContent: "space-between"}}>
                        <div className={styles.clickDiv} onClick={sortServiceNames} style={{display: "flex"}}>
                            <p style={{fontWeight: "bold"}} className={serviceDown ? styles.down : serviceUp ? styles.up : ""}>Service Name</p>
                        </div>
                        <div className={styles.clickDiv} onClick={sortBusinessNames} style={{display: "flex"}}>
                            <p style={{fontWeight: "bold"}} className={businessNameDown ? styles.down : businessNameUp ? styles.up : ""}>Business Name</p>
                        </div>
                        <div className={styles.clickDiv} onClick={sortCosts} style={{display: "flex"}}>
                            <p style={{fontWeight: "bold"}}  className={costDown ? styles.down : costUp ? styles.up : ""}>Cost</p>
                        </div>
                    </div>}
                    <FoundList go={goToSelectedService} found={servicesFound}/>
                </div>
            </div>
        </div>
    )
}


export default withRouter(ServiceFinder);