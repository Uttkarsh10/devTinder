const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    recieverUserID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    senderUserID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["Ignored", "Interested", "Accepted", "Rejected"],
            message : '`{VALUE}` is not Supported',
        },
    },

},
{
    timestamps : true
}
)

connectionRequestSchema.index({senderUserID:1, recieverUserID:1}); // This is compound indexing

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    if(connectionRequest.senderUserID.equals(connectionRequest.recieverUserID)) {
        throw new Error("Cannot send connection request to self")
    }

    next();
});

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;