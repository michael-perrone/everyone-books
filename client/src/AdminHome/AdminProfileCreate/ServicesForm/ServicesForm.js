import React from "react";
import styles from "./ServicesForm.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";

class ServicesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesError: false,
      service: "",
      serviceArray: [],
      empty: "",
      successAlert: false,
      newProfileAlert: false
    };
    this.addServices = this.addServices.bind(this);
    this.submitServices = this.submitServices.bind(this);
    this.serviceInputHandler = this.serviceInputHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.profile.services && this.props.profile.services !== prevProps.profile.services) {
      this.setState({serviceArray: [...this.props.profile.services]})
    }
  }

  serviceInputHandler(event) {
    this.setState({service: event.target.value });
  }

  addServices(event) {
    event.preventDefault();
    if (this.state.service !== "") {
      const newArray = [...this.state.serviceArray];
      newArray.push(this.state.service);
      this.setState({serviceArray: newArray });
      this.setState({service: "" });
    } else {
      this.setState({ servicesError: true });
      setTimeout(() => this.setState({ servicesError: false }), 4400);
    }
  }

  submitServices(event) {
    this.setState({successAlert: false})
    this.setState({newProfileAlert: false})
    event.preventDefault();
    const objectToSend = {
     services: this.state.serviceArray
    };
    Axios.post("/api/businessProfile", objectToSend, {
      headers: { "x-auth-token": this.props.adminToken }
    }).then(response => {
      if (response.status === 200) {
        setTimeout(this.setState({ successAlert: true }), 200);
      }
      if (response.status === 201) {
        setTimeout(this.setState({newProfileAlert: true}), 200);
      }
    });
  }

  render() {
    console.log(this.props.profile)
    return (
      <div style={{ marginTop: "-5px" }}>
        <OtherAlert alertType={'success'} showAlert={this.state.newProfileAlert}
        alertMessage={"Services added and profile created!"}
        />
        <OtherAlert
          alertType={"success"}
          showAlert={this.state.successAlert}
          alertMessage={"Services successfuly updated"}
        />
        <OtherAlert
          alertType={"error"}
          showAlert={this.state.servicesError}
          alertMessage={"Please enter a service your business offers."}
        />
        <input
          onChange={this.serviceInputHandler}
          id={styles.otherServiceInput}
          placeholder="Enter Service"
          value={this.state.service}
        />
        <button
          onClick={this.addServices}
          style={{
            marginLeft: "10px",
            height: "33px",
            width: "40px"
          }}
        >
          Add
        </button>
        <div>
          <button
            onClick={this.submitServices}
            style={{
              width: "130px",
              height: "27px",
              marginLeft: "50px",
              marginTop: "20px"
            }}
          >
            Submit All Services
          </button>
        </div>
        <ul style={{marginTop: '20px'}}>
        {this.state.serviceArray && this.state.serviceArray.map(serviceAdded => {
        return <li style={{listStyleType: 'disc', height: '24px' , paddingLeft: '10px'}}>{serviceAdded}</li>
        })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminToken: state.authReducer.adminToken
  };
};

export default connect(mapStateToProps)(ServicesForm);
