import React from 'react';
import styles from '../BusinessSignup.module.css';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import StatementAppear from '../../Shared/StatementAppear/StatementAppear';
import axios from "axios";
import ColorButton from '../../Shared/ColorButton/ColorButton';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { ADMIN_REGISTER_SUCCESS } from '../../actions/actions';
import c from 'config';

const BookingColumnsEnter = (props) => {
    const [bookingColumnType, setBookingColumnType] = React.useState('')
    const [bookingColumnNumber, setBookingColumnNumber] = React.useState('');
    const [bctChosen, setBctChosen] = React.useState(false);
    const [bcnChosen, setBcnChosen] = React.useState(false);
    const [usesShifts, setUsesShifts] = React.useState();

    function setShiftsYes() {
        setUsesShifts(true);
    }

    function setShiftsNo() {
        setUsesShifts(false);
    }

    function sendAllInfo() {
        const allInfo = {
           adminInfo: props.adminInfo, businessInfo: props.businessInfo, schedule: props.businessSchedule,
           businessName: props.nameOfBusiness, typeOfBusiness: props.kindOfBusiness, bookingColumnNumber: bookingColumnNumber, bookingColumnType: bookingColumnType, eq: usesShifts ? "y" : "n"
        }

        axios.post('/api/adminSignup', allInfo).then(
            response => {
                if (response.data.token) {
                    props.adminRegister(response.data.token);
                    console.log(props.admin)
                    props.history.push(`/admin/${props.admin.admin.id}`)
                }
            }
        ).catch(error => {
            console.log(error)
        })
    }
    
    function bookingColumnTypeHandler(e) {
        console.log(e.target.value)
        setBookingColumnType(e.target.value)
    }
    console.log(bookingColumnType)

    function bookingColumnNumberHandler(e) {
        setBookingColumnNumber(e.target.value)
    }

    function bctChosenHit() {
        if (bookingColumnType !== "") {
            setBctChosen(true);
        }
    }

   function bcnChosenHit() {
       if (bookingColumnNumber !== "") {
        setBcnChosen(true)
    }
       

        // DONT FORGET IF CHECK
        // props.setBookingNumberAndType(bookingColumnNumber, bookingColumnType)
        // props.showAdminDropDown()
    }

   
    
    return (
        <div style={{marginTop: '70px'}}>
             <p style={{marginLeft: "5px"}}>Please enter the area which your business will be booked. For example: a massage parlor takes appointments in an individual room, a tattoo studio may conduct appointments in individual rooms or chairs, and a tennis club would book out individual tennis courts. (For tattoo studio you can type "Room", and tennis club type "Court") </p>
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>   
                <input  placeholder={"Type of Booking Area"} value={bookingColumnType} onChange={bookingColumnTypeHandler}/>
                <SubmitButton onClick={bctChosenHit}>Enter</SubmitButton>
            </div>
           
          
        <StatementAppear appear={bookingColumnType !== "" && bctChosen}>
            <p style={{marginTop: "25px", textAlign: 'left', padding: '5px'}}>Please enter the number of {bookingColumnType}'s that you entered above that you have available at your business to be booked.</p>
           <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
             <select style={{width: '170px', height: "28px"}} className={styles.formInput} onChange={bookingColumnNumberHandler}>
                <option>Choose Number</option>
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
                <SubmitButton onClick={bcnChosenHit}>Continue!</SubmitButton>
            </div>
            </StatementAppear>
            <StatementAppear appear={bcnChosen && bookingColumnNumber !== ""}>
                <p style={{marginTop: "20px", padding: "5px 5px 20px 5px", textAlign: 'left'}}>Will your employees be working scheduled shifts from one set time to another in one of the {bookingColumnType}'s listed above? (Is a shift needed for an employee to be booked?) </p>
                <ColorButton backgroundColor={usesShifts === true ? "darkGray" : ""} clicked={setShiftsYes}>Yes</ColorButton>
                <ColorButton backgroundColor={usesShifts === false ? "darkGray" : ""} clicked={setShiftsNo}>No</ColorButton>
            </StatementAppear>
            <div style={{paddingTop: '40px'}}>
            <StatementAppear appear={usesShifts === true || usesShifts === false}>
                <SubmitButton onClick={sendAllInfo}>All Done!</SubmitButton>
            </StatementAppear>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.authReducer.admin,
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness,
        adminInfo: state.newReducers.adminInfo,
        businessInfo: state.newReducers.businessInfo,
        businessSchedule: state.newReducers.businessSchedule,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        adminRegister: (adminToken) => dispatch({type: ADMIN_REGISTER_SUCCESS, payload: {adminToken}})
    }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingColumnsEnter));