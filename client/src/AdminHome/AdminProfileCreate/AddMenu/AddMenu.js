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
    const [chosenCategory, setChosenCategory] = useState();

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
                    if (menuCats.length === 1) {
                        setChosenCategory(menuCats[0]);
                    }
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

    function addMenuItem() {
        if (!addingMenuItem) {
            setAmiv("Save Menu Item");
            setShowInputs(true);
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
            console.log(selectedIndex);
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

    function chooseCategory(cat, index) {
        setChosenCategory(cat);
        setSelectedIndex(index);
        setShowInputs(false);
        setItemName("");
        setItemPrice("");
        setItemDescription("");
        setAmiv("Add Menu Item");
        setAddingMenuItem(false);
    }

    
    useEffect(function() {
        axios.get('/api/restaurant/getMenu', {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200 || response.status === 304) {
                setChosenCategory(response.data.menu[0]);
                setMenuCategories(response.data.menu);
            }
        })
    }, [])


    return (
        <div style={{paddingBottom: "100px"}}>
            <p>Welcome to the EveryoneBooks Menu Builder. You can create your menu for your restaurant here for all of your customers to see.</p>
            <p style={{marginTop: "10px"}}>1. Create a section of items that belong to a single category. For example: lunch, dessert, dinner, beverages etc.</p>
            <p>2. Create individual menu items for that section by clicking on the plus sign in that section. You can add a description and price.</p>
            <p>3. You can add as many sections as you want, the menu builder will add new pages so that you do not run out of room.</p>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", alignItems: "center", flexDirection: "column"}}>
            <div>
            {showMenuCategoryInput && <input style={{height: "24px", marginLeft: "20px", paddingLeft: "4px", marginRight: "20px"}} onChange={manageMenuCategoryValue} value={menuCategoryValue} placeholder={"Enter Category Name"}/>}
            <button onClick={handleButton} id={styles.mcb} style={{border: "none", boxShadow: "0px 0px 2px #f9e9f9", height: "28px", fontSize: "16px", width: "120px"}}>{menuCategoryButtonValue}</button>
            </div>
            <div style={{display: "flex"}}>
            <div style={{width: "200px"}}>
                <p style={{marginBottom: "20px", fontWeight: "bold", textAlign: "center"}}>Menu Categories</p>
                {menuCategories.map((mc,index) => {
                    return <div className={styles.selectors} style={{borderBottom: "1.5px solid #f9e9f9"}} onClick={() => chooseCategory(mc, index)}><p style={{textAlign: "center", paddingTop: "15px", paddingBottom: "15px", backgroundColor: mc === chosenCategory ? "rgb(24,24,24)" : ""}}>{mc.menuCategoryValue}</p></div>
                })}
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", height: `${heightNeeded}px`}}>
                  <div id={styles.singlePage}>
                  {menuCategories.length > 0 &&
                   <div style={{display: "flex", marginTop: "12px", width: "100%", flexDirection: "column"}}>
                <div style={{width: "100%"}}>
                    <p style={{textAlign: "center", width: "100%", fontSize: "26px", fontFamily: "Josefin Sans", marginBottom: "18px"}}>{chosenCategory.menuCategoryValue}</p>
                    {chosenCategory.catItems.map((catItem,index) => {
                        return <div style={{marginLeft: "20px", marginTop: index === 0 ? "" : "18px"}}>
                            <div style={{display: "flex"}}><p style={{fontWeight: "bold", marginRight: "20px"}}>{catItem.name}</p><p>${catItem.price}</p></div>
                            <p style={{width: "350px", marginTop: "10px"}}>{catItem.description}</p>
                        </div>
                    })}
                    {showInputs && <div style={{marginLeft: "20px", marginTop: "8px"}}>
                        <div style={{display: "flex"}}>
                            <input className={styles.inputs} onChange={handleItemName} value={itemName} placeholder="Item Name"/>
                            <p style={{marginLeft: "10px", fontWeight: "bold", marginTop: "4px", marginRight: "2px"}}>$</p><input onChange={handleItemPrice} style={{width: "70px"}} className={styles.inputs} value={itemPrice} placeholder="Item Price"/>
                       </div>
                        <textarea onChange={handleItemDescription} value={itemDescription} placeholder="Item Description" style={{marginTop: "15px", paddingLeft: "3px", fontFamily: "initial", width: "292px"}} rows={4}/>
                        </div>}
                    <button onClick={addMenuItem} style={{border: "none", alignSelf: "flex-start", boxShadow: "0px 0px 2px #f9e9f9", height: "24px", fontSize: "12px", width: "100px", backgroundColor: "lightgreen", marginLeft: "20px", marginTop: "20px"}}>{amiv}</button> 
                </div>
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