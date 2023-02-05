import React from 'react';
import styles from '../AddEditEmployees/AddEditEmployees.module.css';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';
import Maplist from '../../../Shared/Maplist/Maplist';
import Axios from 'axios';
import {connect} from 'react-redux';
import {createMaplist, createMaplistElement} from '../../../feutils/feutils';
import OtherAlert from '../../../OtherAlerts/OtherAlerts';

function AddEditProducts(props) {
    const [products, setProducts] = React.useState([]);
    const [error, setError] = React.useState("");
    const [productName, setProductName] = React.useState("");
    const [cost, setCost] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");


    React.useEffect(function() {
        Axios.get("api/businessProfile/getProducts", {headers: {"x-auth-token": props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    if (response.data.products.length === 0) {
                        setProducts([]);
                    }
                    else {
                        setProducts(createMaplist(response.data.products, "name"));
                    }
                }
                else if (response.status === 204) {
                    setProducts([]);
                }
            }
        ).catch(error => {
                setError("Something went wrong");
            }
        )
    }, [])

    function getProductName(e) {
        setProductName(e.target.value);
    }

    function getCost(e) {
        setCost(e.target.value);
    }

   


    function deleteProduct(name) {
        return () => {
            Axios.post('/api/businessProfile/removeProduct', {name: name}, {headers: {"x-auth-token": props.adminToken}}).then(
                response => {
                    if (response.status === 200) {
                        let newProducts = [...products].filter(e => {
                            return e.displayName !== name;
                        })
                        setProducts(newProducts);
                        setSuccessMessage("");
                        setTimeout(() => setSuccessMessage("Product Deleted!"), 200);
                    }
                }
            ).catch(error => {
                setError("");
                setTimeout(() => setError("Something went wrong"), 200);
            })
        }
    }

    function addProduct() {
        let exit = false;
        if (productName !== "" && cost !== "") {
            if (Number.isNaN(Number(cost))) {
                setError("");
                setTimeout(() => setError("Cost must be a number"), 200);
            }
            else {
                if (products.length > 0) {

                    products.forEach(element => {
                        if (element.displayName === productName) {
                            setError("");
                            setTimeout(() => setError("Product already exists"), 200);
                            exit = true;
                        }
                    })
                }
                if (exit) {
                    return;
                }
                     Axios.post("api/businessProfile/addProduct", {price: cost, name: productName}, { headers: {"x-auth-token": props.adminToken}}).then(
                      response => {
                        if (response.status === 200 || response.status === 201) {
                            setSuccessMessage("");
                            setTimeout(() => setSuccessMessage("Product Created"), 200);
                            const newProducts = [...products];
                            newProducts.push(createMaplistElement({name: productName, _id: Math.random() * Math.random()}, "name"));
                            setProducts(newProducts);
                        }
                    }
                    ).catch(error => {
                        console.log(error)
                 })
            }
         }
        else {
            setError("");
            setTimeout(() => setError("Please fill in all fields"), 200);
        }
        
    }

    return (
        <div id={styles.mainContainerServices}>
            <p style={{marginTop: "16px"}}>Add the products that your business offers below followed by the price and the time duration of that service. Then select if the service requires an employee for the service to be conducted.</p>
            <div id={styles.subContainer}>
            <div style={{width: "330px", backgroundColor: "rgb(24,24,24)", padding: "20px", boxShadow: "0px 0px 3px #f9e9f9", marginTop: "20px", height: "200px"}}>
                <p style={{fontSize: "18px", fontWeight: "bold", textAlign: "center", marginBottom: "20px"}}>Add Product:</p>
                <input onChange={getProductName} value={productName} placeholder={"Enter Product Name"} className={styles.inputs}/>
                <div style={{display: "flex", marginTop: "24px", position: 'relative', right: "13px", width: "365px"}}>
                    <p style={{fontSize: "22px", marginTop: "4px"}}>$</p>
                    <input onChange={getCost} value={cost} className={styles.inputs} style={{width: "110px", marginLeft: "2px", marginRight: "50px"}} placeholder={"Product Cost"}/>
                    <SubmitButton onClick={addProduct}>Add Product</SubmitButton>
                </div>
                    

            </div>
            {products.length > 0 &&
            <div style={{display: 'flex', alignItems: "center", marginTop: "20px", flexDirection: "column"}}>
                    <p style={{fontSize: "18px", fontWeight: "bold", marginBottom: "15px"}}>Products:</p>
                    <Maplist name={true} delete={(name) => deleteProduct(name)} array={products}/>
            </div>
            }
            {products.length === 0 && <p style={{fontSize: "18px", fontWeight: "bold", marginTop: "20px"}}>You have no registered products!</p>}
            </div>

            <OtherAlert alertType={"success"} alertMessage={successMessage} showAlert={successMessage !== ""}/>
            <OtherAlert alertType={"fail"} alertMessage={error} showAlert={error !== ""} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        adminToken: state.authReducer.adminToken
    }
}

export default connect(mapStateToProps)(AddEditProducts);