import React from 'react';
import FakeNav from '../FakeNav/FakeNav';
import styles from './RestaurantBuilder.module.css';
import crop from './crop.png';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import rotate from './rotate.png';
import axios from 'axios';
import {connect} from 'react-redux';
import { RESTAURANT_SEND_HIT } from '../../actions/actions';
import { withRouter } from 'react-router';
import {ADMIN_REGISTER_SUCCESS} from '../../actions/actions';
import {getNum} from '../../feutils/feutils';

function RestaurantBuilder(props) {

    const box = React.useRef(null);
    const wholeScreen = React.useRef(null);
    const table = React.useRef(null);

    const [height, setHeight] = React.useState(600);
    const [width, setWidth] = React.useState(600);
    const [top, setTop] = React.useState();
    const [left, setLeft] = React.useState();
    const [showBlock, setShowBlock] = React.useState(false);
    const [buttonTitle, setButtonTitle] = React.useState("Get Started");
    const [moving, setMoving] = React.useState();
    const [translate, setTranslate] = React.useState({ x: 0, y: 0});
    const [clickedDown, setClickedDown] = React.useState(false);
    const [tableHeight, setTableHeight] = React.useState(30);
    const [tableWidth, setTableWidth] = React.useState(70);
    const [showButton, setShowButton] = React.useState(false);
    const [tables, setTables] = React.useState([]);
    const [numOfPeople, setNumOfPeople] = React.useState(2);
    const [tableId, setTableId] = React.useState(1);
    const [realTables, setRealTables] = React.useState([]);


    React.useEffect(function() {
        const newRealTables = [];
        const tablesCopy = [...tables];
        for (let i = 0; i < tablesCopy.length; i++) {
            const keys = Object.keys(tablesCopy[i]);
            const newRealTable = {};
            for (let t = 0; t < keys.length; t++) {
                if (keys[t] !== "current") {
                    newRealTable[keys[t]] = tablesCopy[i][keys[t]];
                }
            }
            newRealTables.push(newRealTable);
            setRealTables(newRealTables);
        }
    }, [tableId])

  

    React.useEffect(() => {
        if(showBlock) {
            setTop(box.current.offsetTop);
            setLeft(box.current.offsetLeft);
        }
        else {
            console.log(box)
        }
       
    }, [showBlock]);

  
    

    function grabAny(e) {
        if (moving === "right") {
            if (e.pageX !== 0) {
                setWidth(e.pageX - left);
            }
        }
        else if (moving === "bottom") {
            if (e.pageY !== 0) {
                // setHeight(height + (e.pageY - top)); 
                setHeight(e.pageY - top);
            } 
        }
        const tableCords = table.current.getBoundingClientRect();
        const boxCords = box.current.getBoundingClientRect();
        if (!showButton && tableCords.top > boxCords.top && tableCords.left > boxCords.left && tableCords.right < boxCords.right && tableCords.bottom < boxCords.bottom) {
            setShowButton(true);
        }
        else if (showButton && (tableCords.top < boxCords.top || tableCords.left < boxCords.left || tableCords.right > boxCords.right || tableCords.bottom > boxCords.bottom)) {
            setShowButton(false);
        }
    }

    function getStartedHit() {
        setShowBlock(true);
        setButtonTitle("Resume");
    }
    
    function helpHit() {
        setShowBlock(false)
    }


    function dragRight(e) {
        if (moving !== "right") {
            setMoving("right")
        }   
    }


    function dragBottom(e) {
        if (moving !== "bottom") {
            setMoving("bottom")
        }
    }

    function test(e) {
        console.log(e)
    }

    function pointerIsMoving(e) {
        if (clickedDown) {
            console.log(e.pageX);
            console.log(e.screenX);
            setTranslate({x: translate.x + e.movementX, y: translate.y + e.movementY});
            const tableCords = table.current.getBoundingClientRect();
            console.log(tableCords);
            const boxCords = box.current.getBoundingClientRect();
            if (!showButton && tableCords.top > boxCords.top && tableCords.left > boxCords.left && tableCords.right < boxCords.right && tableCords.bottom < boxCords.bottom) {
                setShowButton(true);
            }
            else if (showButton && (tableCords.top < boxCords.top || tableCords.left < boxCords.left || tableCords.right > boxCords.right || tableCords.bottom > boxCords.bottom)) {
                setShowButton(false);
            }
        }
    }

    function pointerIsDown(e) {
        if (!clickedDown) {
            setClickedDown(true);
        }
    }

    function pointerIsUp(e) {
        console.log("yoooo");
        if (clickedDown) {
            setClickedDown(false);
        }  
    }

    function setTable() {
        const newTables = [...tables];
        const tableCords = table.current.getBoundingClientRect();
        const boxCords = box.current.getBoundingClientRect();
        let left = tableCords.left - boxCords.left;
        const top = tableCords.top - boxCords.top;
        if (left % 20 >= 10) {
            console.log(left);
            left = left + (20 - (left % 20));
            console.log(left)
        }
        else {
            console.log(left)
            left = left - (left % 20);
            console.log(left);
        }
        const newTable = {height: tableHeight, width: tableWidth, left, top, id: tableId};
        newTables.push(newTable);
        setTables(newTables);
        setTranslate({x: 0, y: 0});
        setShowButton(false);
        const idPlusOne = tableId + 1;
        setTableId(idPlusOne);
    }

    function rotateTable() {
        const oldHeight = tableHeight;
        const oldWidth = tableWidth;
        setTableHeight(oldWidth);
        setTableWidth(oldHeight);
    }


    React.useEffect(() => {
        if (numOfPeople === 2) {
            setTableWidth(50);
            setTableHeight(35);
        }
        else if (numOfPeople === 4) {
            setTableWidth(65);
            setTableHeight(35);
        }
        else if (numOfPeople === 6) {
            setTableWidth(80);
            setTableHeight(35);
        }
        else if (numOfPeople === 8) {
            setTableWidth(95);
            setTableHeight(35);
        }
        else if (numOfPeople === 10) {
            setTableWidth(110);
            setTableHeight(35);
        }
        else if (numOfPeople === 12) {
            setTableWidth(125);
            setTableHeight(35);
        }
        else if (numOfPeople === 14) {
            setTableWidth(140);
            setTableHeight(35);
        }
        else if (numOfPeople === 16) {
            setTableWidth(155);
            setTableHeight(35);
        }
        else if (numOfPeople === 18) {
            setTableWidth(170);
            setTableHeight(35);
        }
        else if (numOfPeople === 20) {
            setTableWidth(185);
            setTableHeight(35);
        }

    }, [numOfPeople])

    // React.useEffect(function () {
    //     if (!props.adminInfoComplete || !props.businessInfoComplete || !props.kindBusinessCompleted || !props.businessScheduleComplete) {
    //         props.history.push("/registerBusiness");
    //     }
    // }, [props.adminInfoComplete, props.businessInfoComplete, props.kindBusinessCompleted, props.businessScheduleComplete])



    function toSetNumOfPeople(e) {
        setNumOfPeople(Number(e.target.value));
    }

    function deleteTable(id) {
        const cloneTables = [...tables];
        const tablesNeeded = cloneTables.filter(table => {
            return table.id !== id;
        })
        setTables(tablesNeeded);
    }

    function resetAll(){
        setTables([]);
        setTranslate({x:0, y:0});
        setShowButton(false)
    }

    React.useEffect(() => {
        if (props.admin) {
            if (props.admin.admin) {
                props.history.push(`/restaurant/${props.admin.admin.id}`);
            }
        }
    }, [props.admin])

    function sendTableInfo() {
        const dimensions = box.current.getBoundingClientRect();
        const allInfo = {
            adminInfo: props.adminInfo, businessInfo: props.businessInfo, schedule: props.businessSchedule,
            businessName: props.nameOfBusiness, typeOfBusiness: props.kindOfBusiness, eq: "y", boxHeight: dimensions.height, boxWidth: dimensions.width, tables: realTables
         }

         console.log(allInfo);
        axios.post('/api/adminSignup', allInfo).then(
            response => {
                if (response.data.token) {
                    props.adminRegister(response.data.token);
                }
            }
        )
    }

    return (
        <div ref={wholeScreen}>
            <FakeNav/>
            <div style={{alignItems: showBlock ? "flex-start" : "center"}} onDragOver={grabAny} id={styles.whole}>
               {showBlock && <button style={{border: "none", boxShadow: "0px 0px 2px black", backgroundColor: "white", height: "30px", width: "80px", fontWeight: "bold", fontSize: "18px", position: "absolute", right: 200, top: "15px"}} onClick={resetAll}>Reset</button>}
                {!showBlock && 
                <div id={styles.directions}>
                    <p id={styles.rBuilderHeader}>Welcome to EveryoneBooks Restaurant Builder!</p>
                    <p className={styles.subDirections}>You can use the EveryoneBooks Restaurant Builder to build the layout of your restaurant. Below are a list of directions to help you get started.</p>
                    <p className={styles.subDirections}>First, use the crop tools on the sides of the builder to determine the size you want your restaurant layout to be. If your restaurant is large, you can create more than one room.</p>
                    <p className={styles.subDirections}>Next, choose the correct table to drag into your layout by selecting how many people can potentially sit at this table. You can also flip this table vertically and horizontally.</p>
                    <p className={styles.subDirections}>Once you have chosen the correct table, drag the table into the layout. When you let go, a new a table will appear. Follow the steps above for each table.</p>
                    <p className={styles.subDirections}>After your layout is complete, make sure to hit the continue button at the bottom of the screen to finish signing up.</p>
                    <SubmitButton onClick={getStartedHit} marginTop={"20px"}>{buttonTitle}</SubmitButton>
                </div>
                }
                {showBlock && <button onClick={helpHit} style={{border: "none", boxShadow: "0px 0px 2px black", backgroundColor: "salmon", height: "30px", width: "80px", fontWeight: "bold", fontSize: "18px", position: "absolute", right: 100, top: "15px"}}>Help</button>}
                {showBlock && <div ref={box} id={styles.layoutBlock} style={{height: `${height}px`, width: `${width}px`}}>
                {showButton && <button id={styles.setTableButton} onClick={setTable} style={{position: "absolute", right: 0, top: "-40px", zIndex: 1002020}}>Set Table</button>}
                    <div draggable={false} onMouseLeave={pointerIsUp} onPointerUp={pointerIsUp} onMouseMove={pointerIsMoving} onPointerDown={pointerIsDown} id={'yoo'} style={{transform: `translateX(${translate.x}px) translateY(${translate.y}px)`, zIndex: 1000, position: "absolute", cursor: "grab", top: "-60px", right: `${-10 - (numOfPeople * 4)}px`, height: tableHeight * 2, width: tableWidth * 2, display: 'flex', justifyContent: "center", alignItems: "center"}}>
                       <div draggable={false} ref={table} style={{ backgroundColor: "rgb(249, 233, 249)", height: tableHeight, width: tableWidth, border: "2px solid black"}}></div>
                    </div>
                    <div style={{position: "absolute", top: "-50px"}}>
                        <button onClick={rotateTable} style={{backgroundColor: "transparent", border: "none", zIndex: 100000000}}><img src={rotate}></img></button>
                        <select onChange={toSetNumOfPeople} style={{position: "relative", top: '-12px', left: "30px", borderRadius: 0, border: "none", boxShadow: "0px 0px 2px black", backgroundColor: "white", height: "30px", width: "180px", fontSize: "18px"}}>
                            <option>Num of persons</option>
                            <option>2</option>
                            <option>4</option>
                            <option>6</option>
                            <option>8</option>
                            <option>10</option>
                            <option>12</option>
                            <option>14</option>
                            <option>16</option>
                            <option>18</option>
                            <option>20</option>
                        </select>      
                    </div>
                    {tables.length > 0 && <button onClick={sendTableInfo} style={{border: "none", boxShadow: "0px 0px 2px black", backgroundColor: "white", height: "30px", width: "100px", fontWeight: "bold", fontSize: "18px", position: "absolute", bottom: "-45px", left: width / 2 - 50}}>Finish up!</button>}
                    {tables.map(table => {
                          return <div onDoubleClick={(id) => deleteTable(table.id)} ref={table} style={{ backgroundColor: "rgb(229, 229, 229)", height: table.height, width: table.width, position: "absolute", top: table.top, left: table.left, border: "2px solid black", display: "flex", justifyContent: "center", alignItems: "center"}}><p style={{fontSize: "20px", fontWeight: "bold"}}>{getNum(table.width, table.height)}</p></div>
                        })}
                    <div className={styles.divo} style={{width: "2px", height: height, position: "absolute", left: 0, top: 0}}></div>
                    <div className={styles.divo} style={{width: "2px", height: height, position: "absolute", right: 0, top: 0}}>{tables.length === 0 && <button style={{position: "absolute", right: -12, top: height / 2 - 12}} onDragStart={dragRight} onDragEnd={test} draggable={true} className={styles.cornerButton}><img src={crop}></img></button>}</div>
                    <div className={styles.divo} style={{width: width, height: "2px", position: "absolute", left: 0, top: 0}}></div>
                    <div className={styles.divo} style={{width: width, height: "2px", position: "absolute", left: 0, bottom: 0}}>{tables.length === 0 && <button style={{position: "absolute", left: width / 2 - 12, top: -12}} onDragStart={dragBottom} draggable={true} className={styles.cornerButton}><img src={crop}></img></button>}</div>
                </div>}
                
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        restaurantSendNotHit: state.newReducers.restaurantSendNotHit,
        businessScheduleComplete: state.newReducers.businessScheduleComplete,
        businessInfoComplete: state.newReducers.businessInfoComplete,
        adminInfoComplete: state.newReducers.adminInfoComplete,
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness,
        adminInfo: state.newReducers.adminInfo,
        businessInfo: state.newReducers.businessInfo,
        businessSchedule: state.newReducers.businessSchedule,
        kindBusinessCompleted: state.newReducers.kindBusinessCompleted,
        showAdminDropDown: state.newReducers.showDropDown,
        admin: state.authReducer.admin
    }
}


const mapDispatchToProps = dispatch => {
    return {
        sendRestaurantHit: () => dispatch({type: RESTAURANT_SEND_HIT}),
        adminRegister: (adminToken) => dispatch({type: ADMIN_REGISTER_SUCCESS, payload: {adminToken}})
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantBuilder));