import React, { useEffect, useState } from "react";
import styles from "./AdminProfileCreate.module.css";
import { connect } from "react-redux";
import axios from "axios";
import TabBarButton from '../../Shared/TabBarButton/TabBarButton';
import personImage from './person.png'
import pencil from './pencil.png'
import shake from './shake.png';
import cart from './cart.png';
import AddEditEmployees from "./AddEditEmployees/AddEditEmployees";
import AddEditServices from "./AddEditServices/AddEditServices";
import AddEditProducts from "./AddEditProducts/AddEditProducts";
import AddEditPayroll from './AddEditPayroll/AddEditPayroll';




const AdminProfileCreate = props => {
  
  const [selected, setSelected] = useState('Employees');



  function getSelected(thing) {
    return () => setSelected(thing);
  }
  

  return (
    <div id={styles.mainContainer}>
      <p className={styles.header}>{selected === "Employees" && "Add/Edit Employees"}{selected === "Services" && "Add/Edit Services"}{selected === "Products" && "Add/Edit Products"}{selected === "Payroll" && "Payroll Suite Setup"}</p>
      {selected === "Employees" && <AddEditEmployees/>}
      {selected === "Services" && <AddEditServices/>}
      {selected === "Products" && <AddEditProducts/>}
      {selected === "Payroll" && <AddEditPayroll/>}
      <div className={styles.bottomAnchor}>
        <TabBarButton onClick={getSelected("Employees")} selected={selected === "Employees"} bringDown={true} label={"Employees"} width={'25%'} image={personImage}/>
        <TabBarButton onClick={getSelected("Services")} selected={selected === "Services"} padTop={"3px"} label={"Services"} width={'25%'} image={shake}/>
        <TabBarButton onClick={getSelected("Products")} selected={selected === "Products"} bringDown={true} label={"Products"} image={cart} width={'25%'}/>
        <TabBarButton onClick={getSelected("Payroll")} selected={selected === "Payroll"} padTop={"2px"} bringDown={true} label={"Payroll"} image={pencil} width={'25%'}/>
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  adminToken: state.authReducer.adminToken,
  admin: state.authReducer.admin
});

export default connect(mapStateToProps)(AdminProfileCreate);
