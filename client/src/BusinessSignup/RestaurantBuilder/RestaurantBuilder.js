import React from 'react';
import FakeNav from '../FakeNav/FakeNav';
import styles from './RestaurantBuilder.module.css';
import crop from './crop.png';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';

function RestaurantBuilder() {

    const box = React.useRef(null);
    const wholeScreen = React.useRef(null);

    const [height, setHeight] = React.useState(600);
    const [width, setWidth] = React.useState(600);
    const [top, setTop] = React.useState();
    const [left, setLeft] = React.useState();
    const [right, setRight] = React.useState();
    const [bottom, setBottom] = React.useState();
    const [showBlock, setShowBlock] = React.useState(false);
    const [buttonTitle, setButtonTitle] = React.useState("Get Started");
    const [moving, setMoving] = React.useState();

    React.useEffect(() => {
        if(showBlock) {
            setTop(box.current.offsetTop);
            setLeft(box.current.offsetLeft);
            setRight(window.innerWidth - box.current.offsetLeft - width);
            setBottom(wholeScreen.current.clientHeight - height - box.current.offsetTop);
        }
        else {
            console.log(box)
        }
    }, [showBlock]);

    

    function grabAny(e) {
        console.log(e.pageY);
        if (moving === "top") {
            if (e.pageY !== 0) {
                setHeight(height - top - e.pageY);
              
            } 
        }
        else if (moving === "left") {
            if (e.pageX !== 0) {
                console.log(e.pageX, "X");
            }
        }
        else if (moving === "right") {
            if (e.pageX !== 0) {
                console.log(e.pageX, "X");
            }
        }
        else if (moving === "bottom") {
            if (e.pageY !== 0) {
                console.log(e.pageY, "Y");
            } 
        }
    
    }

    function getStartedHit() {
        setShowBlock(true);
        setButtonTitle("Resume");
    }
    
    function helpHit() {
        setShowBlock(false)
    }

    function dragLeft() {
        setMoving("left")
    }

    function dragRight() {
        setMoving("right")
    }

    function dragTop() {
        setMoving("top")
    }

    function dragBottom() {
        setMoving("bottom")
    }
    

    return (
        <div ref={wholeScreen}>
            <FakeNav/>
            <div onDragOver={grabAny} id={styles.whole}>
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
                    <div draggable={true} id={styles.fakeTable} draggable={true} style={{position: "absolute", cursor: "grab", top: "-40px", height: "30px", width: "70px", backgroundColor: "white", border: "2px solid black", right: "0px"}}></div>
                    <div draggable={true} className={styles.divo} style={{width: "2px", height: height, position: "absolute", left: 0, top: 0}}><button style={{position: "absolute", left: -10, top: height / 2}} className={styles.cornerButton}><img onDrag={dragLeft} src={crop}></img></button></div>
                    <div draggable={true} className={styles.divo} style={{width: "2px", height: height, position: "absolute", right: 0, top: 0}}><button style={{position: "absolute", right: -12, top: height / 2}}  className={styles.cornerButton}><img onDrag={dragRight} src={crop}></img></button></div>
                    <div draggable={true} className={styles.divo} style={{width: width, height: "2px", position: "absolute", left: 0, top: 0}}><button style={{position: "absolute", left: width / 2, bottom: -12 }}  className={styles.cornerButton}><img onDrag={dragTop} src={crop}></img></button></div>
                    <div draggable={true} className={styles.divo} style={{width: width, height: "2px", position: "absolute", left: 0, bottom: 0}}><button style={{position: "absolute", left: width / 2, top: -12}}  className={styles.cornerButton}><img onDrag={dragBottom} src={crop}></img></button></div>
                </div>}
            </div>
        </div>
    )
}


export default RestaurantBuilder;