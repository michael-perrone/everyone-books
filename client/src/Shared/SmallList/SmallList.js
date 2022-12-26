import React from 'react';


function SmallList(props) {
    return (
        <div style={{height: "90px", maxHeight: "90px", overflow: "auto", width: "180px"}}>
            {props.list && props.list.map(listItem => {
                console.log(props.list);
                return (
                    <p style={{textAlign: "center", width: "180px", borderBottom: ".5px solid black", paddingTop: ""}}>{listItem.fullName}</p>
                )
            })}
        </div>
    )
}

export default SmallList;