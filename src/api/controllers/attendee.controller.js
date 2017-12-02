import Attendance from '../models/attendance.model';
import httpStatus from 'http-status';
import APIError from '../helpers/api.error';


function insert(req, res, next) {
  const attendance = req.attendance;
  const user_id = req.body.user_id;
  const password = req.body.password;
  if (attendance && user_id && password && check(attendance, password)) {
    if (attendance.students.indexOf(user_id) == -1) {
      attendance.students.push(user_id);
      return attendance.save()
        .then(savedAttendance => res.json(savedAttendance))
        .catch(e => next(e));
    }
    res.json(attendance);
  } else {
    const err = new APIError('Invalid credentials', httpStatus.UNAUTHORIZED);
    next(err);
  }
}

function check(atd, pass) {
  const now = new Date();
  const final_time = atd.starting_date.getTime() + atd.timeout*60000;
  return now <= final_time && atd.password == pass;
}

export default { insert };
