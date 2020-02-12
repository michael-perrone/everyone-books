import React from "react";
import styles from "./ServicesForm.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';

class ServicesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: "",
      servicesError: false,
      service: "",
      servicesArray: [],
      empty: "",
      successAlert: false,
      newProfileAlert: false,
      deletingArray: []
    };
    this.costHandler = this.costHandler.bind(this);
    this.addServices = this.addServices.bind(this);
    this.submitServices = this.submitServices.bind(this);
    this.serviceInputHandler = this.serviceInputHandler.bind(this);
    this.sendDeletes = this.sendDeletes.bind(this)
  }
  // parseInt

  componentDidUpdate(prevProps) {
    if (this.props.profile.serviceTypes && this.props.profile.serviceTypes.length && this.props.profile.serviceTypes !== prevProps.profile.serviceTypes) {
      Axios.post('/api/getServiceTypes', {serviceTypesArray: this.props.profile.serviceTypes}).then(
        response => {
          if (response.status === 200) {   
          this.setState({servicesArray: response.data.serviceTypesArray})
        }
       }
      )
    }
  }

  serviceInputHandler(event) {
    this.setState({service: event.target.value });
  }

  costHandler(e) {
    this.setState({cost: e.target.value})
  }

  addServices(event) {
    event.preventDefault();
    if (this.state.service !== "") {
      const newArray = [...this.state.servicesArray];
      newArray.push({serviceName: this.state.service, cost: parseFloat(this.state.cost)});
      this.setState({servicesArray: newArray });
      this.setState({service: "" });
      this.setState({cost: ""});
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
     services: this.state.servicesArray
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

  deleteService(id) {
   return () => {
      const newServicesArray = this.state.servicesArray.filter(service => service._id !== id);
      this.setState({servicesArray: newServicesArray})
      const newDeletingArray = [...this.state.deletingArray, id];
      this.setState({deletingArray: newDeletingArray})
    }
  }

  sendDeletes() {
    Axios.post('/api/getServiceTypes/delete', {deletedServices: this.state.deletingArray})
  }

  render() {
    console.log(this.state.servicesArray)
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
          placeholder="Service Name"
          value={this.state.service}
        />
        <input onChange={this.costHandler} style={{width:'50px', marginLeft: '10px', height: '28px', paddingLeft: '5px'}} placeHolder='Cost' value={this.state.cost}/>
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
              marginLeft: "70px",
              marginTop: "20px"
            }}
          >
            Submit All Services
          </button>
        </div>
        <ul style={{marginTop: '20px'}}>
        {this.state.servicesArray && this.state.servicesArray.length > 0 && this.state.servicesArray.map(serviceAdded => {
        return <li style={{listStyleType: 'disc', height: '24px' , paddingLeft: '10px'}}>{serviceAdded.serviceName} - ${serviceAdded.cost} <i style={{marginLeft: '6px', color: 'darkred', cursor: 'pointer'}} onClick={this.deleteService(serviceAdded._id)} class="fas fa-trash"></i></li>
        })}
        </ul>
        {this.state.deletingArray.length > 0 && <SubmitButton onClick={this.sendDeletes}>Update</SubmitButton>}
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
