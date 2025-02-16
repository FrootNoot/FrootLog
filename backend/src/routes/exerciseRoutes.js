// src/routes/todoRoutes.js
const express = require('express');
const exerciseController = require('../controllers/exerciseController');
const router = express.Router();

router.get('/', exerciseController.getExercisesByWorkout);
router.get('/search', exerciseController.searchExercises);
router.get('/workouts', exerciseController.getWorkouts);
router.post('/', exerciseController.addWorkout);
router.get('/workoutHistory', exerciseController.workoutHistory)
router.get('/workoutByDate', exerciseController.workoutByDate)


module.exports = router;
