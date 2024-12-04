const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    }
},
{
    timestamps: true,
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;