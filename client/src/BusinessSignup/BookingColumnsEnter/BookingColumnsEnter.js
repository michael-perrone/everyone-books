import React from 'react';
import styles from '../BusinessSignup.module.css';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import StatementAppear from '../../Shared/StatementAppear/StatementAppear';
import { SET_BOOKING_NUMBER_AND_TYPE, ADMIN_DROP_DOWN } from '../../actions/actions';
import {connect} from 'react-redux';

const BookingColumnsEnter = (props) => {
    const [bookingColumnType, setBookingColumnType] = React.useState('')
    const [bookingColumnNumber, setBookingColumnNumber] = React.useState('');
    
    function bookingColumnTypeHandler(e) {
        setBookingColumnType(e.target.value)
    }
    console.log(bookingColumnType)

    function bookingColumnNumberHandler(e) {
        setBookingColumnNumber(e.target.value)
    }

   function submitNumbersAndType() {
        // DONT FORGET IF CHECK
        props.setBookingNumberAndType(bookingColumnNumber, bookingColumnType)
        props.showAdminDropDown()
    }

    React.useEffect(() => {
        if (props.kindOfBusiness === "Wax Center") {
            setBookingColumnType('Room')
        }
        else if (props.kindOfBusiness === "Restaurant") {
            setBookingColumnType('Table')
        }
       else if (props.kindOfBusiness === "Hair Salon" || props.kindOfBusiness === "Barber Shop") {
            setBookingColumnType('Station')
        }
       else if (props.kindOfBusiness === "Medical Office") {
           setBookingColumnType('Room')
       }
       else if (props.kindOfBusiness === "Tennis Club") {
           setBookingColumnType('Court')
       }
       else if (props.kindOfBusiness === "Tanning Salon") {
           setBookingColumnType('Room')
       }
    }, [props.kindOfBusiness])
    
    return (
        <div style={{marginTop: '30px'}}>
        {props.kindOfBusiness === "Wax Center" && 
            <p>For a wax center we create your schedule around the number of rooms your business has. For example: your schedule will have Room 1, Room 2, etc. Please enter the number of rooms below.</p>
            }
            {props.kindOfBusiness === "Beauty Center" && 
            
                <p>For a Beauty Center we reccomend we will create your schedule for either the number of rooms or number of stations available. For example: your schedule will have Room 1, Room 2, etc. Choose your preference below.</p>}
            {props.kindOfBusiness === "Fitness Center" && <p>For a Fitness center we will create your schedule based on fitness rooms or stations, however neither are actually required. If you would like to schedule one of your trainers simply just select an open station and insert their name into the station and time slot.</p>}
            {props.kindOfBusiness === "Medical Office" && <p>For a Medical Office we will create your schedule based on rooms. Please enter the number of rooms below.</p>}
            {props.kindOfBusiness === "Restaurant" && <p>For a Restaurant we will create your schedule based on the number of tables at your restaurant. Please enter the number of tables at your restaurant below.</p>}
            {props.kindOfBusiness === "Tattoo Shop" && <p>For a Tattoo Shop we will create your schedule based on the number of stations or rooms available for tattooing. Please select your preference below.</p>}
            {(props.kindOfBusiness === "Hair Salon" || props.kindOfBusiness === "Barber Shop") && <p>For a Hair Salon or Barber Shop we will create your schedule based on the number of stations available. Please enter the number of stations at your business below.</p>}
            {props.kindOfBusiness === "Tanning Salon" && <p>For a Tanning Salon we will create your schedule based off the number of rooms your salon has, please enter the number of rooms below.</p>}
            {props.kindOfBusiness === "Tennis Club" && <p>For a Tennis Club we will create your schedule based on the number of courts your club has. Please enter the number of courts below.</p>}
            <select onChange={bookingColumnTypeHandler}>
                <option>Room</option>
                <option>Station</option>
                <option>Chair</option>
                <option></option>
            </select>
        <StatementAppear appear={bookingColumnType !== ""}>
            <p style={{textAlign: 'left', padding: '8px'}}>Please enter the number of {bookingColumnType}'s here. Then hit finish and you will get a glimpse at your new scheduling software!</p>
            <select style={{width: '200px', marginLeft: '20px'}} className={styles.formInput} onChange={bookingColumnNumberHandler}>
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
            <SubmitButton onClick={submitNumbersAndType}>Finish!</SubmitButton>
            </StatementAppear>
            
        </div>
    )
}


const mapStateToProps = state => {
    return {

        kindOfBusiness: state.newReducers.kindOfBusiness
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showAdminDropDown: () => dispatch({type: ADMIN_DROP_DOWN}),
        setBookingNumberAndType: (bookingColumnNumber, bookingColumnType) => dispatch({type: SET_BOOKING_NUMBER_AND_TYPE, payload: {bookingColumnNumber, bookingColumnType}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingColumnsEnter);