import React from "react";
import axios from "axios";
import styles from "./Business.module.css";
import AdminBooking from "./BookingHelpers/AdminBooking/AdminBooking";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import UserView from "./UserView/UserView";

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      business: "",
      showThings: false,
      businessProfile: "",
      profileComplete: null,
      employees: "",
      timeOpen: "",
      timeClose: "",
      services: [],
      shouldExpand: false
    }; 
  }

  slide = () => {
      document.getElementById("slideLeft").scrollTo({
        top: 0,
        left: 1200,
        behavior: 'smooth'
      });
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.dateChosen !== prevProps.dateChosen || this.state.business.businessName !== prevState.business.businessName) {
      console.log(this.props.dateChosen, prevProps.dateChosen)
      this.setState({timeOpen: this.state.business.schedule[this.props.dateChosen.getDay()].open})
      this.setState({timeClose: this.state.business.schedule[this.props.dateChosen.getDay()].close})
      this.setState({loading: false})
    }
  }

  componentDidMount() {
    console.log("did")
      axios
        .post("/api/business/appBusiness", {
          businessId: this.props.admin.admin.businessId
        })
        .then(response => {
          if (response.status === 200) {
            console.log("YOOOOOOOOOOO")
            console.log(response.data)
            this.setState({ profileComplete: true });
            this.setState({ businessProfile: response.data.profile });
            this.setState({ business: response.data.business });
          } else {
            this.setState({profileComplete: false})
          }
        });
      }



  render() {
    return (
      <React.Fragment>
        {this.state.loading && !this.props.user && <Spinner/>}
        {this.state.profileComplete && !this.state.loading && (
          <div id={styles.businessContainer}>
            <div>
              <div id={"slideLeft"} className={styles.main}>
                <AdminBooking
                  slideLeft={this.slide}
                  eq={this.state.business.eq}
                  bca={this.state.business.bookingColumnType}    
                />
              </div>
            </div>
          </div>
        )}{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    adminToken: state.authReducer.adminToken,
    employee: state.authReducer.employee,
    bookAThing: state.booleanReducers.bookAThing,
    user: state.authReducer.user,
    dateChosen: state.dateReducer.dateChosen
  };
};

export default withRouter(connect(mapStateToProps)(Business));
