import React from "react";
import AdminNav from "../AdminNav/AdminNav";
import axios from "axios";
import TennisClub from "../TennisClub/TennisClub";
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

  componentDidMount() {
    axios
      .get("/api/clubprofile/myclub", {
        headers: { "x-auth-token": this.props.adminToken }
      })
      .then(response => {
        this.setState({ adminProfileCreated: response.data.profileCreated });
      })
      .catch(error => {
        if (error.response.status === 406) {
          this.props.history.push(
            `/admin/${this.props.admin.admin.id}/createeditprofile`
          );
        }
      });
  }

  render() {
    return (
      <div>
        <AdminNav />
        {this.state.adminProfileCreated === true && <TennisClub />}
      </div>
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
