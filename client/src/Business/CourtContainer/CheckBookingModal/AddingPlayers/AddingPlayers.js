import React from "react";
import styles from "../../TryingToBookModal/TryingToBookHelper/TryingToBookHelper.module.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import OtherAlert from "../../../../OtherAlerts/OtherAlerts";
import { connect } from "react-redux";

const AddingPlayers = props => {
  const [customerName, setCustomerName] = React.useState("");
  const [customers, setCustomers] = React.useState([]);
  const [addedPlayers, setAddedPlayers] = React.useState([
    ...props.playersFromModal
  ]);
  const [searchHit, setSearchHit] = React.useState(false);
  const [tooSmallError, setTooSmallError] = React.useState(false);
  const [addError, setAddError] = React.useState(false);

  function findCustomers(event) {
    event.preventDefault();
    if (customerName.length > 2) {
      setSearchHit(true);
      let clubName = "";
      if (props.admin) {
        clubName = props.clubNameAllLower;
      } else {
        clubName = props.match.params.clubName;
      }
      axios
        .post("/api/getCustomers", {
          customerName,
          clubNameAllLower: clubName
        })
        .then(response => {
          if (response.data.customers.length > 0) {
            setCustomers(response.data.customers);
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            setCustomers([]);
          }
        });
    } else {
      setTooSmallError(true);
    }
  }

  function addPlayer(player) {
    return () => {
      setAddError(false);
      let allowAdd = true;
      addedPlayers.forEach(addedPlayer => {
        if (addedPlayer.id === player.id) {
          allowAdd = false;
        }
      });
      if (allowAdd) {
        const newAddedPlayers = [...addedPlayers, player];
        setAddedPlayers(newAddedPlayers);
      } else {
        setTimeout(() => setAddError(true), 100);
      }
    };
  }

  const getCustomerName = event => {
    setCustomerName(event.target.value);
    setSearchHit(false);
  };

  return (
    <div style={{ height: "500px", top: "10px" }} id={styles.mainHelper}>
      <i
        style={{
          position: "absolute",
          left: "4px",
          cursor: "pointer",
          top: "1px",
          fontSize: "18px"
        }}
        onClick={props.goBackHandler}
        className="fas fa-arrow-left"
      ></i>
      <div>
        <OtherAlert
          showAlert={addError === true}
          alertType={"error"}
          alertMessage={"Player already added"}
        />
        <form>
          <p
            id={
              tooSmallError === true && customerName.length < 3
                ? styles.errorAnimation
                : ""
            }
            className={styles.error}
          >
            More than two letters required
          </p>
          <p
            className={styles.error}
            id={
              searchHit === true &&
              customerName.length > 2 &&
              customers.length === 0
                ? styles.errorAnimation
                : ""
            }
          >
            No Results Found
          </p>
          <input
            style={{ marginTop: "10px" }}
            onChange={getCustomerName}
            id={styles.helperInput}
          />
          <button
            onClick={findCustomers}
            style={{ marginLeft: "20px", height: "28px", width: "60px" }}
          >
            Search
          </button>
        </form>
        <div style={{ marginTop: "8px" }}>
          {customers.map((customer, index) => {
            if (index < 6) {
              return (
                <div className={styles.addCustomerContainer}>
                  <p className={styles.customer}>{customer.name}</p>
                  <p>Age: 42</p>
                  <button
                    className={styles.addButton}
                    style={{ cursor: "pointer" }}
                    onClick={addPlayer(customer)}
                  >
                    Add Player
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid darkgray",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "180px"
        }}
      >
        <p
          style={{
            position: "relative",
            top: "2px",
            paddingTop: "10px",
            textDecoration: "underline"
          }}
        >
          Players
        </p>
        <button
          style={{
            height: "26px",
            width: "65px",
            backgroundColor: "lightgreen",
            border: "none",
            boxShadow: "0px 0px 2px black",
            position: "relative",
            top: "-20px",
            left: "120px"
          }}
          onClick={props.done(addedPlayers)}
        >
          Finished
        </button>
        <div
          style={{ position: "relative", top: "-18px" }}
          id={styles.playerWrapDiv}
        >
          {addedPlayers.map(addedPlayer => {
            return (
              <p
                style={{
                  fontSize: addedPlayers.length > 7 ? "12px" : "14px",
                  marginTop: "6px"
                }}
              >
                {addedPlayer.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin
  };
};

export default withRouter(connect(mapStateToProps)(AddingPlayers));
