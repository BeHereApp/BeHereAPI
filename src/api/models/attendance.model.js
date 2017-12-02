import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/api.error';

const AttendanceSchema = new mongoose.Schema ({
  date: {
    type: Date,
    required: [true, 'Attendance Date is required']
  },
  students: {
    type: [{
      type: Number
    }],
    default: []
  },
  professor_id: {
    type: Number,
    min: 0,
    required: [true, 'Professor Id is required']
  },
  attendance_id: {
    type: Number,
    min: 0,
    unique: true,
    required: [true, 'Attendance Id is required']
  },
  class_id: {
    type: Number,
    min: 0,
    required: [true, 'Class Id is required']
  },
  starting_date: {
    type: Date,
    default: Date.now,
    required: [true, 'Starting date is required']
  },
  timeout: {
    type: Number,
    min: 1,
    max: 200,
    required: [true, 'Timeout is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

AttendanceSchema.statics = {
  get(id) {
    return this.findOne({ attendance_id: id })
      .exec()
      .then(attendance => {
        if (attendance) {
          return attendance;
        }
        const err = new APIError('No such Attendance exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ date: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  }
}

export default mongoose.model('Attendance', AttendanceSchema);
