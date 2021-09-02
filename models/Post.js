const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
      title: {
            type: String,
            required: [true, 'Please add a title'],
            unique: true,
            trim: true
      },
      description: {
            type: String,
            trim: true
      }
});

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema)