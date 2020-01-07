import React from 'react';
import styles from './Alert.module.css';

class Alert extends React.Component {
render() {
    return (
            <p style={{top: this.props.top, right: this.props.right, left: this.props.left }}
             id={styles.alert}>
             {this.props.alertPhrase}
             </p>
    )
}
}
Alert.defaultProps = {top: "22px", right: "5%"}

export default Alert;