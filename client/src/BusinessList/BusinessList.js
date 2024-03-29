import React from "react";
import axios from "axios";
import BusinessInList from "./BusinessInList/BusinessInList";
import styles from "./BusinessList.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import OtherAlert from "../OtherAlerts/OtherAlerts";
import Advertisement from '../Shared/Advertisement/Advertisement';

class BusinessList extends React.Component {
  constructor() {
    super();
    this.state = {
      businesses: [],
      searchError: "",
      user: {},
      idSentTo: "",
      ads: [],
      currentCity: ""
    };
    this.advancedSearchFunction = this.advancedSearchFunction.bind(this);
    this.changeSentTo = this.changeSentTo.bind(this);
  }

  changeSentTo(newThing) {
      this.setState({idSentTo: newThing});
  }



  componentDidMount() {
    const newThis = this;
    if (this.props.token) {
      axios.get('/api/userprofile/myprofile',
      {headers: {'x-auth-token': this.props.token}})
      .then(response => {
         this.setState({user: response.data.user})
     })
    //  axios.get("/api/ads/getRandomC").then(response => {
    //     this.setState({ads: response.data.ads})
    //  })
      axios.post("/api/ads/getRandom", {limit: 3}).then(
        response => {
          if (response.status === 200) {
            this.setState({ads: response.data.ads})
          }
        }
      )
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
    console.log("YOOOO")
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude; 
      const long = position.coords.longitude;
      console.log(this)
      axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=5z4IX12uixwGDlNJ9qaPHYA4tI3dKgNU&location=${lat},${long}&includeRoadMetadata=false&includeNearestIntersection=false`
      ).then(function(response){
              const locationInfo = response.data.results[0].locations[0];
              const zip = locationInfo.postalCode.split("-")[0];
              const city = locationInfo.adminArea5;
              //this.setState({currentCity: city})
              const state = locationInfo.adminArea3;
              axios.post('/api/businessList/location', {zip, city, state}).then(response => {

                  if (response.data.businessesFromZip && response.data.businessesFromZip.length > 0) {
                      newThis.setState({businesses: response.data.businessesFromZip});
                  }
                  else if (response.data.businessesFromCity && response.data.businessesFromCity.length > 0) {
                    newThis.setState({businesses: response.data.businessesFromCity});
                  }
              }).catch(error => {
                
                console.log(error);
              })
          }
      )
  });
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
                if (this.state.user.businessesFollowing) {
                  for (let i = 0; i < this.state.user.businessesFollowing.length; i++) {                  
                    if (element._id === this.state.user.businessesFollowing[i]) {
                      following = true;
                    }
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
            <div id={styles.bigC}>
            {this.state.ads && this.state.ads.map(ad => {
              return <div id={styles.adverContainer}>
                  <Advertisement ad={ad}/>
               </div>
            })}
            </div>
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

