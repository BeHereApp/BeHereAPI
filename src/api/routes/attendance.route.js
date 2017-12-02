import express from 'express';
import AttendanceController from '../controllers/attendance.controller'

const router = express.Router();

router.route('/')
  .get(AttendanceController.list)
  .post(AttendanceController.create);

router.route('/:attendanceId')
  .get(AttendanceController.get)
  .delete(AttendanceController.remove);

router.param('attendanceId', AttendanceController.load);

export default router;
