import React from "react";
import styles from "./ServicesForm.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";

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
      deletingArray: [],
      timeDuration: "",
      deleteSuccess: false,
      timeDuration: "",
      timeDurationLength: "",

    };
    this.timeDurationLengthHandler = this.timeDurationLengthHandler.bind(this);
    this.costHandler = this.costHandler.bind(this);
    this.addServices = this.addServices.bind(this);
    this.serviceInputHandler = this.serviceInputHandler.bind(this);
    this.sendDeletes = this.sendDeletes.bind(this)
    this.restoreService = this.restoreService.bind(this)
  }

  timeDurationHandler(trueOrFalse) {
    return () => { 
    this.setState({timeDuration: trueOrFalse})
    }
  }

  timeDurationLengthHandler(e) {
    this.setState({timeDurationLength: e.target.value})
  }

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
    this.setState({servicesError: false})
    event.preventDefault();
    if (this.state.service !== "") {
      this.setState({successAlert: false})
      this.setState({newProfileAlert: false})
      const service = {
       serviceName: this.state.service, cost: this.state.cost, timeDuration: this.state.timeDurationLength
      };
      Axios.post("/api/services/create", service, {
        headers: { "x-auth-token": this.props.adminToken }
      }).then(response => {
        if (response.status === 200) {
          setTimeout(this.setState({ successAlert: true }), 200);
        }
        if (response.status === 201) {
          setTimeout(this.setState({newProfileAlert: true}), 200);
        }
      
      let newArrayOfServices = [response.data.newServiceType, ...this.state.servicesArray]
      this.setState({servicesArray: newArrayOfServices});
      this.setState({service: "" });
      this.setState({cost: ""});
    });
    } else {
      setTimeout(() => this.setState({ servicesError: true }), 420)
    }
  }

  deleteService(id) {
   return () => {
      const newToBeServicesArray = [...this.state.servicesArray];
      const newServicesArray = newToBeServicesArray.filter(service => service._id !== id._id );
      this.setState({servicesArray: newServicesArray})
      const newToBeDeletingArray = [...this.state.deletingArray]
      const newDeletingArray = [...newToBeDeletingArray, id];
      console.log(newDeletingArray)
      this.setState({deletingArray: newDeletingArray})
    }
  }

  sendDeletes() {
    this.setState({deleteSuccess: false})
    const deleteIds = [];
    for (let i = 0; i < this.state.deletingArray.length; i++) {
      deleteIds.push(this.state.deletingArray[i]._id)
    }
    Axios.post('/api/getServiceTypes/delete', {deletedServices: deleteIds}).then(
      response => {
        if (response.status === 200) {
          setTimeout(() => this.setState({deleteSucces: true}),400)
        }
      }
    )
    this.setState({deletingArray: []})
  }

  restoreService(beingRestored) {
    return () => {
    const newToBeServicesArray = [...this.state.servicesArray]
    const newServicesArray = [...newToBeServicesArray, beingRestored ]
    this.setState({servicesArray: newServicesArray})
    const newToBeDeletingArray = [...this.state.deletingArray];
    const newDeletingArray = newToBeDeletingArray.filter(deleting => deleting._id !== beingRestored._id)
    this.setState({deletingArray: newDeletingArray})
    }
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
          alertType={"success"}
          showAlert={this.state.deleteSucces}
          alertMessage={"Services successfuly deleted"}
        />
        <OtherAlert
          alertType={"error"}
          showAlert={this.state.servicesError}
          alertMessage={"Please enter a service your business offers."}
        />
        <div>
        <input
          onChange={this.serviceInputHandler}
          id={styles.otherServiceInput}
          placeholder="Service Name"
          value={this.state.service}
        />
        
        <input onChange={this.costHandler} style={{width:'50px', marginLeft: '10px', height: '28px', position: 'relative', top: '-1px', paddingLeft: '5px', boxShadow: '0px 0px 1px black'}} placeHolder='Cost' value={this.state.cost}/>
        </div>
        <div>
          <p style={{marginTop: '10px'}}>Does this service have a time duration?</p>
        </div>
        <div>
          <input onClick={this.timeDurationHandler(true)} style={{marginLeft: '24px', marginTop: '8px'}} type="radio" name="Time" id="Yes"/><label onSelect={this.timeDurationHandler(false)} style={{marginLeft:'6px'}} htmlFor="Yes">Yes</label><input onClick={this.timeDurationHandler(false)} name="Time" id="No" style={{marginLeft: '80px'}} type="radio"/><label style={{marginLeft: '8px'}} htmlFor="No">No</label>
          {this.state.timeDuration && ( 
          <div style={{display: 'flex', marginTop: '8px'}}>
            <p style={{marginLeft: '5px'}}>Time Duration: </p> 
              <select onChange={this.timeDurationLengthHandler} style={{marginLeft: '10px'}}>
                <option> </option>
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>45 Minutes</option>
                <option>1 Hour</option>
                <option>1 Hour 15 Minutes</option>
                <option>1 Hour 30 Minutes</option>
                <option>1 Hour 45 Minutes</option>
                <option>2 Hours</option>
                <option>2 Hours 15 Minutes</option>
                <option>2 Hours 30 Minutes</option>
                <option>2 Hours 45 Minutes</option>
                <option>3 Hours</option>
                <option>3 Hours 15 Minutes</option>
                <option>3 Hours 30 Minutes</option>
                <option>3 Hours 45 Minutes</option>
                <option>4 Hours</option>
                <option>4 Hours 15 Minutes</option>
                <option>4 Hours 30 Minutes</option>
                <option>4 Hours 45 Minutes</option>
                <option>5 Hours</option>
              </select>
          </div>
          )}
          {this.state.service && this.state.cost && (this.state.timeDuration && this.state.timeDurationLength || this.state.timeDuration === false) && (
          <button
          onClick={this.addServices}
          style={{
            marginLeft: '65px',
            marginTop: '10px',
            height: "33px",
            width: "120px"
          }}
        >
          Add Service
        </button> 
          )}
        </div>
        <ul style={{marginTop: '20px'}}>
        {this.state.servicesArray.length > 0 && <p style={{marginBottom: '14px', textDecoration: 'underline', position: 'relative', left: '-14px', textAlign: 'center'}}>Existing Services:</p> }
        {this.state.servicesArray && this.state.servicesArray.length > 0 && this.state.servicesArray.map(serviceAdded => {
        return <li style={{listStyleType: 'disc', height: '24px' , paddingLeft: '10px'}}>{serviceAdded.serviceName} - ${serviceAdded.cost} <i style={{marginLeft: '6px', color: 'darkred', cursor: 'pointer'}} onClick={this.deleteService(serviceAdded)} class="fas fa-trash"></i></li>
        })}
        </ul>
        <ul>
          {this.state.deletingArray.length !== 0 && <p style={{marginBottom: '14px', textDecoration: 'underline', position: 'relative', left: '-14px', textAlign: 'center'}}>Services To Delete:</p>}
          {this.state.deletingArray.map(deletedService => <li>{deletedService.serviceName}<i style={{marginLeft:'5px', color: 'green'}} className="fas fa-trash-restore" onClick={this.restoreService(deletedService)}></i></li>)}
          </ul>
        {this.state.deletingArray.length > 0 &&  <div style={{marginTop: '30px', width: '100%', display: 'flex', position: 'relative', left: '-14px', justifyContent: 'center'}}><button disabled={this.state.deletingArray.length === 0} style={{cursor: this.state.deletingArray.length < 1 ? 'not-allowed' : "pointer", padding: '4px 8px', border: 'none', boxShadow: '0px 0px 3px black'}} onClick={this.sendDeletes}>Remove Services</button></div>}
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
