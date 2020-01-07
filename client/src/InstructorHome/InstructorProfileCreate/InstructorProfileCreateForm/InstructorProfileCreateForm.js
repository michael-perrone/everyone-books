import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import styles from "./InstructorProfileCreateForm.module.css";
import { connect } from "react-redux";
import ImageAdd from '../../../ImageAdd/ImageAdd';


// input
class InstructorProfileCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multerImage: "",
      instructorTokenItems: "",
      jobExperienceArray: [],
      certificationsArray: [],
      formSelectors: [
        { name: "Job Experience", selected: true, completed: false },
        { name: "Certifications", selected: false, completed: false },
        { name: "Other Info", selected: false, completed: false }
      ],
      certifications: {
        certifiedBy: "",
        certificationDate: ""
      },
      jobExperience: {
        clubName: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        jobTitle: "",
        current: ""
      },
      otherInfo: {
        location: "",
        yearsTeaching: "",
        bio: "",
        lessonRate: ""
      },
      showJobExp: true,
      showCertification: false,
      showOtherInfo: false
    };
    this.addToJobArray = this.addToJobArray.bind(this);
    this.addToCertArray = this.addToCertArray.bind(this);
    this.jobExpFormHandler = this.jobExpFormHandler.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.otherInfoHandler = this.otherInfoHandler.bind(this);
    this.certFormHandler = this.certFormHandler.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.skipProfile = this.skipProfile.bind(this);
  }

  submitInfo(event) {
    event.preventDefault();
    const bigObjectSending = {
      jobExperience: this.state.jobExperienceArray,
      ...this.state.otherInfo,
      certifications: this.state.certificationsArray
    };
    axios
      .post("/api/instructorProfile", bigObjectSending, {
        headers: { "x-auth-token": this.props.instructorToken }
      })
      .then(response => {
        if (response.status === 200) {
          this.props.history.push(
            `/instructor/${this.props.instructor.instructor.id}`
          );
        }
      });
  }

  addToJobArray(event) {
    event.preventDefault();
    const newJobExperienceArray = [...this.state.jobExperienceArray];
    newJobExperienceArray.push({
      jobTitle: this.state.jobExperience.jobTitle,
      tomato: "hi",
      jobDuration:
        parseInt(this.state.jobExperience.toYear) -
          parseInt(this.state.jobExperience.fromYear) ===
        0
          ? "Less than 1"
          : parseInt(this.state.jobExperience.toYear) -
            parseInt(this.state.jobExperience.fromYear),
      clubName: this.state.jobExperience.clubName
    });
    this.setState({ jobExperienceArray: newJobExperienceArray });
    const newJobExperience = { ...this.state.jobExperience };
    const keysArray = Object.keys(this.state.jobExperience);
    for (let i = 0; i < keysArray.length; i++) {
      newJobExperience[keysArray[i]] = "";
    }
    this.setState({ jobExperience: newJobExperience });
  }

  addToCertArray(event) {
    event.preventDefault();
    const newCertArray = [...this.state.certificationsArray];
    newCertArray.push(this.state.certifications);
    this.setState({ certificationsArray: newCertArray });
    const newCertObject = { ...this.state.certifications };
    const keysArray = Object.keys(this.state.certifications);
    for (let i = 0; i < keysArray.length; i++) {
      newCertObject[keysArray[i]] = "";
    }
    this.setState({ jobExperience: newCertObject });
  }

  otherInfoHandler(event) {
    const newOtherInfoObject = { ...this.state.otherInfo };
    newOtherInfoObject[event.target.name] = event.target.value;
    this.setState({ otherInfo: newOtherInfoObject });
  }

  certFormHandler(event) {
    const newCertObject = { ...this.state.certifications };
    newCertObject[event.target.name] = event.target.value;
    this.setState({ certifications: newCertObject });
  }

  changeSelected = (index, elementName) => () => {
    const newFormSelectors = [...this.state.formSelectors];
    for (let i = 0; i < newFormSelectors.length; i++) {
      newFormSelectors[i].selected = false;
    }
    this.setState({ newFormSelectors: newFormSelectors });
    newFormSelectors[index].selected = true;
    this.setState({ formSelectors: newFormSelectors });
    this.setState({
      showJobExp: false,
      showOtherInfo: false,
      showCertification: false
    });
    if (elementName === "Job Experience") {
      this.setState({ showJobExp: true });
    } else if (elementName === "Certifications") {
      this.setState({ showCertification: true });
    } else if (elementName === "Other Info") {
      this.setState({ showOtherInfo: true });
    }
  };

  jobExpFormHandler(event) {
    const newJobExp = { ...this.state.jobExperience };
    newJobExp[event.target.name] = event.target.value;
    this.setState({ jobExperience: newJobExp });
  }

  skipProfile(event) {
    event.preventDefault();
    axios
      .post(
        "/api/instructorProfile",
        {},
        {
          headers: {
            "x-auth-token": this.props.instructorToken
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          this.props.history.push(
            `/instructor/${this.props.instructor.instructor.id}`
          );
        }
      });
  }

  uploadImage = event => {
    let imageFormObj = new FormData();
    console.log(event.target);
    console.log(event.target.files[0])
    imageFormObj.append("imageName", "multer-image", +Date.now());
    imageFormObj.append("imageData", event.target.files[0]);

    this.setState({ multerImage: URL.createObjectURL(event.target.files[0]) });

    axios.post("/uploadmulter", imageFormObj).then(response => {
      console.log(response);
    });
  };

  render() {
    return (
      <div id={styles.formsContainer}>
        <div id={styles.formSelectors}>
          <ImageAdd/>
          {this.state.formSelectors.map((element, index) => {
            return (
              <p
                onClick={this.changeSelected(index, element.name)}
                key={element.name}
                id={
                  element.selected
                    ? styles.formSelectorsSelected
                    : styles.formSelectorsNotSelected
                }
                className={styles.individualSelectors}
              >
                {element.name}
              </p>
            );
          })}
        </div>
        <form
          style={{ marginTop: "50px" }}
          id={styles.instructorProfileCreateForm}
        >
          {this.state.showJobExp && (
            <div className={styles.forms}>
              <p className={styles.pTags}>
                Enter all previous tennis instruction experiences including the
                start date, end date, company, and job title.
              </p>
              <div id={styles.pastExpForm}>
                <div className={styles.formSeparator}>
                  <label className={`${styles.labels}`}>
                    Name of Former Company:{" "}
                  </label>
                  <input
                    style={{ width: "162px" }}
                    onChange={this.jobExpFormHandler}
                    className={`${styles.inputs} ${styles.ml5}`}
                    value={this.state.jobExperience.clubName}
                    name="clubName"
                  />
                </div>
                <div className={styles.formSeparator}>
                  <label className={styles.labels}>
                    {" "}
                    Approximate Date Started:
                  </label>
                  <select
                    onChange={this.jobExpFormHandler}
                    className={styles.selects}
                    value={this.state.jobExperience.fromYear}
                    name="fromYear"
                  >
                    <option>Year</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                    <option>2014</option>
                    <option>2013</option>
                    <option>2012</option>
                    <option>2011</option>
                    <option>2010</option>
                    <option>2009</option>
                    <option>2008</option>
                    <option>2007</option>
                    <option>2006</option>
                    <option>2005</option>
                    <option>2004</option>
                    <option>2003</option>
                    <option>2002</option>
                    <option>2001</option>
                    <option>2000</option>
                    <option>1999</option>
                    <option>1998</option>
                    <option>1997</option>
                    <option>1996</option>
                    <option>1995</option>
                    <option>1994</option>
                    <option>1993</option>
                    <option>1992</option>
                    <option>1991</option>
                    <option>1990</option>
                    <option>1989</option>
                    <option>1988</option>
                    <option>1987</option>
                    <option>1986</option>
                    <option>1985</option>
                    <option>1984</option>
                    <option>1983</option>
                    <option>1982</option>
                    <option>1981</option>
                    <option>1980</option>
                    <option>1979</option>
                    <option>1978</option>
                    <option>1977</option>
                    <option>1976</option>
                    <option>1975</option>
                    <option>1974</option>
                    <option>1973</option>
                    <option>1972</option>
                    <option>1971</option>
                    <option>1970</option>
                  </select>
                  <select
                    onChange={this.jobExpFormHandler}
                    className={styles.selects}
                    value={this.state.jobExperience.fromMonth}
                    name="fromMonth"
                  >
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>
                <div className={styles.formSeparator}>
                  <label
                    style={{ letterSpacing: ".2px" }}
                    className={styles.labels}
                  >
                    Approximate Date Ended:
                  </label>
                  <select
                    onChange={this.jobExpFormHandler}
                    className={styles.selects}
                    value={this.state.jobExperience.toYear}
                    name="toYear"
                  >
                    <option>Year</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                    <option>2014</option>
                    <option>2013</option>
                    <option>2012</option>
                    <option>2011</option>
                    <option>2010</option>
                    <option>2009</option>
                    <option>2008</option>
                    <option>2007</option>
                    <option>2006</option>
                    <option>2005</option>
                    <option>2004</option>
                    <option>2003</option>
                    <option>2002</option>
                    <option>2001</option>
                    <option>2000</option>
                    <option>1999</option>
                    <option>1998</option>
                    <option>1997</option>
                    <option>1996</option>
                    <option>1995</option>
                    <option>1994</option>
                    <option>1993</option>
                    <option>1992</option>
                    <option>1991</option>
                    <option>1990</option>
                    <option>1989</option>
                    <option>1988</option>
                    <option>1987</option>
                    <option>1986</option>
                    <option>1985</option>
                    <option>1984</option>
                    <option>1983</option>
                    <option>1982</option>
                    <option>1981</option>
                    <option>1980</option>
                    <option>1979</option>
                    <option>1978</option>
                    <option>1977</option>
                    <option>1976</option>
                    <option>1975</option>
                    <option>1974</option>
                    <option>1973</option>
                    <option>1972</option>
                    <option>1971</option>
                    <option>1970</option>
                  </select>

                  <select
                    onChange={this.jobExpFormHandler}
                    className={styles.selects}
                    value={this.state.jobExperience.toMonth}
                    name="toMonth"
                  >
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>
                <div className={styles.formSeparator}>
                  <label
                    style={{ letterSpacing: "0.5px" }}
                    className={styles.labels}
                  >
                    What was your job title?{" "}
                  </label>
                  <input
                    onChange={this.jobExpFormHandler}
                    className={`${styles.inputs} ${styles.ml5}`}
                    value={this.state.jobExperience.jobTitle}
                    name="jobTitle"
                  />
                </div>
                <button id={styles.addExp} onClick={this.addToJobArray}>
                  Add Experience
                </button>
              </div>
              
            </div>
          )}
          {this.state.showCertification && (
            <div className={styles.forms}>
              <p className={styles.pTags}>
                Enter all the certifications you have earned as an instructor
                (PTR, USPTA, ATP etc.). First add the name of the organization
                that certified you, then add the approximate certification date.
                If you haven't earned any, you can leave this part of the form
                blank.
              </p>
              <div id={styles.certForm}>
                <div>
                  <label style={{ fontSize: "13px", marginRight: "4px" }}>
                    Certification Year:{" "}
                  </label>
                  <select
                    onChange={this.certFormHandler}
                    name="certificationDate"
                    value={this.state.certifications.certificationDate}
                    className={styles.selects}
                  >
                    <option>Year</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                    <option>2014</option>
                    <option>2013</option>
                    <option>2012</option>
                    <option>2011</option>
                    <option>2010</option>
                    <option>2009</option>
                    <option>2008</option>
                    <option>2007</option>
                    <option>2006</option>
                    <option>2005</option>
                    <option>2004</option>
                    <option>2003</option>
                    <option>2002</option>
                    <option>2001</option>
                    <option>2000</option>
                    <option>1999</option>
                    <option>1998</option>
                    <option>1997</option>
                    <option>1996</option>
                    <option>1995</option>
                    <option>1994</option>
                    <option>1993</option>
                    <option>1992</option>
                    <option>1991</option>
                    <option>1990</option>
                    <option>1989</option>
                    <option>1988</option>
                    <option>1987</option>
                    <option>1986</option>
                    <option>1985</option>
                    <option>1984</option>
                    <option>1983</option>
                    <option>1982</option>
                    <option>1981</option>
                    <option>1980</option>
                    <option>1979</option>
                    <option>1978</option>
                    <option>1977</option>
                    <option>1976</option>
                    <option>1975</option>
                    <option>1974</option>
                    <option>1973</option>
                    <option>1972</option>
                    <option>1971</option>
                    <option>1970</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "8px"
                    }}
                  >
                    Certified By:{" "}
                  </label>
                  <input
                    style={{ width: "188px" }}
                    onChange={this.certFormHandler}
                    name="certifiedBy"
                    value={this.state.certifications.certifiedBy}
                    placeholder="Certified By"
                    className={styles.inputs}
                  />
                </div>
                <button
                  style={{ width: "120px", alignSelf: "center" }}
                  onClick={this.addToCertArray}
                >
                  Add Certification
                </button>
              </div>
            </div>
          )}
          {this.state.showOtherInfo && (
            <div className={styles.forms}>
              <p className={styles.pTags}>
                There a few more fields you can fill out to finish up creating
                your profile. Remember, you can come back and change or fill
                these in later.
              </p>
              <div style={{ display: "flex", margin: "10px 15px" }}>
                <p>Years Teaching:</p>
                <select
                  style={{ width: "50px" }}
                  value={this.state.otherInfo.yearsTeaching}
                  placeholder="Years Teaching"
                  className={styles.selects}
                  onChange={this.otherInfoHandler}
                  name="yearsTeaching"
                >
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
                </select>

                <p style={{ marginLeft: "20px" }}>Lesson Rate:</p>
                <select
                  style={{ width: "50px" }}
                  value={this.state.otherInfo.lessonRate}
                  placeholder="Lesson Rate"
                  className={styles.selects}
                  onChange={this.otherInfoHandler}
                  name="lessonRate"
                >
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
                  <option>101</option>
                  <option>102</option>
                  <option>103</option>
                  <option>104</option>
                  <option>105</option>
                  <option>106</option>
                  <option>107</option>
                  <option>108</option>
                  <option>109</option>
                  <option>110</option>
                  <option>111</option>
                  <option>112</option>
                  <option>113</option>
                  <option>114</option>
                  <option>115</option>
                  <option>116</option>
                  <option>117</option>
                  <option>118</option>
                  <option>119</option>
                  <option>120</option>
                  <option>121</option>
                  <option>122</option>
                  <option>123</option>
                  <option>124</option>
                  <option>125</option>
                  <option>126</option>
                  <option>127</option>
                  <option>128</option>
                  <option>129</option>
                  <option>130</option>
                  <option>131</option>
                  <option>132</option>
                  <option>133</option>
                  <option>134</option>
                  <option>135</option>
                  <option>136</option>
                  <option>137</option>
                  <option>138</option>
                  <option>139</option>
                  <option>140</option>
                  <option>141</option>
                  <option>142</option>
                  <option>143</option>
                  <option>144</option>
                  <option>145</option>
                  <option>146</option>
                  <option>147</option>
                  <option>148</option>
                  <option>149</option>
                  <option>150</option>
                  <option>151</option>
                  <option>152</option>
                  <option>153</option>
                  <option>154</option>
                  <option>155</option>
                  <option>156</option>
                  <option>157</option>
                  <option>158</option>
                  <option>159</option>
                  <option>160</option>
                  <option>161</option>
                  <option>162</option>
                  <option>163</option>
                  <option>164</option>
                  <option>165</option>
                  <option>166</option>
                  <option>167</option>
                  <option>168</option>
                  <option>169</option>
                  <option>170</option>
                  <option>171</option>
                  <option>172</option>
                  <option>173</option>
                  <option>174</option>
                  <option>175</option>
                  <option>176</option>
                  <option>177</option>
                  <option>178</option>
                  <option>179</option>
                  <option>180</option>
                  <option>181</option>
                  <option>182</option>
                  <option>183</option>
                  <option>184</option>
                  <option>185</option>
                  <option>186</option>
                  <option>187</option>
                  <option>188</option>
                  <option>189</option>
                  <option>190</option>
                  <option>191</option>
                  <option>192</option>
                  <option>193</option>
                  <option>194</option>
                  <option>195</option>
                  <option>196</option>
                  <option>197</option>
                  <option>198</option>
                  <option>199</option>
                  <option>200</option>
                  <option>201</option>
                  <option>202</option>
                  <option>203</option>
                  <option>204</option>
                  <option>205</option>
                  <option>206</option>
                  <option>207</option>
                  <option>208</option>
                  <option>209</option>
                  <option>210</option>
                  <option>211</option>
                  <option>212</option>
                  <option>213</option>
                  <option>214</option>
                  <option>215</option>
                  <option>216</option>
                  <option>217</option>
                  <option>218</option>
                  <option>219</option>
                  <option>220</option>
                  <option>221</option>
                  <option>222</option>
                  <option>223</option>
                  <option>224</option>
                  <option>225</option>
                  <option>226</option>
                  <option>227</option>
                  <option>228</option>
                  <option>229</option>
                  <option>230</option>
                  <option>231</option>
                  <option>232</option>
                  <option>233</option>
                  <option>234</option>
                  <option>235</option>
                  <option>236</option>
                  <option>237</option>
                  <option>238</option>
                  <option>239</option>
                  <option>240</option>
                  <option>241</option>
                  <option>242</option>
                  <option>243</option>
                  <option>244</option>
                  <option>245</option>
                  <option>246</option>
                  <option>247</option>
                  <option>248</option>
                  <option>249</option>
                  <option>250</option>
                  <option>251</option>
                  <option>252</option>
                  <option>253</option>
                  <option>254</option>
                  <option>255</option>
                  <option>256</option>
                  <option>257</option>
                  <option>258</option>
                  <option>259</option>
                  <option>260</option>
                  <option>261</option>
                  <option>262</option>
                  <option>263</option>
                  <option>264</option>
                  <option>265</option>
                  <option>266</option>
                  <option>267</option>
                  <option>268</option>
                  <option>269</option>
                  <option>270</option>
                  <option>271</option>
                  <option>272</option>
                  <option>273</option>
                  <option>274</option>
                  <option>275</option>
                  <option>276</option>
                  <option>277</option>
                  <option>278</option>
                  <option>279</option>
                  <option>280</option>
                  <option>281</option>
                  <option>282</option>
                  <option>283</option>
                  <option>284</option>
                  <option>285</option>
                  <option>286</option>
                  <option>287</option>
                  <option>288</option>
                  <option>289</option>
                  <option>290</option>
                  <option>291</option>
                  <option>292</option>
                  <option>293</option>
                  <option>294</option>
                  <option>295</option>
                  <option>296</option>
                  <option>297</option>
                  <option>298</option>
                  <option>299</option>
                  <option>300</option>
                  <option>301</option>
                  <option>302</option>
                  <option>303</option>
                  <option>304</option>
                  <option>305</option>
                  <option>306</option>
                  <option>307</option>
                  <option>308</option>
                  <option>309</option>
                  <option>310</option>
                  <option>311</option>
                  <option>312</option>
                  <option>313</option>
                  <option>314</option>
                  <option>315</option>
                  <option>316</option>
                  <option>317</option>
                  <option>318</option>
                  <option>319</option>
                  <option>320</option>
                  <option>321</option>
                  <option>322</option>
                  <option>323</option>
                  <option>324</option>
                  <option>325</option>
                  <option>326</option>
                  <option>327</option>
                  <option>328</option>
                  <option>329</option>
                  <option>330</option>
                  <option>331</option>
                  <option>332</option>
                  <option>333</option>
                  <option>334</option>
                  <option>335</option>
                  <option>336</option>
                  <option>337</option>
                  <option>338</option>
                  <option>339</option>
                  <option>340</option>
                  <option>341</option>
                  <option>342</option>
                  <option>343</option>
                  <option>344</option>
                  <option>345</option>
                  <option>346</option>
                  <option>347</option>
                  <option>348</option>
                  <option>349</option>
                  <option>350</option>
                  <option>351</option>
                  <option>352</option>
                  <option>353</option>
                  <option>354</option>
                  <option>355</option>
                  <option>356</option>
                  <option>357</option>
                  <option>358</option>
                  <option>359</option>
                  <option>360</option>
                  <option>361</option>
                  <option>362</option>
                  <option>363</option>
                  <option>364</option>
                  <option>365</option>
                  <option>366</option>
                  <option>367</option>
                  <option>368</option>
                  <option>369</option>
                  <option>370</option>
                  <option>371</option>
                  <option>372</option>
                  <option>373</option>
                  <option>374</option>
                  <option>375</option>
                  <option>376</option>
                  <option>377</option>
                  <option>378</option>
                  <option>379</option>
                  <option>380</option>
                  <option>381</option>
                  <option>382</option>
                  <option>383</option>
                  <option>384</option>
                  <option>385</option>
                  <option>386</option>
                  <option>387</option>
                  <option>388</option>
                  <option>389</option>
                  <option>390</option>
                  <option>391</option>
                  <option>392</option>
                  <option>393</option>
                  <option>394</option>
                  <option>395</option>
                  <option>396</option>
                  <option>397</option>
                  <option>398</option>
                  <option>399</option>
                  <option>400</option>
                </select>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginLeft: "16px", marginRight: "8px" }}>
                  Location:
                </p>

                <input
                  value={this.state.otherInfo.location}
                  placeholder="(City, State)"
                  style={{ width: "236px" }}
                  className={styles.inputs}
                  onChange={this.otherInfoHandler}
                  name="location"
                />
              </div>
              <textarea
                style={{ marginLeft: "15px", padding: "4px" }}
                id={styles.text}
                maxLength="340"
                value={this.state.otherInfo.bio}
                placeholder="Please enter a Bio about yourself for users to see."
                onChange={this.otherInfoHandler}
                name="bio"
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "space-around",
              width: "100"
            }}
          >
            <button
              onClick={this.submitInfo}
              className={styles.createSkipButton}
            >
              {" "}
              Save Profile
            </button>
            <button
              onClick={this.skipProfile}
              style={{ backgroundColor: "lightgray" }}
              className={styles.createSkipButton}
            >
              Skip For Now
            </button>
          </div>
        </form>
        {this.state.jobExperienceArray.length > 0 && this.state.showJobExp && (
          <div className={styles.jobCertArrayDiv}>
            {this.state.jobExperienceArray.map((element, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    padding: "10px"
                  }}
                  key={element.clubName + element.jobTitle}
                >
                  <p>Job {index + 1}:</p>
                  <p>{element.clubName}</p>
                </div>
              );
            })}
          </div>
        )}
        {this.state.certificationsArray.length > 0 &&
          this.state.showCertification && (
            <div className={styles.jobCertArrayDiv}>
              {this.state.certificationsArray.map((element, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      padding: "10px"
                    }}
                    key={element.certifiedBy + index}
                  >
                    <p>Certification {index + 1}:</p>
                    <p style={{ marginLeft: "4px" }}>{element.certifiedBy}</p>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructorToken: state.authReducer.instructorToken,
    instructor: state.authReducer.instructor
  };
};

export default withRouter(
  connect(mapStateToProps, null)(InstructorProfileCreateForm)
);
