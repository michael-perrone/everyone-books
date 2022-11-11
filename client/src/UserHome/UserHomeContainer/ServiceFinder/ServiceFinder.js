import Axios from 'axios';
import React from 'react';
import FoundList from './FoundList/FoundList';
import styles from './ServiceFinder.module.css';
import {withRouter} from 'react-router-dom';

function ServiceFinder(props) {
    const [servicesFound, setServicesFound] = React.useState([]);
    const [productsFound, setProductsFound] = React.useState([]);

    function goToSelectedService(service) {
        return () => {
            if (service.split(" ").length > 1) {
                let array = service.split(" ");
                let servicey = "";
                for (let i = 0; i < array.length; i++) {
                    if (i !== array.length - 1) {
                        servicey += array[i] + "_";
                    }
                    else {
                        servicey += array[i];
                    }
                }
                props.history.push('/businessesByService/' + servicey);
            }
            else {
                props.history.push('/businessesByService/' + service);
            }
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


    return (
        <div>
            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "20px", marginTop: "10px"}}>Welcome to the EveryoneBooks Consumer Encyclopedia.</p>
            <div id={styles.inputHolder}>
                <div className={styles.subContainer}>
                    <div className={styles.row}>
                         <p className={styles.p}>Search for Services:</p>
                        <input onChange={searchForServices} className={styles.inputo}  placeholder={"Enter Service Name"}/>
                    </div>
                    <FoundList go={goToSelectedService} found={servicesFound}/>
                </div>
                <div style={{width: "2px", marginLeft: "2px", borderLeft:"2px solid black"}}></div>
                <div className={styles.subContainer}>
                   <div className={styles.row}> 
                     <p className={styles.p}>Search for Products:</p>
                    <input onChange={searchForProducts} className={styles.inputo} placeholder={"Enter Product Name"}/>
                    <FoundList go={goToSelectedProduct} found={productsFound}/>
                   </div>
                </div>
            </div>
        </div>
    )
}


export default withRouter(ServiceFinder);