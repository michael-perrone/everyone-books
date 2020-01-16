import React from "react";
import LoginScreen from "./LoginScreen/LoginScreen";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import BusinessSignup from "./BusinessSignup/BusinessSignup";
import TennisClub from "./TennisClub/TennisClub";
import TennisClubsList from "./TennisClubsList/TennisClubsList";
import UserHome from "./UserHome/UserHome";
import AdminHome from "./AdminHome/AdminHome";
import decoder from "jwt-decode";
import EmployeeHome from "./EmployeeHome/EmployeeHome";
import AdminProfileCreate from "./AdminHome/AdminProfileCreate/AdminProfileCreate";
import { connect } from "react-redux";
import NeedToLoginPage from "./NeedToLoginPage/NeedToLoginPage";
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
    let employeeToken = false;
    let adminToken = false;

    if (localStorage.getItem("token")) {
      token = decoder(localStorage.getItem("token"));
    } else if (localStorage.getItem("employeeToken")) {
      employeeToken = decoder(localStorage.getItem("employeeToken"));
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
      {(token || employeeToken || adminToken) && <Nav/>}
      <Switch>
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

  {!employeeToken && !adminToken && !token && <Route path="/registerBusiness" exact component={BusinessSignup} /> }

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
        {employeeToken && (
          <Route
            path={`/employee/${employeeToken.employee.id}`}
            exact
            component={EmployeeHome}
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
          path="/employee/:employeeId"
          exact
          component={EmployeeHome}
        />
        <Route
          exact
          path="/"
          render={() => {
            if (employeeToken) {
              return (
                <Redirect to={`/employee/${employeeToken.employee.id}`} />
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

        {employeeToken.employee && (
          <Redirect
            from="*"
            to={
              localStorage.getItem("employeeToken") !== null
                ? `/employee/${employeeToken.employee.id}`
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
    employee: state.authReducer.employee,
    admin: state.authReducer.admin
  };
};

export default withRouter(connect(mapStateToProps)(App));
