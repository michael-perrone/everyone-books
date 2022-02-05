const express = require("express");
const router = express.Router();
const BusinessProfile = require("../../models/BusinessProfile");
const Product = require('../../models/Product');
const Booking = require("../../models/Booking");
const utils = require("../../utils/utils");

router.post("/", async (req, res) => {
    try {
        const businessProfile = await BusinessProfile.findOne({business: req.body.businessId});
        const products = await Product.find({_id: businessProfile.products});
        if (businessProfile) {
            res.status(200).json({products: products});
        }
    }
    catch(error) {
        return res.status(500).send();
    }
});

router.post("/removeProducts", async (req, res) => {
    try {
        const booking = await Booking.findOne({_id: req.body.bookingId});
        const bookingProducts = [...booking.products];
        const product = await Product.findOne({_id: req.body.productId});
        const newBookingProducts = bookingProducts.filter((e, i, a) => {
            return req.body.productId.toString() !== e._id.toString()  
        })
        booking.products = newBookingProducts;
        console.log(product)
        await booking.save();
        console.log(booking.products);
        console.log(bookingProducts);
        if (booking.products.length !== bookingProducts.length) {
            let cost = utils.removeDollarSign(booking.cost);
            let newCost = cost - parseFloat(product.cost);
            console.log(product.cost);
            booking.cost = utils.addDollarSign(newCost);
            console.log(cost);
            console.log(product.cost);
            await booking.save();
            res.status(200).json({newCost: utils.addDollarSign(newCost)});
        }
    }
    catch(error) {
        console.log(error)
        return res.status(500).send();
    }
})

router.post("/addProducts", async (req, res) => {
    try {
        const booking = await Booking.findOne({_id: req.body.bookingId});;
        console.log(booking.products);
        bookingProducts = [...booking.products, ...req.body.productIds];
        const products = await Product.find({_id: req.body.productIds});
        let productsCost = 0;
        for (let i = 0; i < products.length; i++) {
            productsCost += parseFloat(products[i].cost);
        }
        booking.products = bookingProducts;
        let cost;
        if (booking.cost.split("")[0] === "$") {
            cost = utils.removeDollarSign(booking.cost);
        }
        else {
            cost = parseFloat(booking.cost);
        }
        console.log(cost);
        let newCost = cost + productsCost;
        booking.cost = utils.addDollarSign(newCost);
        let correctCost = utils.addDollarSign(newCost);
        console.log(newCost)
        await booking.save();
        res.status(200).json({newCost: correctCost});
    }
    catch(error) {
        console.log(error)
    }
})


module.exports = router;