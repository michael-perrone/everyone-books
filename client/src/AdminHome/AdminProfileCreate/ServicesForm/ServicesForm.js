import React from "react";
import styles from "./ServicesForm.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";

class ServicesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesForm: {
        tennisLessons: "",
        groupClinics: "",
        racquetStringing: "",
        summerProgram: "",
        tournaments: "",
        gym: ""
      },
      otherServicesError: false,
      otherServices: "",
      otherServicesArray: [],
      services: [],
      empty: "",
      successAlert: false
    };
    this.addServices = this.addServices.bind(this);
    this.changeRadios = this.changeRadios.bind(this);
    this.submitServices = this.submitServices.bind(this);
    this.serviceInputHandler = this.serviceInputHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    if (
      Object.keys(prevProps.profile).length === 0 &&
      prevProps.profile.constructor === Object &&
      this.props.profile.services &&
      this.props.profile.services.length > 0
    ) {
      let newServicesForm = { ...this.state.servicesForm };
      if (
        this.props.profile.services &&
        this.props.profile.services.length > 0
      ) {
        let name = [];
        this.props.profile.services.forEach(element => {
          name.push(Object.keys(element));
        });
        console.log(name);
        for (let i = 0; i < this.props.profile.services.length; i++) {
          if (this.props.profile.services[i][`${name[i]}`] === "Yes") {
            newServicesForm[`${name[i]}`] = "Yes";
          }
          if (this.props.profile.services[i][`${name[i]}`] === "No") {
            newServicesForm[`${name[i]}`] = "No";
          }
        }
        this.setState({ servicesForm: newServicesForm });
      }
    }
  }

  serviceInputHandler(event) {
    this.setState({ otherServices: event.target.value });
  }

  addServices(event) {
    event.preventDefault();
    if (this.state.otherServices !== "") {
      const newArray = [...this.state.otherServicesArray];
      newArray.push(this.state.otherServices);
      this.setState({ otherServicesArray: newArray });
      this.setState({ otherServices: "" });
    } else {
      this.setState({ otherServicesError: true });
      setTimeout(() => this.setState({ otherServicesError: false }), 4400);
    }
  }

  changeRadios(event) {
    const newStateObject = { ...this.state.servicesForm };
    newStateObject[event.target.name] = event.target.value;
    this.setState({ servicesForm: newStateObject });
  }

  submitServices(event) {
    event.preventDefault();
    let newServicesArray = [];
    if (this.state.servicesForm.tennisLessons !== "") {
      newServicesArray.push({
        tennisLessons: this.state.servicesForm.tennisLessons
      });
    } else {
      this.setState({ empty: true });
    }
    if (this.state.servicesForm.groupClinics !== "") {
      newServicesArray.push({
        groupClinics: this.state.servicesForm.groupClinics
      });
    } else {
      this.setState({ empty: true });
    }
    if (this.state.servicesForm.racquetStringing !== "") {
      newServicesArray.push({
        racquetStringing: this.state.servicesForm.racquetStringing
      });
    } else {
      this.setState({ empty: true });
    }
    if (this.state.servicesForm.summerProgram !== "") {
      newServicesArray.push({
        summerProgram: this.state.servicesForm.summerProgram
      });
    } else {
      this.setState({ empty: true });
    }
    if (this.state.servicesForm.gym !== "") {
      newServicesArray.push({ gym: this.state.servicesForm.gym });
    } else {
      this.setState({ empty: true });
    }
    if (this.state.servicesForm.tournaments !== "") {
      newServicesArray.push({
        tournaments: this.state.servicesForm.tournaments
      });
    } else {
      this.setState({ empty: true });
    }
    const objectToSend = {
      services: newServicesArray,
      otherServices: this.state.otherServicesArray
    };
    Axios.post("/api/clubProfile", objectToSend, {
      headers: { "x-auth-token": this.props.adminToken }
    }).then(response => {
      if (response.status === 200) {
        this.setState({ successAlert: true });
        setTimeout(() => this.setState({ successAlert: false }), 4400);
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: "-5px" }}>
        <OtherAlert
          alertType={"success"}
          showAlert={this.state.successAlert}
          alertMessage={"Services successfuly updated"}
        />
        <OtherAlert
          alertType={"error"}
          showAlert={this.state.otherServicesError}
          alertMessage={"Please enter a service your club offers."}
        />
        <p className={styles.servicesP}>
          Does your club offer Private Tennis Lessons?
        </p>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="tennisLessons"
          type="radio"
          value="Yes"
          id="Yes1"
          checked={this.state.servicesForm.tennisLessons === "Yes"}
        />
        <label className={styles.labell} htmlFor="Yes1">
          Yes
        </label>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="tennisLessons"
          type="radio"
          value="No"
          id="No1"
          checked={this.state.servicesForm.tennisLessons === "No"}
        />
        <label className={styles.labell} htmlFor="No1">
          No
        </label>
        <p className={styles.servicesP}>Does your club offer Group Clinics?</p>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="groupClinics"
          type="radio"
          value="Yes"
          id="Yes2"
          checked={this.state.servicesForm.groupClinics === "Yes"}
        />
        <label className={styles.labell} htmlFor="Yes2">
          Yes
        </label>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="groupClinics"
          type="radio"
          value="No"
          id="No2"
          checked={this.state.servicesForm.groupClinics === "No"}
        />
        <label className={styles.labell} htmlFor="No2">
          No
        </label>
        <p className={styles.servicesP}>
          Does your club offer Racquet Stringing?
        </p>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="racquetStringing"
          type="radio"
          value="Yes"
          id="Yes3"
          checked={this.state.servicesForm.racquetStringing === "Yes"}
        />
        <label className={styles.labell} htmlFor="Yes3">
          Yes
        </label>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="racquetStringing"
          type="radio"
          value="No"
          id="No3"
          checked={this.state.servicesForm.racquetStringing === "No"}
        />
        <label className={styles.labell} htmlFor="No3">
          No
        </label>
        <p className={styles.servicesP}>
          Does your club offer a Summer Camp/Program for children?
        </p>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="summerProgram"
          type="radio"
          value="Yes"
          id="Yes4"
          checked={this.state.servicesForm.summerProgram === "Yes"}
        />
        <label className={styles.labell} htmlFor="Yes4">
          Yes
        </label>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="summerProgram"
          type="radio"
          value="No"
          id="No4"
          checked={this.state.servicesForm.summerProgram === "No"}
        />
        <label className={styles.labell} htmlFor="No4">
          No
        </label>
        <p className={styles.servicesP}>Does your club have a Gym?</p>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="gym"
          type="radio"
          value="Yes"
          id="Yes5"
          checked={this.state.servicesForm.gym === "Yes"}
        />
        <label className={styles.labell} htmlFor="Yes5">
          Yes
        </label>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="gym"
          type="radio"
          value="No"
          id="No5"
          checked={this.state.servicesForm.gym === "No"}
        />
        <label className={styles.labell} htmlFor="No5">
          No
        </label>
        <p className={styles.servicesP}>Does your club offer tournaments?</p>
        <input
          onChange={this.changeRadios}
          name="tournaments"
          className={styles.radio}
          type="radio"
          value="Yes"
          id="Yes6"
          checked={this.state.servicesForm.tournaments === "Yes"}
        />
        <label className={styles.labell} htmlFor="Yes6">
          Yes
        </label>
        <input
          onChange={this.changeRadios}
          className={styles.radio}
          name="tournaments"
          type="radio"
          value="No"
          id="No6"
          checked={this.state.servicesForm.tournaments === "No"}
        />
        <label className={styles.labell} htmlFor="No6">
          No
        </label>
        <p style={{ borderBottom: "none" }} className={styles.servicesP}>
          Is there any other services your club offers?
        </p>
        <input
          onChange={this.serviceInputHandler}
          id={styles.otherServiceInput}
          placeholder="Other Service"
          value={this.state.otherServices}
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
              marginTop: "6px"
            }}
          >
            Submit All Services
          </button>
        </div>
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
