import React, {useEffect} from 'react';
import styles from './UserRestaurant.module.css';
import OtherLeftSide from '../OtherLeftSide/OtherLeftSide.js'
import BookTable from '../BookTable/BookTable';
import axios from "axios";


function UserRestaurant(props) {

    return (
        <div id={styles.urContainer}>
            <OtherLeftSide business={props.business} profile={props.profile} schedule={props.business.schedule}/>
            <BookTable business={props.business}/>
        </div>
    )
}



export default UserRestaurant;