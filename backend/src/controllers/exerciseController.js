const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.getExercisesByWorkout = async (req, res) => {
  const { workout_id } = req.query;
  try {
    const result = await db.query(
      `SELECT e.id, e.name, we.weight, we.sets, we.reps 
       FROM workout_exercises we
       JOIN exercises e ON we.exercise_id = e.id
       WHERE we.workout_id = $1`,
      [workout_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.searchExercises = async (req, res) => {
  const { query } = req.query;
  try {
    const result = await db.query(
      'SELECT name FROM exercises WHERE name ILIKE $1 LIMIT 10',
      [`%${query}%`]
    );
    res.json(result.rows.map(row => row.name));
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "workouts" ORDER BY id ASC;');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching workouts:', err.stack);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

exports.addWorkout = async (req, res) => {
  const { bodyweight, date, exercises } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO workouts (bodyweight, date) VALUES ($1, $2) RETURNING id',
      [bodyweight, date]
    );
    const workoutId = result.rows[0].id;

    for (const exercise of exercises) {
      let exerciseResult = await db.query(
        'SELECT id FROM exercises WHERE name = $1',
        [exercise.name]
      );

      if (exerciseResult.rows.length === 0) {
        const newExerciseResult = await db.query(
          'INSERT INTO exercises (name) VALUES ($1) RETURNING id',
          [exercise.name]
        );
        exerciseResult = { rows: [{ id: newExerciseResult.rows[0].id }] };
      }

      const exerciseId = exerciseResult.rows[0].id;

      await db.query(
        'INSERT INTO workout_exercises (workout_id, exercise_id, weight, sets, reps) VALUES ($1, $2, $3, $4, $5)',
        [workoutId, exerciseId, exercise.weight, exercise.sets, exercise.reps]
      );
    }

    res.status(201).json({ message: 'Workout and exercises added successfully' });
  } catch (error) {
    console.error('Error saving workout:', error);
    res.status(500).json({ error: 'Failed to save workout' });
  }
};


exports.workoutHistory = async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  try {
    const result = await db.query(`
      SELECT DISTINCT date
      FROM workouts
      WHERE EXTRACT(YEAR FROM date) = $1
      ORDER BY date ASC;
    `, [year]);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching workout history:", err);
    res.status(500).json({ error: "Failed to fetch workout history" });
  }
};



exports.workoutByDate = async (req, res) => {
  const date = req.query.date
  try {
    const result = await db.query(`
      SELECT *
      FROM workouts
      WHERE date = $1
      LIMIT 3;
    `, [date]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching workout date:", err);
    res.status(500).json({ error: "Failed to fetch workout date" });
  }
};