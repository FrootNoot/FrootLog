import HeroSection from './components/Home/HeroSection';
import Description from './components/Home/Description';
import Footer from './components/Home/Footer'; 
import Divider from './components/Home/Divider';

import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css';


function App() {

  return (
    <div className={styles.app}>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Divider></Divider>
      <Description></Description>
      <Footer></Footer>

    </div>
  );

   /*
  return (
    <div className={styles.app}>
      <h1 className={styles.header}>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
      <Link to="/about"> to about </Link>
      <Link to="/dashboard"> to dashboard </Link>
    </div>
  );
  */
}

export default App;
