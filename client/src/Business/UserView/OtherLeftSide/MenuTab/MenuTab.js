import React from 'react';
import styles from './MenuTab.module.css'

const MenuTab = props => {
    console.log(props.menu);
    return (
      props.menu.length > 0 ?
        <div id={styles.userMenuContainer}>
            {props.menu.map(menuCategory => {
                return <div style={{width: "260px", marginTop: "10px"}}>
                    <p style={{fontSize: "24px", marginTop: "10px", textAlign: "center"}}>{menuCategory.menuCategoryValue}</p>
                    {menuCategory.catItems.map(item => {
                        return <div style={{marginTop: "12px"}}>
                            <div style={{display: "flex"}}>
                            <p style={{fontWeight: "bold"}}>{item.name}</p>
                            <p style={{marginLeft: "20px"}}>${item.price}</p>
                            </div>
                            <p style={{marginTop: "4px"}}>{item.description}</p>
                        </div>
                    })}
                </div>
            })}
        </div>
        :
        <p style={{textAlign: "center", marginTop: "20px"}}>This business has not added its menu yet.</p>
    )
}

export default MenuTab;