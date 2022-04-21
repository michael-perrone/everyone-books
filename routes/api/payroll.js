const router = require("express").Router();
const adminAuth = require("../../middleware/authAdmin");
const EmPayroll = require('../../models/EmPayroll');
const BusinessProfile = require("../../models/BusinessProfile");
const Employee = require("../../models/Employee");
const Shift = require('../../models/Shift');
const utils = require('../../utils/utils');
const Booking = require('../../models/Booking')
const Product = require("../../models/Product");
const ServiceType = require("../../models/ServiceType");

router.post("/getEmployeePayroll", adminAuth, async (req, res) => {
    const emPayroll = await EmPayroll.findOne({employee: req.body.employeeId});
    if (emPayroll) {
        console.log(emPayroll);
        return res.status(200).json({emPayroll});    
    }
    else {
        return res.status(400).send();
    }
})

router.post("/createEditEmployee", adminAuth, async (req, res) => {
    try {
    console.log(req.body)
    const employee = await Employee.findOne({_id: req.body.employeeId}).select(["fullName"]);
    console.log(employee)
    const currentEmp = await EmPayroll.findOne({employee: req.body.employeeId});
    if (currentEmp) {
        currentEmp.employeeName = employee.fullName,
        currentEmp.paidHourly = req.body.paidHourly;
        currentEmp.paidSalary = req.body.paidSalary,
        currentEmp.productCommission = req.body.productCommission,
        currentEmp.serviceCommission = req.body.serviceCommission,
        currentEmp.pcp = req.body.pcp === "% Earned" ? "nil" : req.body.pcp,
        currentEmp.scp = req.body.scp === "% Earned" ? "nil" : req.body.scp
        currentEmp.salary = req.body.salary;
        currentEmp.hourly = req.body.hourly;
        await currentEmp.save();
        res.status(200).send();
    }
    else {
        let newEmPayroll = new EmPayroll({
            employeeName: employee.fullName,
            employee: req.body.employeeId,
            paidHourly: req.body.paidHourly,
            paidSalary: req.body.paidSalary,
            productCommission: req.body.productCommission,
            serviceCommission: req.body.serviceCommission,
            pcp: req.body.pcp === "% Earned" ? "nil" : req.body.pcp,
            salary: req.body.salary,
            hourly: req.body.hourly,
            scp: req.body.scp === "% Earned" ? "nil" : req.body.scp
        })
        if (newEmPayroll) {
            await newEmPayroll.save();
            res.status(201).send();
        }
    }  
    } catch(error) {
        console.log(error)
    }
})

router.post("/getPayrollInfo", adminAuth, async (req, res) => {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const businessProfile = await BusinessProfile.findOne({business: req.admin.businessId});
    const emPayrolls = await EmPayroll.find({employee: businessProfile.employeesWhoAccepted});
    const payrollNums = [];
    for (let i = 0; i < emPayrolls.length; i++) {
        let hoursCount = 0;
        let serviceTotal = 0;
        let productTotal = 0;
       const dateDif = ((endDate - startDate)) / 1000 / 60 / 60 / 24 + 1;
       if (dateDif <= 0) {

           return res.status(400).send();
       }
       for (let d = 0; d < dateDif; d++) {
          const correctDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + d).toDateString();
          const shiftPerDay = await Shift.findOne({employeeId: emPayrolls[i].employee, shiftDate: correctDate});
          const bookingsPerDay = await Booking.find({employeeBooked: emPayrolls[i].employee, date: correctDate});
          if (emPayrolls[i].scp !== "nil" || emPayrolls[i].pcp !== "nil") {
            if (bookingsPerDay.length > 0) {
                for (let z = 0; z < bookingsPerDay.length; z++) {   
                    if (bookingsPerDay[z].products.length > 0) {
                        for (let q = 0; q < bookingsPerDay[z].products.length; q++) {
                            const product = await Product.findOne({_id: bookingsPerDay[z].products[q]});
                            productTotal = productTotal + Number(product.cost);
                        }
                    }
                    if (bookingsPerDay[z].serviceType.length > 0) {
                        for (let n = 0; n < bookingsPerDay[z].serviceType.length; n++) {
                            const service = await ServiceType.findOne({_id: bookingsPerDay[z].serviceType[n]});
                            serviceTotal = serviceTotal + Number(service.cost);
                        }
                    }
                }
            }
          }
          if (shiftPerDay) {
            let endNum = utils.stringToIntTime[shiftPerDay.timeEnd];
            let startNum = utils.stringToIntTime[shiftPerDay.timeStart];
            hoursCount = hoursCount + (endNum - startNum) / 12;
          }
       }

       const employee = await Employee.findOne({_id: emPayrolls[i].employee}).select(["fullName"]);
       
       
       let serviceEarned;
       if (emPayrolls[i].scp !== "nil") {
          let num = emPayrolls[i].scp / 100 * serviceTotal;
          console.log(num);
          serviceEarned = utils.convertNumToStringDollars(num);
       }
       else {
           serviceEarned = "$0.00";
           console.log(employee.fullName, "YOOOOO")
           
       }
       
       let productEarned;
       if (emPayrolls[i].pcp !== "nil") {
          productEarned = utils.convertNumToStringDollars(emPayrolls[i].pcp / 100  * productTotal);
       }
       else {
            productEarned = "$0.00";
       }
       let salary;
       if (emPayrolls[i].paidSalary) {
           let num = (utils.removeComma(emPayrolls[i].salary) * (dateDif / 365));
           console.log(num, "salary");
           salary = utils.addDollarSign(utils.removeAndRound(num));
       }
       else {
           salary = "$0.00"; 
       } 
       let hourlyEarned;
       if (emPayrolls[i].paidHourly) {
           let num = emPayrolls[i].hourly * hoursCount;
           console.log(num, "hourly");
           hourlyEarned = utils.convertNumToStringDollars(num);
       }
       else {
           hourlyEarned = "$0.00";
       }
      
       
       payrollNums.push({salary, hourlyEarned, productEarned, serviceEarned, employeeName: employee.fullName});
    }
    
    console.log(payrollNums);
    
    res.status(200).json({payrollNums});
})


module.exports = router;