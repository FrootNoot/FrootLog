<a id="readme-top"></a>




<h3 align="center">FrootLog</h3>

  <p align="center">
    My personal gym tracker.
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

A web app I created to help me track my workouts, provide insights and to let people see how my progress is going.



### Built With
- **Frontend:** React (Netlify)
- **Backend:** Node.js & Express (Render)
- **Database:** PostgreSQL (Supabase)
- **Data Fetching:** Axios


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/FrootNoot/FrootLog.git
   ```
2. Add .env file into backend/
   ```js
   DATABASE_URL=your_supabase_postgres_url
   PORT=5000
   ```
3. Run backend with
   ```sh
   cd backend
   npm install
   npm start
   ```
4. Add .env file into frontend/
   ```js
   REACT_APP_API_URL=https://your-backend-service.onrender.com
   ```
5. Run Frontend with
   ```sh
    cd frontend
    npm install
    npm start
   ```
<!-- ROADMAP -->
## To add list

- [ ] Proper Authentication 
- [ ] Mobile friendly design
- [ ] Performance enhancements
- [ ] Kg, Lbs, Level for weight measurements
- [ ] Monthly / Yearly calendar view


