import Attendance from '../models/attendance.model';

function load(req, res, next, id) {
  Attendance.get(id)
    .then(attendance => {
      req.attendance = attendance;
      return next()
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.attendance);
}

function create(req, res, next) {
  const attendance = {
    date: new Date(+req.body.date*1000),
    professor_id: req.body.professor_id,
    attendance_id: req.body.attendance_id,
    class_id: req.body.class_id,
    starting_date: new Date(+req.body.starting_date*1000),
    timeout: req.body.timeout,
    password: req.body.password
  };

  Attendance.findOneAndUpdate({ attendance_id: attendance.attendance_id }, attendance, { upsert: true })
    .then(savedAttendance => res.json(savedAttendance))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Attendance.list({ limit, skip })
    .then(attendances => res.json(attendances))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const attendance = req.attendance;
  attendance.remove()
    .then(deletedAttendance => res.json(deletedAttendance))
    .catch(e => next(e));
}

export default { load, get, create, list, remove };
