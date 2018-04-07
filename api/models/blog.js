const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Укажите заголовок статьи']
    },
    text: {
        type: String,
        required: [true, 'Укажите содержимое статьи']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Укажите дату публикации']
    }
});

mongoose.model('blog', BlogSchema);