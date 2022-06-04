import React from 'react';


function SmallList(props) {
    return (
        <div style={{height: "100px", maxHeight: "100px", overflow: "auto", width: "180px"}}>
            {props.list.map(listItem => {
                return (
                    <p style={{textAlign: "center", width: "180px", borderBottom: ".5px solid black", paddingTop: ""}}>{listItem.fullName}</p>
                )
            })}
        </div>
    )
}

export default SmallList;