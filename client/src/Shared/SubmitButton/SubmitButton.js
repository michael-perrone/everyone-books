import React from 'react';

const SubmitButton = (props) => {
    return <button style={{padding:'6px 8px', boxShadow: '0px 0px 3px black', border: 'none', fontSize: '14px', marginLeft: '10px' }} onClick={props.onClick}>{props.children}</button>
}

export default SubmitButton;