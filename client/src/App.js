import React from "react";
import LoginScreen from "./LoginScreen/LoginScreen";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import TennisClubSignup from "./TennisClubSignUp/TennisClubSignup";
import TennisClub from "./TennisClub/TennisClub";
import TennisClubsList from "./TennisClubsList/TennisClubsList";
import UserHome from "./UserHome/UserHome";
import AdminHome from "./AdminHome/AdminHome";
import decoder from "jwt-decode";
import InstructorHome from "./InstructorHome/InstructorHome";
import InstructorProfileCreate from "./InstructorHome/InstructorProfileCreate/InstructorProfileCreate";
import AdminProfileCreate from "./AdminHome/AdminProfileCreate/AdminProfileCreate";
import { connect } from "react-redux";
import Notifications from "./Notifications/Notifications";
import NeedToLoginPage from "./NeedToLoginPage/NeedToLoginPage";
import InstructorProfile from "./InstructorHome/InstructorProfile/InstructorProfile";
import Values from "./Values/Values";
import Nav from './Shared/Nav/Nav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  render() {
    let token = false;
    let instructorToken = false;
    let adminToken = false;

    if (localStorage.getItem("token")) {
      token = decoder(localStorage.getItem("token"));
    } else if (localStorage.getItem("instructorToken")) {
      instructorToken = decoder(localStorage.getItem("instructorToken"));
    } else if (localStorage.getItem("adminToken")) {
      adminToken = decoder(localStorage.getItem("adminToken"));
    }

    let clubName = this.props.location.pathname.split("/")[2];

    let instructorClubName;
    if (
      this.props.instructor &&
      this.props.instructor.instructor.clubName !== undefined
    ) {
      instructorClubName = this.props.instructor.instructor.clubName
        .split(" ")
        .join("");
    }

    return (
      <React.Fragment>
      {(token || instructorToken || adminToken) && <Nav/>}
      <Switch>
        <Route path="/values" exact component={Values} />
        <Route
          path="/clubs"
          exact
          component={this.props.user ? TennisClubsList : NeedToLoginPage}
        />
        <Route
          path="/clubs/:clubName"
          exact
          component={
            this.props.user || clubName === instructorClubName
              ? TennisClub
              : NeedToLoginPage
          }
        />

        <Route path="/registerTennisClub" exact component={TennisClubSignup} />
        {instructorToken && (
          <Route
            path={`/instructor/${instructorToken.instructor.id}/createeditprofile`}
            exact
            component={InstructorProfileCreate}
          />
        )}
        {adminToken && (
          <Route
            path={`/admin/${adminToken.admin.id}/createeditprofile`}
            exact
            component={AdminProfileCreate}
          />
        )}
        {token && (
          <Route path={`/user/${token.user.id}`} exact component={UserHome} />
        )}
        {instructorToken && (
          <Route
            path={`/instructor/${instructorToken.instructor.id}`}
            exact
            component={InstructorHome}
          />
        )}

        {adminToken && (
          <Route
            path={`/admin/${adminToken.admin.id}`}
            exact
            component={AdminHome}
          />
        )}
        <Route
          path="/instructor/:instructorId"
          exact
          component={InstructorHome}
        />
        <Route
          exact
          path="/"
          render={() => {
            if (instructorToken) {
              return (
                <Redirect to={`/instructor/${instructorToken.instructor.id}`} />
              );
            } else if (token) {
              return <Redirect to={`/user/${token.user.id}`} />;
            } else if (adminToken) {
              return <Redirect to={`/admin/${adminToken.admin.id}`} />;
            } else {
              return <Route exact path="/" component={LoginScreen} />;
            }
          }}
        />

        {instructorToken.instructor && (
          <Redirect
            from="*"
            to={
              localStorage.getItem("instructorToken") !== null
                ? `/instructor/${instructorToken.instructor.id}`
                : `/`
            }
          />
        )}
        {token.user && (
          <Redirect
            from="*"
            to={
              localStorage.getItem("token") !== null
                ? `/user/${token.user.id}`
                : `/`
            }
          />
        )}
        {adminToken.admin && (
          <Redirect
            from="*"
            to={
              localStorage.getItem("adminToken") !== null
                ? `/admin/${adminToken.admin.id}`
                : `/`
            }
          />
        )}
      </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    instructor: state.authReducer.instructor,
    admin: state.authReducer.admin
  };
};

export default withRouter(connect(mapStateToProps)(App));
