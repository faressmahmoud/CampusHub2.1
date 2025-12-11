import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Link title is required'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        try {
          new URL(v);
          return true;
        } catch {
          return false;
        }
      },
      message: 'Please enter a valid URL',
    },
  },
}, {
  timestamps: true,
});

// Index for faster queries
linkSchema.index({ user: 1, createdAt: -1 });

const Link = mongoose.model('Link', linkSchema);

export default Link;

