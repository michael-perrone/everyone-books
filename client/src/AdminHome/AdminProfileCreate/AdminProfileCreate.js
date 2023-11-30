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
import menu from './menu.png';
import layout from './layout.png';
import AddMenu from './AddMenu/AddMenu';
import TableCreator from '../../Business/Restaurant/TableCreator/TableCreator'
// import AddLayout from "./AddLayout/AddLayout";

const AdminProfileCreate = props => {
  const [selected, setSelected] = useState('Employees');

  function getSelected(thing) {
    return () => setSelected(thing);
  }

  return (
    <div id={styles.mainContainer}>
      {selected === "Employees" && <AddEditEmployees/>}
      {selected === "Services" && props.admin.admin.tob !== "Restaurant" && <AddEditServices/>}
      {selected === "Menu" && props.admin.admin.tob === "Restaurant" && <AddMenu/>}
      {selected === "Layout" && props.admin.admin.tob === "Restaurant" && <TableCreator/>}
      {selected === "Products" && props.admin.admin.tob !== "Restaurant" && <AddEditProducts/>}
      {selected === "Payroll" && <AddEditPayroll/>}
      <div className={styles.bottomAnchor}>
        <TabBarButton onClick={getSelected("Employees")} selected={selected === "Employees"} bringDown={true} label={"Employees"} width={'25%'} image={personImage}/>
        {props.admin.admin.tob !== "Restaurant" && <TabBarButton onClick={getSelected("Services")} selected={selected === "Services"} smaller={true} padTop={"3px"} label={"Services"} width={'25%'} image={shake}/>}
        {props.admin.admin.tob !== "Restaurant" && <TabBarButton onClick={getSelected("Products")} selected={selected === "Products"} bringDown={true} label={"Products"} image={cart} width={'25%'}/>}
        {props.admin.admin.tob === "Restaurant" && <TabBarButton onClick={getSelected("Menu")} selected={selected === "Menu"} padTop={"4px"} label={"Menu"} width={"25%"} image={menu}/>}
        {props.admin.admin.tob === "Restaurant" && <TabBarButton onClick={getSelected("Layout")} selected={selected === "Layout"} label={"Layout"} width={"25%"} padTop={"4px"} image={layout}/>}
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
