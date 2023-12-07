import React, {useState, useEffect} from 'react';
import styles from './Settings.module.css';
import BusinessSettings from './BusinessSettings/BusinessSettings';


function Settings() { // format
    const [selectedTab, setSelectedTab] = useState("Business");

    function clickTab(selected) {
        setSelectedTab(selected)
    }

    return (
        <div id={styles.bigSettingsContainer}>
            <div id={styles.sideBar}>
                <p id={selectedTab === "Business" ? styles.selectedTab : ""} onClick={() => clickTab("Business")} className={styles.tab}>Business</p>
                <p id={selectedTab === "Admin" ? styles.selectedTab : ""} onClick={() => clickTab("Admin")} className={styles.tab}>Admin</p>
                <p id={selectedTab === "Calendar" ? styles.selectedTab : ""} onClick={() => clickTab("Calendar")} className={styles.tab}>Calendar</p>
                <p id={selectedTab === "Location" ? styles.selectedTab : ""} onClick={() => clickTab("Location")} className={styles.tab}>Location</p>
                <p id={selectedTab === "Miscellaneous" ? styles.selectedTab : ""} onClick={() => clickTab("Miscellaneous")} className={styles.tab}>Miscellaneous</p>
                <p id={selectedTab === "Extras" ? styles.selectedTab : ""} onClick={() => clickTab("Extras")} className={styles.tab}>Extras</p>
            </div>
            <div>
                {selectedTab === "Business" && <BusinessSettings/>}
                
            </div>
        </div>
    )
}

export default Settings;