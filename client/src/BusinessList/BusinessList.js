import React from "react";
import axios from "axios";
import BusinessInList from "./BusinessInList/BusinessInList";
import styles from "./BusinessList.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import OtherAlert from "../OtherAlerts/OtherAlerts";

class BusinessList extends React.Component {
  constructor() {
    super();
    this.state = {
      businesses: [],
      searchError: "",
      user: {}
    };
    this.advancedSearchFunction = this.advancedSearchFunction.bind(this);
  }

  componentDidMount() {
    axios.get('/api/userprofile/myprofile',
     {headers: {'x-auth-token': this.props.token}})
     .then(response => {
        this.setState({user: response.data.user})
    })
  } 

  advancedSearchFunction(city, state, zip, businessName, typeOfBusiness) {
    return event => {
      event.preventDefault();
      const objectToSend = {
        city,
        state,
        zip,
        businessName,
        typeOfBusiness
      };
      this.setState({ searchError: "" });
      axios
        .post("/api/businessList/businessSearch", objectToSend, {
          headers: { "x-auth-token": this.props.token }
        })
        .then(response => {
          this.setState({ businesses: response.data.businessesBack });
          this.setState({ advancedSearchHit: true });
          if (response.data.businessesBack.length === 0) {
            this.setState({searchError: "There were no businesses found."})
          }
        })
        .catch(error => {
          if (error.response.status === 406) {
            this.setState({ searchError: "There were no businesses found." });
            this.setState({businesses: []})
          }
        });
    };
  }


  render() {
    console.log(this.state.businesses)
    return (
      <div id={styles.clubsContainer}>
        <AdvancedSearch advancedSearchFunction={this.advancedSearchFunction} />
          <OtherAlert
            showAlert={this.state.searchError !== "" ? true : false}
            alertMessage={this.state.searchError}
            alertType={"error"}
          />
          <div id={this.state.businesses.length > 3 ? "" : styles.defaultHeight} className={styles.actualClubsContainer}>
          {this.state.businesses.map(element => {
                let following = false;
                for (let i = 0; i < this.state.user.businessesFollowing.length; i++) {                  
                  if (element._id === this.state.user.businessesFollowing[i]) {
                    following = true;
                  }
                }
              return (
                   <BusinessInList
                  following={following}
                  unfollow={this.unfollow}
                  follow={this.followBusiness}
                  business={element}
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
    token: state.authReducer.token
  };
};

export default withRouter(connect(mapStateToProps)(BusinessList));

