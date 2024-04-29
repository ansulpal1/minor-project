const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'userModal',
            required: [true, "Please provide a valid User ID"]
        },
        hospitalName: {
            type: String
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        bloodGroup: {
            type: String,
        },
        message: {
            type: String,
        },
        location: {
            latitude: {
                type: String,
            },
            longitude: {
                type: String,
            },
        },


    },
    { timestamps: true }

)
module.exports = mongoose.model("notification", notificationSchema);