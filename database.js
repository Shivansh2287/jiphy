const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

// creting connection 
mongoose.connect(
    `mongodb+srv://${process.env.DBUSERANDPASSWORD}@cluster0.br9lr.mongodb.net/jiphy?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("connected to DB 😎");
    }
);



// setting up schema

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" }
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true })


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/jiphy/image/upload/v1602323766/sample.jpg"
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }]
});



// making model form that schemas

mongoose.model("Post", postSchema)
mongoose.model("User", userSchema);
