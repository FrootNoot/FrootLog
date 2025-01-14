import {Link} from 'react-router-dom'
import styles from './About.module.css';
import WorkoutForm from '../components/WorkoutForm';


function About() {
  return (
    <div>
        <WorkoutForm />
        <Link className={styles.link} to="/"> <button> Back to home </button> </Link>
    </div>
  );
}

export default About;
