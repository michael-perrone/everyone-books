import React from 'react';

function Container (props) {
    return (
        <div style={{height: props.height, width: props.width, boxShadow: "0px 0px 2px black", backgroundColor: props.backgroundColor}}>
            {props.children}
        </div>
    )
}


export default Container;