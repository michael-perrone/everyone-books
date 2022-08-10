import React from 'react';
import styles from './MenuTab.module.css'

const MenuTab = props => {
    console.log(props.menu);
    return (
      props.menu.length > 0 ?
        <div id={styles.userMenuContainer}>
            {props.menu.map(menuCategory => {
                return <div style={{width: "200px", marginTop: "10px"}}>
                    <p style={{fontWeight: "bold", fontSize: "16px"}}>{menuCategory.menuCategoryName}</p>
                </div>
            })}
        </div>
        :
        <p style={{textAlign: "center", marginTop: "20px"}}>This business has no services.</p>
    )
}

export default MenuTab;