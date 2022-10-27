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
      user: {},
      idSentTo: ""
    };
    this.advancedSearchFunction = this.advancedSearchFunction.bind(this);
    this.changeSentTo = this.changeSentTo.bind(this);
  }

  changeSentTo(newThing) {
      this.setState({idSentTo: newThing});
  }

  componentDidMount() {
    if (this.props.token) {
      axios.get('/api/userprofile/myprofile',
      {headers: {'x-auth-token': this.props.token}})
      .then(response => {
         this.setState({user: response.data.user})
     })
    }
    if (this.props.employeeToken) {
      axios.get('/api/getEmployee/idsSent', {headers: {'x-auth-token': this.props.employeeToken}}).then(
        response => {
          if (response.status === 200) {
            this.setState({idSentTo: response.data.bId});
          } 
        }
      ).catch(error => {
        // just catching 406 to do nothing
      })
    }
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
        .post("/api/businessList/businessSearch", objectToSend)
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
          {this.props.token && this.state.businesses.map(element => {
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
          {this.props.employeeToken && this.state.businesses.map(business => {

          return <BusinessInList changeSentTo={this.changeSentTo} alreadySent={business._id === this.state.idSentTo} notUser={true} business={business} key={business._id}/>
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
    token: state.authReducer.token,
    employeeToken: state.authReducer.employeeToken
  };
};

export default withRouter(connect(mapStateToProps)(BusinessList));

