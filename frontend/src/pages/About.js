import {Link} from 'react-router-dom'
import styles from './About.module.css';


function About() {
  return (
    <div>
        <h1 className={styles.title}> this is the about page</h1>
        <Link className={styles.link} to="/"> <button> Back to home </button> </Link>
    </div>
  );
}

export default About;
