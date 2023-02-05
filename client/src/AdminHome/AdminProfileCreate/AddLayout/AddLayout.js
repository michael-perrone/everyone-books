import React from 'react';
import styles from './AddLayout.module.css';
import crop from "../../../BusinessSignup/RestaurantBuilder/crop.png";
import SubmitButton from "../../../Shared/SubmitButton/SubmitButton";
import rotate from "../../../BusinessSignup/RestaurantBuilder/rotate.png";
import Axios from 'axios';
import {connect} from 'react-redux';
import {getNum} from "../../../feutils/feutils";
import OtherAlert from '../../../OtherAlerts/OtherAlerts';


function AddLayout(props) {

    const box = React.useRef(null);
    const wholeScreen = React.useRef(null);
    const table = React.useRef(null);
    const [height, setHeight] = React.useState(600);
    const [width, setWidth] = React.useState(600);
    const [top, setTop] = React.useState();
    const [left, setLeft] = React.useState();
    const [showBlock, setShowBlock] = React.useState(true);
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
    const [successMessage, setSuccessMessage] = React.useState("");
    const [deletedTables, setDeletedTables] = React.useState([]);
    const [cNum, setCNum] = React.useState();


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
        if (tables.length === 0) {
            setRealTables([]);
        }
    }, [tables.length])


    React.useEffect(function () {
        Axios.get('/api/restaurant', {headers: {'x-auth-token': props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setHeight(response.data.restaurant.boxHeight);
                    setTables(response.data.restaurant.tables);
                    setCNum(response.data.restaurant.c);
                    setWidth(response.data.restaurant.boxWidth);
                }
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    },[]);


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

    function draggingTable() {
        if (moving !== table) {
            setMoving("table");
        }

    }

    function pointerIsMoving(e) {
        if (clickedDown) {
            setTranslate({x: translate.x + e.movementX, y: translate.y + e.movementY});
            const tableCords = table.current.getBoundingClientRect();
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
        const newTable = {height: tableHeight, width: tableWidth, left: left, top , id: cNum};
        console.log(newTable);
        console.log(top, left);
        newTables.push(newTable);
        setTables(newTables);
        setTranslate({x: 0, y: 0});
        setShowButton(false);
        setCNum(prevNum => {
            return prevNum + 1;
        })
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


    function toSetNumOfPeople(e) {
        setNumOfPeople(Number(e.target.value));
    }

    function deleteTable(id) {
        const cloneTables = [...tables];
        const tablesNeeded = cloneTables.filter(table => {
            if (table.id === id) {
                const newDeleted = [...deletedTables];
                newDeleted.push(table);
                setDeletedTables(newDeleted);
            }
            return table.id !== id;
        })
        setTables(tablesNeeded);
    }

    function sendTableInfo() {
        const tables = realTables;
        Axios.post('/api/restaurant/updateTables', {tables, cNum}, {headers: {'x-auth-token': props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setSuccessMessage("");
                    setTimeout(() => setSuccessMessage("Table layout successfully updated."), 200);
                }
            }
        )
    }

    return (
        <div ref={wholeScreen}>
            <div style={{alignItems: showBlock ? "flex-start" : "center"}} onDragOver={grabAny} id={styles.whole}>
                {showBlock && <div ref={box} id={styles.layoutBlock} style={{height: `${height}px`, width: `${width}px`}}>
                {showButton && <button id={styles.setTableButton} onClick={setTable} style={{position: "absolute", right: 0, top: "-40px", zIndex: 1002020}}>Set Table</button>}
                    <div draggable={false} onMouseLeave={pointerIsUp} onPointerUp={pointerIsUp} onMouseMove={pointerIsMoving} onPointerDown={pointerIsDown} id={'yoo'} style={{transform: `translateX(${translate.x}px) translateY(${translate.y}px)`, zIndex: 1000, position: "absolute", cursor: "grab", top: "-60px", right: `${-10 - (numOfPeople * 4)}px`, height: tableHeight * 2, width: tableWidth * 2, display: 'flex', justifyContent: "center", alignItems: "center"}}>
                       <div draggable={false} ref={table} style={{ backgroundColor: "rgb(249, 233, 249)", height: tableHeight, width: tableWidth, border: "2px solid #f9e9f9"}}></div>
                    </div>
                    <div style={{position: "absolute", top: "-50px"}}>
                        <button onClick={rotateTable} style={{backgroundColor: "transparent", border: "none", zIndex: 100000000}}><img src={rotate}></img></button>
                        <select onChange={toSetNumOfPeople} style={{position: "relative", top: '-12px', left: "30px", borderRadius: 0, border: "none", boxShadow: "0px 0px 2px #f9e9f9", backgroundColor: "white", height: "30px", width: "180px", fontSize: "18px"}}>
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
                    {(tables.length > 0 || deletedTables.length) > 0 && <button id={styles.finishButton} onClick={sendTableInfo} style={{border: "none", boxShadow: "0px 0px 2px #f9e9f9", height: "30px", width: "140px", fontWeight: "bold", fontSize: "18px", position: "absolute", bottom: "-45px", left: width / 2 - 50}}>Update Tables</button>}
                    {tables.map(table => {
                          return <div onDoubleClick={(id) => deleteTable(table.id)} ref={table} style={{ backgroundColor: "rgb(229, 229, 229)", height: table.height, width: table.width, position: "absolute", top: table.top, left: table.left, border: "2px solid #f9e9f9", display: "flex", justifyContent: "center", alignItems: "center"}}><p style={{fontSize: "20px", fontWeight: "bold"}}>{getNum(table.width, table.height)}</p></div>
                        })}
                    <div className={styles.divo} style={{width: "2px", height: height, position: "absolute", left: 0, top: 0}}></div>
                    <div className={styles.divo} style={{width: "2px", height: height, position: "absolute", right: 0, top: 0}}></div>
                    <div className={styles.divo} style={{width: width, height: "2px", position: "absolute", left: 0, top: 0}}></div>
                    <div className={styles.divo} style={{width: width, height: "2px", position: "absolute", left: 0, bottom: 0}}></div>
                </div>}
                
            </div>
            <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        admin: state.authReducer.admin,
        adminToken: state.authReducer.adminToken
    }
}


export default connect(mapStateToProps, null)(AddLayout)