const mongoose = require('mongoose');

main()
.then(() => {
    console.log('Database connect success');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://user1:user123@cluster0.npyt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}

const todoSchema = new mongoose.Schema({
    name: String,
    complete: Boolean,
});

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true,
    },
    address: String,
    avatar: String,
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);
const User = mongoose.model('User', userSchema);


module.exports = {
    Todo,
    User,
}