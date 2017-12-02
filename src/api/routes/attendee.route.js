import express from 'express';
import AttendanceController from '../controllers/attendance.controller';
import AttendeeController from '../controllers/attendee.controller';

const router = express.Router();

router.route('/:attendanceId')
  .post(AttendeeController.insert);

router.param('attendanceId', AttendanceController.load);

export default router;
