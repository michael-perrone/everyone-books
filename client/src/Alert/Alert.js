import React from 'react';
import styles from './Alert.module.css';

class Alert extends React.Component {
render() {
    return (
            <p  style={{bottom: this.props.bottom, top: this.props.top, right: this.props.right, left: this.props.left, position: this.props.position ? this.props.position : "absolute" }}
             id={styles.alert}>
             {this.props.alertPhrase}
             </p>
    )
}
}
Alert.defaultProps = {top: "22px", right: "5%"}

export default Alert;