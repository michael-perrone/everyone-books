import React, { useEffect, useState } from 'react';

const Chatty = (props) => {

    const [chatsSent, setChatsSent] = useState([]);
    const [chatText, setChatText] = useState('');
    const [introText, setIntroText] = useState("");
    const helloArray = ["h","e","l","l","o"];
    const [str, setStr] = useState('');

    // create cool animation

    useEffect(function () {
        setInterval(() => console.log("hello"), 1000);
    }, [])
      

    return (
        <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column", position: 'fixed', right: 10, bottom: 0, height: "400px", width: "450px", border: "1.7px solid black", backgroundColor: "lavenderblush", zIndex: 300}}>
            <div>
                <p style={{color: "black"}}>{str}</p>
            </div>
            <textarea style={{color: "black", height: "100px", resize: 'none', position: 'relative', width: "448px", left: "-1px"}}/>
        </div>
    )
}

export default Chatty;