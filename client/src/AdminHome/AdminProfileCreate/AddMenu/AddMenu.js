import React, {useState, useEffect} from 'react';
import styles from './AddMenu.module.css';
import {connect} from 'react-redux';
import axios from 'axios';
import otherAdd from './otheradd.png';
import OtherAlert from '../../../OtherAlerts/OtherAlerts';

function AddMenu(props) {
    const [menuCategories, setMenuCategories] = React.useState([]);
    const [singlePage, setSinglePage] = React.useState(true);
    const [businessName, setBusinessName] = React.useState("");
    const [menuCategoryValue, setMenuCategoryValue] = React.useState("");
    const [showMenuCategoryInput, setShowMenuCategoryInput] = React.useState(false);
    const [menuCategoryButtonValue, setMenuCategoryButtonValue] = React.useState("Add Category");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [addingMenuItem, setAddingMenuItem] = React.useState("");
    const [amiv, setAmiv] = useState("Add Menu Item");
    const [showInputs, setShowInputs] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [error, setError] = useState("");
    const [newCategories, setNewCategories] = useState([]);
    const [menu, setMenu] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [cheatNum, setCheatNum] = useState(1);
    const [heightNeeded, setHeightNeeded] = useState(600);
    const [allItems, setAllItems] = useState([]);
    const [showTo, setShowTo] = useState("");

    function handleItemPrice(e) {
        setItemPrice(e.target.value);
    }

    function handleItemName(e) {
        setItemName(e.target.value);
    }

    function handleItemDescription(e) {
        setItemDescription(e.target.value);
    }

    function manageMenuCategoryValue(e) {
        console.log("yooooo");
        setMenuCategoryValue(e.target.value);
        if (e.target.value !== "") {
            setMenuCategoryButtonValue("Save Category");
        }
        if (e.target.value === "") {
            setMenuCategoryButtonValue("Add Category");
            setShowMenuCategoryInput(false);
        }
    }

    function handleButton() {
        if (showMenuCategoryInput) {
            if (menuCategoryValue === "") {
                return;
            }
            axios.post("/api/restaurant/addMenuCategory", {menuCategoryValue}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
                if (response.status === 200) {
                    const menuCats = [...menuCategories];
                    menuCats.push({menuCategoryValue, catItems: []});
                    setMenuCategories(menuCats);
                    setShowMenuCategoryInput(false);
                    setMenuCategoryButtonValue("Add Category");
                    setSuccessMessage("");
                    setTimeout(() => setSuccessMessage("Menu Category added"), 200);
                }
            })
        }
        else {
            setMenuCategoryButtonValue("Save Category");
            setShowMenuCategoryInput(true);
        }
    }

    function addMenuItem(bigDog) {
        if (showTo !== "") {
            if (showTo !== bigDog) {
                setAddingMenuItem(true);
                setShowTo(bigDog);
                setShowInputs(true);
                return;
            }
        }
        if (!addingMenuItem) {
            setAmiv("Save Menu Item");
            setShowInputs(true);
            setShowTo(bigDog)
            setAddingMenuItem(true);
        }
        if (addingMenuItem) {
            if (parseInt(itemPrice).toString() === "NaN") {
                setError("");
                setTimeout(() => setError("Please enter price correctly."));
                return;
            }
            if (!itemName) {
                setError("");
                setTimeout(() => setError("Please enter item name."));
                return;
            }
            axios.post("/api/restaurant/addMenuItem", {name: itemName, price: itemPrice, description: itemDescription, index: selectedIndex}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
                if (response.status === 200) {
                    const oldMenuCategories = [...menuCategories];
                    oldMenuCategories[selectedIndex].catItems.push({name: itemName, price: itemPrice, description: itemDescription});
                    setMenuCategories(oldMenuCategories);
                    setSuccessMessage("");
                    setTimeout(() => setSuccessMessage("Menu Item added successfully"));
                    setShowInputs(false);
                    setAmiv("Add Menu Item");
                    setItemName("");
                    setItemPrice("");
                    setItemDescription("");
                    setAddingMenuItem(false);
                    let oldCheatNum = cheatNum;
                    oldCheatNum++;
                    setCheatNum(oldCheatNum);
                }
            }).catch(error => {
                setError("Menu Item Not Saved");
            })
        }
    }

    // function chooseCategory(cat, index) {
    //     setSelectedIndex(index);
    //     setShowInputs(false);
    //     setItemName("");
    //     setItemPrice("");
    //     setItemDescription("");
    //     setAmiv("Add Menu Item");
    //     setAddingMenuItem(false);
    // }

    
    useEffect(function() {
        axios.get('/api/restaurant/getMenu', {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200 || response.status === 304) {
                setMenuCategories(response.data.menu);
            }
        })
    }, [])


    return (
        <div id={styles.bigDog} style={{paddingBottom: "100px"}}>
            <div>
            <p style={{width: "360px", fontSize: "24px", fontFamily: "Josefin Sans", textAlign: "center", marginTop: "20px"}}>Restaurant Menu Builder</p>
            <ul style={{width: "360px", marginLeft: "30px", marginTop: "40px"}}>
            <li style={{lineHeight: "20px"}}>Welcome to the menu builder where you can create menu categories like dessert, dinner, drinks and more.</li>
            <li style={{marginTop: "14px", lineHeight: "20px"}}>After you create a category, you can add an individual item to that category. You will add an item name, an item price, and an item description.</li>
            <li style={{marginTop: "14px", lineHeight: "20px"}}>You can add as many sections as you want, the menu builder will add new pages so that you do not run out of room.</li>
            </ul>
            </div>
          
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", alignItems: "center", flexDirection: "column"}}>
            <div>
            {showMenuCategoryInput && <input style={{height: "24px", backgroundColor: "black", boxShadow: "0px 0px 4px #f9e9f9", marginLeft: "20px", paddingLeft: "4px", marginRight: "20px"}} onChange={manageMenuCategoryValue} value={menuCategoryValue} placeholder={"Enter Category Name"}/>}
            <button onClick={handleButton} id={styles.mcb} style={{border: "none", backgroundColor: "black", boxShadow: "0px 0px 2px #f9e9f9", height: "28px", fontSize: "16px", width: "120px"}}>{menuCategoryButtonValue}</button>
            </div>
            <div style={{display: "flex"}}>
            <div style={{display: "flex", justifyContent: "center", height: `${heightNeeded}px`}}>
                  <div id={styles.singlePage}>
                  {menuCategories.length > 0 &&
                   <div style={{display: "flex", width: "100%", flexDirection: "column"}}>
                    {/* <p style={{textAlign: "center", width: "100%", fontSize: "26px", fontFamily: "Josefin Sans", marginBottom: "18px"}}>{chosenCategory.menuCategoryValue}</p> */}
                    {menuCategories.map((catItem,index) => {
                        return <div style={{border: "1.5px solid #f9e9f9", paddingTop: "20px", paddingBottom: "20px"}}>
                            <p style={{width: "100%", textAlign: "center", fontSize: "24px", paddingBottom: "20px"}}>{catItem.menuCategoryValue}</p>
                            {catItem.catItems.map(item => {
                                return <div style={{backgroundColor: "rgb(40,40,40)", border: "0.5px solid #f9e9f9", padding: "20px"}}>
                                         <div style={{display: "flex", justifyContent: "space-between", marginBottom: "30px"}}><p style={{fontWeight: "bold"}}>{item.name}</p><p>${item.price}</p></div>
                                        <p style={{marginTop: "10px"}}>{item.description}</p>
                                    </div>
                            })}
                             {showInputs && showTo === catItem.menuCategoryValue && <div style={{marginLeft: "20px", marginTop: "8px"}}>
                        <div style={{display: "flex", marginTop: "20px"}}>
                            <input className={styles.inputs} onChange={handleItemName} value={itemName} placeholder="Item Name"/>
                            <p style={{marginLeft: "10px", fontWeight: "bold", marginTop: "4px", marginRight: "2px"}}>$</p><input onChange={handleItemPrice} style={{width: "70px"}} className={styles.inputs} value={itemPrice} placeholder="Item Price"/>
                       </div>
                        <textarea onChange={handleItemDescription} value={itemDescription} placeholder="Item Description" style={{marginTop: "15px", paddingLeft: "3px", fontFamily: "initial", width: "292px", border: "none", boxShadow: "0px 0px 4px #f9e9f9", backgroundColor: "black", resize: "none", paddingTop: "4px", paddingLeft: "4px"}} rows={4}/>
                        </div>}
                            <button className={styles.buttono} onClick={(bigDog) => addMenuItem(catItem.menuCategoryValue)} style={{border: "none", alignSelf: "flex-start", boxShadow: "0px 0px 3px #f9e9f9", height: "24px", fontSize: "12px", width: "100px", marginLeft: "20px", marginTop: "20px"}}>{addingMenuItem && showTo === catItem.menuCategoryValue ? "Save Menu Item" : "Add Menu Item"}</button> 
                        </div>
                    })}   

                </div>
            }
            </div>
            </div>
            </div>
            </div>
            <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
            <OtherAlert alertType={"fail"} alertMessage={error} showAlert={error !== ""}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.authReducer.admin,
        adminToken: state.authReducer.adminToken
    }
}



export default connect(mapStateToProps, null)(AddMenu);