// src/routes/todoRoutes.js
const express = require('express');
const exerciseController = require('../controllers/exerciseController');
const router = express.Router();

router.get('/', exerciseController.getExercisesByWorkout);
router.get('/search', exerciseController.searchExercises);
router.get('/latest', exerciseController.getLatestWorkout);
router.get('/workouts', exerciseController.getWorkouts);
router.get('/yearlyWorkout', exerciseController.countYearlyWorkout);
router.get('/countworkouts', exerciseController.getCountWorkoutWeek);
router.get('/frequentexercise', exerciseController.getMostFrequentExercise);
router.post('/', exerciseController.addWorkout);
router.get('/workoutHistory', exerciseController.workoutHistory)
router.get('/workoutByDate', exerciseController.workoutByDate)
router.put('/updateWorkout/:workout_id', exerciseController.updateWorkout);
router.put('/updateExercise/:exercise_id', exerciseController.updateExercise);
router.delete('/deleteWorkout/:workout_id', exerciseController.deleteWorkout);



module.exports = router;
