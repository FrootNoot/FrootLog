import {Link} from 'react-router-dom'
import styles from './Dashboard.module.css';
import WorkoutList from '../components/WorkoutList/WorkoutList';

function dashboard() {
  return (
    <div>
        <Link className={styles.link} to="/"> <button> Back to home </button> </Link>
        <WorkoutList></WorkoutList>
    </div>
  );
}

export default dashboard;
