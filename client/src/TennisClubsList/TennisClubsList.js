import React from "react";
import axios from "axios";
import TennisClubInList from "./TennisClubInList/TennisClubInList";
import styles from "./TennisClubsList.module.css";
import { withRouter } from "react-router-dom";

import LocationModal from "./LocationModal/LocationModal";
import { connect } from "react-redux";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import OtherAlert from "../OtherAlerts/OtherAlerts";

class TennisClubsList extends React.Component {
  constructor() {
    super();
    this.state = {
      tennisClubs: [],
      stateLocation: "",
      locationGiven: false,
      showLocationModal: false,
      locationDenied: false,
      townLocation: "",
      searchError: ""
    };
    this.advancedSearchFunction = this.advancedSearchFunction.bind(this);
  }

 

  advancedSearchFunction(city, state, zip, clubName) {
    return event => {
      event.preventDefault();
      const objectToSend = {
        city,
        state,
        zip,
        clubName
      };
      this.setState({ searchError: "" });
      axios
        .post("/api/clubsList/clubSearch", objectToSend, {
          headers: { "x-auth-token": this.props.token }
        })
        .then(response => {
          this.setState({ tennisClubs: response.data.tennisClubsBack });
          this.setState({ advancedSearchHit: true });
        })
        .catch(error => {
          if (error.response.status === 406) {
            this.setState({ searchError: error.response.data.message });
          }
        });
    };
  }

  
  

  render() {
    return (
      <div id={styles.clubsContainer}>
        {this.state.showLocationModal === true && (
          <LocationModal
            getLocation={this.getLocation}
            locationDenied={this.locationDenied}
          />
        )}

        <AdvancedSearch advancedSearchFunction={this.advancedSearchFunction} />
        <div
          style={{
            height: this.state.tennisClubs.length > 1 ? "" : "100vh",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            backgroundColor: "rgb(217,217,217)"
          }}
        >
          <OtherAlert
            showAlert={this.state.searchError !== "" ? true : false}
            alertMessage={this.state.searchError}
            alertType={"error"}
          />
          {this.state.tennisClubs.map(element => {
            return (
              <TennisClubInList
                club={element.club}
                profileInfo={element.profile}
                push={this.props.history.push}
                key={element._id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    admin: state.authReducer.admin,
    instructor: state.authReducer.instructor,
    token: state.authReducer.token
  };
};

export default withRouter(connect(mapStateToProps)(TennisClubsList));
