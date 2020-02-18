import React from "react";
import LoginScreen from "./LoginScreen/LoginScreen";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import BusinessSignup from "./BusinessSignup/BusinessSignup";
import Business from "./Business/Business";
import BusinessList from "./BusinessList/BusinessList";
import UserHome from "./UserHome/UserHome";
import AdminHome from "./AdminHome/AdminHome";
import decoder from "jwt-decode";
import EmployeeHome from "./EmployeeHome/EmployeeHome";
import AdminProfileCreate from "./AdminHome/AdminProfileCreate/AdminProfileCreate";
import { connect } from "react-redux";
import NeedToLoginPage from "./NeedToLoginPage/NeedToLoginPage";
import Nav from './Shared/Nav/Nav';
import BusinessSchedule from './BusinessSchedule/BusinessSchedule';
import { HIDE_DROP_DOWN } from "./actions/actions";

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

    let businessId = this.props.location.pathname.split("/")[2];

    let okayToView = false;
    if (this.props.employee && this.props.employee.employee.businessId === businessId) {
      okayToView = true;
    }


    return (
      <React.Fragment>
      {(token || employeeToken || adminToken) && <Nav/>}
      <div onClick={this.props.hideDropDown}>
      <Switch>
        <Route path="/admin/:businessId/businessSchedule" exact component={BusinessSchedule}></Route>
        <Route
          path="/businesslist"
          exact
          component={this.props.user ? BusinessList : NeedToLoginPage}
        />
        <Route
          path="/businesses/:businessId"
          exact
          component={
            this.props.user || okayToView
              ? Business
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
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    employee: state.authReducer.employee,
    admin: state.authReducer.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideDropDown: () => dispatch({type: HIDE_DROP_DOWN }) 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
