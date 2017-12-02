import express from 'express';
import attendanceRoutes from './attendance.route';
import attendeeRoutes from './attendee.route';

const router = express.Router();

router.get('/', (req, res) => res.send('OK'));

router.use('/attendances', attendanceRoutes);
router.use('/attendee', attendeeRoutes);

export default router;
