import React from "react";
import axios from "axios";
import Business from '../Business/Business';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminProfileCreated: "",
      adminToken: ""
    };
  }

  // componentDidMount() {  // check this -- dont like how it pushes to thing setup profile and keeps u there
  //   axios
  //     .get("/api/businessProfile/mybusiness", {
  //       headers: { "x-auth-token": this.props.adminToken }
  //     })
  //     .then(response => {
  //       this.setState({ adminProfileCreated: response.data.profileCreated });
  //     })
  //     .catch(error => {
  //       if (error.response.status === 406) {
  //         this.props.history.push(
  //           `/admin/${this.props.admin.admin.id}/createeditprofile`
  //         );
  //       }
  //     });
  // }

  render() {
    return (
    <Business />
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    adminToken: state.authReducer.adminToken
  };
};

export default withRouter(connect(mapStateToProps)(AdminHome));
