import React from 'react';

const About = props => { 
    return (
        <div style={{padding: '30px'}}>
            {props.bio && <p>{props.bio}</p>}
            {!props.bio && <p>This business has not added a bio yet.</p>}
        </div>
    )
}

export default About;