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

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo: Todo
}