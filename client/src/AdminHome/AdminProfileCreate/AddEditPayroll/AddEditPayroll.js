import Axios from 'axios';
import React, { useEffect } from 'react';
import OptionDrop from '../../../Shared/OptionDrop/OptionDrop';
import styles from './AddEditPayroll.module.css';
import {connect} from 'react-redux';
import {createMaplist} from '../../../feutils/feutils';
import OtherAlert from '../../../OtherAlerts/OtherAlerts';
import ColorButton from '../../../Shared/ColorButton/ColorButton';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';

function AddEditPayroll(props) {

    const [employees,setEmployees] = React.useState([]);
    const [selectedEmployee, setSelectedEmployee] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [salary, setSalary] = React.useState();
    const [salaryEarned, setSalaryEarned] = React.useState("");
    const [hourly, setHourly] = React.useState();
    const [hourlyEarned, setHourlyEarned] = React.useState("");
    const [error, setError] = React.useState("");
    const [commission, setCommission] = React.useState();
    const [productCommission, setProductCommission] = React.useState("");
    const [serviceCommission, setServiceCommission] = React.useState("");

    useEffect(function() {
        if (selectedEmployee === "") {
            return;
        }
        Axios.post("api/payroll/getEmployeePayroll", {employeeId: selectedEmployee}, {headers: {"x-auth-token": props.adminToken}}).then(response => {
            if(response.data) {
                if (response.data.emPayroll) {
                    const emPayroll  = response.data.emPayroll;
                    setSalary(emPayroll.paidSalary);
                    setSalaryEarned(emPayroll.salary);
                    setHourly(emPayroll.paidHourly);
                    setHourlyEarned(emPayroll.hourly);
                    setProductCommission(emPayroll.pcp);
                    setServiceCommission(emPayroll.scp);
                    if (emPayroll.productCommission || emPayroll.serviceCommission) {
                        setCommission(true);
                    }
                    else {
                        setCommission(false);
                    }   
                }
            }
        }).catch(error => {
                setSalary();
                setSalaryEarned("");
                setHourly();
                setHourlyEarned("");
                setProductCommission("");
                setServiceCommission("");
                setCommission();

        })
    }, [selectedEmployee]);

    function addEmployeePayroll() {
        if (selectedEmployee === "" || salary === undefined || hourly === undefined) {
            setError("");
            setTimeout(() => setError("Please choose salary and hourly answers"), 200);
            return;
        }
        if (salary && salaryEarned === "") {
            setError("");
            setTimeout(() => setError("Please enter salary earned"), 200);
            return;
        }
        if (hourly && hourlyEarned === "") {
            setError("");
            setTimeout(() => setError("Please enter hourly wage earned"), 200);
            return;
        }
        if (commission) { // check this
            console.log(productCommission);
            console.log(serviceCommission);
        }
        let productCommissionBool = true;
        let serviceCommissionBool = true;
        if (!commission) {
            productCommissionBool = false;
            serviceCommissionBool = false;
        }
        if (serviceCommission === "" || serviceCommission === "None" || serviceCommission === "Service Commission %" ) {
            serviceCommissionBool = false;
        }
        if (productCommission === "" || productCommission === "None" || productCommission === "Product Commission %" ) {
            productCommissionBool = false;
        }

        if ((commission && productCommission === "" || productCommission === "Product Commission %") && (commission && serviceCommission === "" || serviceCommission === "Service Commission %")) {
            setError("");
            console.log(commission);
            console.log(productCommission);
            console.log(serviceCommission);   
            setTimeout(() => setError("Please enter commission percentage(s)"), 200);
        }
        
        Axios.post("api/payroll/createEditEmployee", {paidSalary: salary, paidHourly: hourly, salary: salaryEarned, hourly: hourlyEarned, productCommission: productCommissionBool,
             serviceCommission: serviceCommissionBool, employeeId: selectedEmployee, scp: serviceCommission === "Service Commission %" ? "" : serviceCommission, pcp: productCommission === "Product Commission %" ? "" : productCommission}, {headers: {"x-auth-token": props.adminToken}}).then(
            response => {
                if (response.status === 200 || response.status === 201) {
                    setSuccessMessage("Employee Information Saved");
                }
            }
        ).catch(error => {
            setError("");
            if (error.response.status === 406) {
                setTimeout(() => setError("Something went wrong."), 200);
            }
        })
    }



    function selectEmployee(id) {
            setSelectedEmployee(id);
    }

    function toSetSalary(bool) {
        return () => {
            setSalary(bool);
        }
    }

    function toSetCommission(bool) {
        return () => {
            setCommission(bool);
        }
    }

    function toSetSalaryEarned(e) {
        setSalaryEarned(e.target.value);
    }
    
    function toSetHourly(bool) {
        return () => {
            setHourly(bool);
        }
    }

    function toSetHourlyEarned(e) {
        setHourlyEarned(e.target.value);
    }

    useEffect(function() {
    },[selectedEmployee]);

    useEffect(function() {
        Axios.get("api/getEmployees", {headers: {"x-auth-token": props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setEmployees(createMaplist(response.data.employees, "fullName"));
                    setSelectedEmployee(response.data.employees[0]["_id"]);
                }
            }
        ).catch(error => {
            setError("");
            setTimeout(() => setError("You can not add payroll information to your business until an employee has been added."), 200);
        })
    },[]);
    

    return (
        <div id={styles.mainContainer}>
            <p style={{marginTop: "16px"}}>Below you will setup how each of your employees payroll will be conducted. First, choose whether the selected employee is paid by salary and/or hourly wage and then proceed to fill in the correct hourly/salary amount if necessary. Next, choose whether the selected employee receives commission for services performed and/or for product sold. If the selected employee does receive commission for either, select the percent of commission they are to receive for each. Please make sure to click save after creating/updating each employees payroll settings!</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <div className={styles.miniContainer} style={{marginTop: "32px", marginLeft: "2px"}}>
                    <p className={styles.label}>Select Employee:</p>
                    <select style={{backgroundColor: "rgb(24,24,24)"}} onChange={e => {
                        console.log(e.target);
                        setSelectedEmployee(e.target.value);
                    }} id={styles.optionDrop}>
                         {employees && employees.map(element => {
                     return (
                    <option value={element.id} key={element.id}>{element.displayName}</option>
                )
            })}
        </select>
                </div>
                <div className={styles.miniContainer} style={{justifyContent: "flex-start", marginTop: "10px"}}>
                    <p className={styles.label}>Does this Employee...</p>
                </div>
                <div className={styles.miniContainer} style={{marginTop: "44px", position: "relative"}}>
                    <p className={styles.label}>Get paid by salary?</p>
                    <div style={{display: "flex", width: "180px", justifyContent: "space-between"}}>
                        <ColorButton clicked={toSetSalary(true)} backgroundColor={salary === true ? "rgb(100,100,100)" : ""}>Yes</ColorButton>
                        <ColorButton clicked={toSetSalary(false)} backgroundColor={salary === false ? "rgb(100,100,100)" : ""}>No</ColorButton>
                    </div>
                    {salary && <div style={{width: "370px", display: "flex", top: "40px", right: "10px", position: "absolute"}}>
                         <p style={{fontSize: "22px", marginRight: "3px"}}>$</p>
                         <input onChange={toSetSalaryEarned} value={salaryEarned} className={styles.inputs} placeholder={"Enter Employee Salary"} />
                    </div>
                    }
                </div>
                <div className={styles.miniContainer} style={{marginTop: "54px", position: "relative"}}>
                    <p className={styles.label}>Get paid hourly?</p>
                    <div style={{display: "flex", width: "180px", justifyContent: "space-between"}}>
                        <ColorButton clicked={toSetHourly(true)} backgroundColor={hourly === true ? "rgb(100,100,100)": "transparent"}>Yes</ColorButton>
                        <ColorButton clicked={toSetHourly(false)} backgroundColor={hourly === false ? "rgb(100,100,100)": "transparent"}>No</ColorButton>
                    </div>
                    {hourly && <div style={{width: "370px", display: "flex", top: "40px", right: "10px", position: "absolute"}}>
                         <p style={{fontSize: "22px", marginRight: "3px"}}>$</p>
                         <input onChange={toSetHourlyEarned} value={hourlyEarned} className={styles.inputs} placeholder={"Enter Employee Hourly Wage"} />
                    </div>
                    }
                </div>
                <div className={styles.miniContainer} style={{marginTop: "54px"}}>
                    <p className={styles.label}>Earn commission?</p>
                    <div style={{display: "flex", width: "180px", justifyContent: "space-between"}}>
                        <ColorButton clicked={toSetCommission(true)} backgroundColor={commission === true ? "rgb(100,100,100)": "transparent"}>Yes</ColorButton>
                        <ColorButton clicked={toSetCommission(false)} backgroundColor={commission === false ? "rgb(100,100,100)": "transparent"}>No</ColorButton>
                    </div>
                </div>
               {commission && <div style={{width: "370px", display: "flex", fontWeight: "bold", fontSize: "16px", justifyContent: "space-between", marginTop: "30px"}}>
                   <select value={serviceCommission} onChange={(e) => setServiceCommission(e.target.value)} style={{backgroundColor: "white", border: "1px solid #f9e9f9", height: "26px"}}>
                       <option>Service Commission %</option>
                       <option>None</option>
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                       <option>4</option>
                       <option>5</option>
                       <option>6</option>
                       <option>7</option>
                       <option>8</option>
                       <option>9</option>
                       <option>10</option>
                       <option>11</option>
                       <option>12</option>
                       <option>13</option>
                       <option>14</option>
                       <option>15</option>
                       <option>16</option>
                       <option>17</option>
                       <option>18</option>
                       <option>19</option>
                       <option>20</option>
                       <option>21</option>
                       <option>22</option>
                       <option>23</option>
                       <option>24</option>
                       <option>25</option>
                       <option>26</option>
                       <option>27</option>
                       <option>28</option>
                       <option>29</option>
                       <option>30</option>
                       <option>31</option>
                       <option>32</option>
                       <option>33</option>
                       <option>34</option>
                       <option>35</option>
                       <option>36</option>
                       <option>37</option>
                       <option>38</option>
                       <option>39</option>
                       <option>40</option>
                       <option>41</option>
                       <option>42</option>
                       <option>43</option>
                       <option>44</option>
                       <option>45</option>
                       <option>46</option>
                       <option>47</option>
                       <option>48</option>
                       <option>49</option>
                       <option>50</option>
                       <option>51</option>
                       <option>52</option>
                       <option>53</option>
                       <option>54</option>
                       <option>55</option>
                       <option>56</option>
                       <option>57</option>
                       <option>58</option>
                       <option>59</option>
                       <option>60</option>
                       <option>61</option>
                       <option>62</option>
                       <option>63</option>
                       <option>64</option>
                       <option>65</option>
                       <option>66</option>
                       <option>67</option>
                       <option>68</option>
                       <option>69</option>
                       <option>70</option>
                       <option>71</option>
                       <option>72</option>
                       <option>73</option>
                       <option>74</option>
                       <option>75</option>
                       <option>76</option>
                       <option>77</option>
                       <option>78</option>
                       <option>79</option>
                       <option>80</option>
                       <option>81</option>
                       <option>82</option>
                       <option>83</option>
                       <option>84</option>
                       <option>85</option>
                       <option>86</option>
                       <option>87</option>
                       <option>88</option>
                       <option>89</option>
                       <option>90</option>
                       <option>91</option>
                       <option>92</option>
                       <option>93</option>
                       <option>94</option>
                       <option>95</option>
                       <option>96</option>
                       <option>97</option>
                       <option>98</option>
                       <option>99</option>
                       <option>100</option>
                   </select>
                   <select value={productCommission} onChange={(e) => setProductCommission(e.target.value)} style={{backgroundColor: "rgb(24,24,24)", border: "1px solid #f9e9f9", height: "26px"}}>
                       <option>Product Commission %</option>
                       <option>None</option>
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                       <option>4</option>
                       <option>5</option>
                       <option>6</option>
                       <option>7</option>
                       <option>8</option>
                       <option>9</option>
                       <option>10</option>
                       <option>11</option>
                       <option>12</option>
                       <option>13</option>
                       <option>14</option>
                       <option>15</option>
                       <option>16</option>
                       <option>17</option>
                       <option>18</option>
                       <option>19</option>
                       <option>20</option>
                       <option>21</option>
                       <option>22</option>
                       <option>23</option>
                       <option>24</option>
                       <option>25</option>
                       <option>26</option>
                       <option>27</option>
                       <option>28</option>
                       <option>29</option>
                       <option>30</option>
                       <option>31</option>
                       <option>32</option>
                       <option>33</option>
                       <option>34</option>
                       <option>35</option>
                       <option>36</option>
                       <option>37</option>
                       <option>38</option>
                       <option>39</option>
                       <option>40</option>
                       <option>41</option>
                       <option>42</option>
                       <option>43</option>
                       <option>44</option>
                       <option>45</option>
                       <option>46</option>
                       <option>47</option>
                       <option>48</option>
                       <option>49</option>
                       <option>50</option>
                       <option>51</option>
                       <option>52</option>
                       <option>53</option>
                       <option>54</option>
                       <option>55</option>
                       <option>56</option>
                       <option>57</option>
                       <option>58</option>
                       <option>59</option>
                       <option>60</option>
                       <option>61</option>
                       <option>62</option>
                       <option>63</option>
                       <option>64</option>
                       <option>65</option>
                       <option>66</option>
                       <option>67</option>
                       <option>68</option>
                       <option>69</option>
                       <option>70</option>
                       <option>71</option>
                       <option>72</option>
                       <option>73</option>
                       <option>74</option>
                       <option>75</option>
                       <option>76</option>
                       <option>77</option>
                       <option>78</option>
                       <option>79</option>
                       <option>80</option>
                       <option>81</option>
                       <option>82</option>
                       <option>83</option>
                       <option>84</option>
                       <option>85</option>
                       <option>86</option>
                       <option>87</option>
                       <option>88</option>
                       <option>89</option>
                       <option>90</option>
                       <option>91</option>
                       <option>92</option>
                       <option>93</option>
                       <option>94</option>
                       <option>95</option>
                       <option>96</option>
                       <option>97</option>
                       <option>98</option>
                       <option>99</option>
                       <option>100</option>
                   </select>
                </div>
               }
               <SubmitButton onClick={addEmployeePayroll} marginTop={"40px"}>Save Employee Information</SubmitButton>              
            </div>
            <OtherAlert alertType={"success"} alertMessage={successMessage} showAlert={successMessage !== ""}/>
            <OtherAlert alertType={"fail"} alertMessage={error} showAlert={error !== ""} />
        </div>
    )
}

const mapToState = state => {
    return {
        adminToken: state.authReducer.adminToken
    }
}

export default connect(mapToState)(AddEditPayroll);