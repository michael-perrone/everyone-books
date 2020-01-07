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
    this.getLocation = this.getLocation.bind(this);
    this.locationDenied = this.locationDenied.bind(this);
    this.advancedSearchFunction = this.advancedSearchFunction.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/getUserLocationInfo", {
        headers: { "x-auth-token": this.props.token }
      })
      .then(response => {
        if (response.data.locationDenied === true) {
          this.getLocation();
          this.setState({ locationDenied: true });
          this.setState({ showLocationModal: true });
        }
        if (response.data.userLocationSaved === true) {
          this.setState({ locationGiven: true });
          this.setState({ stateLocation: response.data.userState });
          this.setState({ stateTown: response.data.userTown });
          axios
            .get("/api/clubsList/clubsFromSavedLocation", {
              headers: { "x-auth-token": this.props.token }
            })
            .then(response => {
              this.setState({ tennisClubs: response.data.clubsFromLocation });
            });
        }
        if (
          !response.data.userLocationSaved &&
          response.data.locationDenied === false
        ) {
          this.setState({ showLocationModal: true });
        }
      });
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

  locationDenied() {
    this.setState({ showLocationModal: false });
    this.setState({ locationDenied: true });
    if (this.props.user) {
      axios
        .post("/api/saveLocation", {
          user: this.props.user,
          locationSaved: false,
          locationDenied: true
        })
        .then(response => {
          // waiting for this
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getLocation() {
    try {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ showLocationModal: false });
        axios
          .get(
            `http://open.mapquestapi.com/geocoding/v1/reverse?key=${"enLuN7AK1OntX9nEbhnGO5uGqx04OtfP"}&location=${
              position.coords.latitude
            },${position.coords.longitude}`
          )
          .then(
            function(response) {
              // shortening stateLocationVariable to SLV for if else. definitely not best practice but
              // since im working alone shouldnt be an issue

              const CLV = response.data.results[0].locations[0].adminArea5;
              const SLV = response.data.results[0].locations[0].adminArea3;

              if (SLV === "NJ") {
                this.setState({ stateLocation: "New Jersey" });
              } else if (SLV === "PA") {
                this.setState({ stateLocation: "Pennsylvania" });
              } else if (SLV === "AL") {
                this.setState({ stateLocation: "Alabama" });
              }
              if (SLV === "AK") {
                this.setState({ stateLocation: "Alaska" });
              } else if (SLV === "AZ") {
                this.setState({ stateLocation: "Arizona" });
              } else if (SLV === "CA") {
                this.setState({ stateLocation: "California" });
              }
              if (SLV === "CO") {
                this.setState({ stateLocation: "Colorado" });
              } else if (SLV === "CT") {
                this.setState({ stateLocation: "Connecticut" });
              } else if (SLV === "DE") {
                this.setState({ stateLocation: "Delaware" });
              }
              if (SLV === "FL") {
                this.setState({ stateLocation: "Florida" });
              } else if (SLV === "GA") {
                this.setState({ stateLocation: "Georgia" });
              } else if (SLV === "HI") {
                this.setState({ stateLocation: "Hawaii" });
              }
              if (SLV === "ID") {
                this.setState({ stateLocation: "Idaho" });
              } else if (SLV === "IL") {
                this.setState({ stateLocation: "Illinois" });
              } else if (SLV === "IN") {
                this.setState({ stateLocation: "Indiana" });
              }
              if (SLV === "IA") {
                this.setState({ stateLocation: "Iowa" });
              } else if (SLV === "KS") {
                this.setState({ stateLocation: "Kansas" });
              } else if (SLV === "KY") {
                this.setState({ stateLocation: "Kentucky" });
              }
              if (SLV === "LA") {
                this.setState({ stateLocation: "Lousiana" });
              } else if (SLV === "ME") {
                this.setState({ stateLocation: "Maine" });
              } else if (SLV === "MD") {
                this.setState({ stateLocation: "Maryland" });
              }
              if (SLV === "MA") {
                this.setState({ stateLocation: "Massachusetts" });
              } else if (SLV === "MI") {
                this.setState({ stateLocation: "Michigan" });
              } else if (SLV === "MS") {
                this.setState({ stateLocation: "Mississippi" });
              }
              if (SLV === "MN") {
                this.setState({ stateLocation: "Minnesota" });
              } else if (SLV === "MO") {
                this.setState({ stateLocation: "Missouri" });
              } else if (SLV === "MT") {
                this.setState({ stateLocation: "Montana" });
              }
              if (SLV === "NE") {
                this.setState({ stateLocation: "Nebraska" });
              } else if (SLV === "NV") {
                this.setState({ stateLocation: "Nevada" });
              } else if (SLV === "NH") {
                this.setState({ stateLocation: "New Hampshire" });
              }
              if (SLV === "NM") {
                this.setState({ stateLocation: "New Mexico" });
              } else if (SLV === "NY") {
                this.setState({ stateLocation: "New York" });
              } else if (SLV === "NC") {
                this.setState({ stateLocation: "North Carolina" });
              }
              if (SLV === "ND") {
                this.setState({ stateLocation: "North Dakota" });
              } else if (SLV === "OH") {
                this.setState({ stateLocation: "Ohio" });
              } else if (SLV === "OK") {
                this.setState({ stateLocation: "Oklahoma" });
              }
              if (SLV === "OR") {
                this.setState({ stateLocation: "Oregon" });
              } else if (SLV === "RI") {
                this.setState({ stateLocation: "Rhode Island" });
              } else if (SLV === "SC") {
                this.setState({ stateLocation: "South Carolina" });
              }
              if (SLV === "SD") {
                this.setState({ stateLocation: "South Dakota" });
              } else if (SLV === "TN") {
                this.setState({ stateLocation: "Tennessee" });
              } else if (SLV === "TX") {
                this.setState({ stateLocation: "Texas" });
              }
              if (SLV === "UT") {
                this.setState({ stateLocation: "Utah" });
              } else if (SLV === "VT") {
                this.setState({ stateLocation: "Vermont" });
              } else if (SLV === "VA") {
                this.setState({ stateLocation: "Virginia" });
              }
              if (SLV === "WA") {
                this.setState({ stateLocation: "Washington" });
              } else if (SLV === "WV") {
                this.setState({ stateLocation: "West Virginia" });
              } else if (SLV === "WI") {
                this.setState({ stateLocation: "Wisconsin" });
              } else if (SLV === "WY") {
                this.setState({ stateLocation: "Wyoming" });
              }
              this.setState({ townLocation: CLV });
            }.bind(this)
          );
        this.setState({ locationGiven: true });
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.stateLocation !== this.state.stateLocation) {
      axios
        .post(
          "/api/clubsList/clubsFromCurrentLocation",
          {
            state: this.state.stateLocation,
            city: this.state.townLocation
          },
          { headers: { "x-auth-token": this.props.token } }
        )
        .then(response => {
          this.setState({ tennisClubs: response.data.clubsBack });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
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
