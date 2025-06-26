import WorkoutItem from "../WorkoutList/WorkoutItem";

const ExerciseDisplay = ({ exerciseID, bodyweight, date , admin}) => {

  const workout = {
    id: exerciseID,
    bodyweight: bodyweight,
    date: date,
  };

  return (
    <div>
      <WorkoutItem workout={workout} admin={admin}/>
    </div>
  );
};

export default ExerciseDisplay;
