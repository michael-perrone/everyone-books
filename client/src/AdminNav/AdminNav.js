import React from "react";
import styles from "./AdminNav.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ADMIN_LOGOUT } from "../actions/actions";

class AdminNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false
    };

    this.showDropDownHandler = this.showDropDownHandler.bind(this);
  }

  showDropDownHandler() {
    this.setState(prevState => {
      return { showDropDown: !prevState.showDropDown };
    });
  }

  render() {
    return (
      <div id={styles.navBarContainer}>
        <p id={styles.title}>Tennis Mate</p>
        <div id={styles.secondContainer}>
          <Link
            style={{ marginRight: "30px" }}
            className={styles.links}
            to="/skdksdks"
          >
            My Club
          </Link>
          <div onClick={this.showDropDownHandler} style={{ display: "flex" }}>
            <p className={styles.links} style={{ cursor: "pointer" }}>
              {this.props.admin.admin.name}
            </p>{" "}
            <i
              style={{
                position: "relative",
                left: "5px",
                top: "5px",
                cursor: "pointer",
                color: "rgb(152, 241, 152)"
              }}
              className="fas fa-caret-down"
            />
            {this.state.showDropDown && (
              <div id={styles.dropDownMenu}>
                <div className={styles.dropDownDiv}>
                  <Link
                    className={styles.dropDownItem}
                    to={`/admin/${this.props.admin.admin.id}/createeditprofile`}
                  >
                    Edit Club Info
                  </Link>
                </div>
                <div className={styles.dropDownDiv}>
                  <Link className={styles.dropDownItem} to="/Notifications">
                    Notifications
                  </Link>
                </div>
                <div
                  style={{ borderBottom: "none" }}
                  className={styles.dropDownDiv}
                >
                  <Link
                    className={styles.dropDownItem}
                    onClick={this.props.adminLogout}
                    to="/"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    adminLogout: () => dispatch({ type: ADMIN_LOGOUT })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNav);
