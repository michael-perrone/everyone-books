const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    default: "none"
  },
  imageData: {
    type: String
  }
});

const Image = mongoose.model("Image", ImageSchema);
