const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
const urlSchema = new Schema({
  _id: { type: Number, index: true },
  long_url: String,
  created_at: Date
});

urlSchema.pre('save', function(next) {
  const doc = this;
  counter.findByIdAndUpdate({_id: 'url_count'}, { $inc: { seq: 1 } }, (error, counter) => {
      if (error)
          return next(error);
      doc.created_at = new Date();
      doc._id = counter.seq;
      next();
  });
});

const url = mongoose.model('url', urlSchema);

module.exports = url;