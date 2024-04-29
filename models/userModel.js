const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: [true, "role is required"],
            enum: ["admin", "organisation", "donar", "hospital"],
        },
        name: {
            type: String,

            required: function () {
                if (this.role === "donar" || this.role === "admin") {
                    return true;
                }
                return false;
            },
        },
        organisationName: {
            type: String,

            required: function () {
                if (this.role === "organisation") {
                    return true;
                }
                return false;
            },
        },
        hospitalName: {

            type: String,
            required: function () {
                if (this.role === "hospital") {
                    return true;
                }
                return false;
            },
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is requied"],


        },

        address: {
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



        phone: {

            type: String,
            required: [true, "phone number is required"],
        },
        // avatar: {
        //     public_id: {
        //         type: String,
        //         required: [true, "pblic id numbe is required"],
        //     },
        //     url: {
        //         type: String,
        //         required: [true, "urlis required"],
        //     },
        // },
        country: {
            type: String,
            required: [true, "Country  is required"],
        },

        state: {
            type: String,
            required: [true, "State  is required"],
        },
        city: {
            type: String,
            required: [true, " City  is required"],
        },
        lastdonation: {
            type: String,


        },
        bloodGroup: {
            type: String,
            required: function () {
                if (this.role === "donar" || this.role === "admin") {
                    return true;
                }
                return false;
            },

        },
        age: {
            type: String,
            required: function () {
                if (this.role === "donar" || this.role === "admin") {
                    return true;
                }
                return false;
            },

        },
        gender: {
            type: String,
            required: function () {
                if (this.role === "donar" || this.role === "admin") {
                    return true;
                }
                return false;
            },

        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);