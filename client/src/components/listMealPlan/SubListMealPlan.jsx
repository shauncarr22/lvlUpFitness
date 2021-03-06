import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext.js";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const SubListMealPlan = ({ subList }) => {
  return <Meal meals={subList.recipes} />;
};

const Meal = ({ meals }) => {
  let reRoute = useHistory();
  const context = useContext(AuthContext);
  const { isAuth} = context;
  if (!isAuth){
    reRoute.push("/")
  }
  return meals.map((el, i) => (
    <Details
      key={el._id}
      name={el.name}
      body={el.body}
      calories={el.calories}
      ingredients={el.ingredients}
      favorite={el.favorite}
      mealId={el._id}
    />
  ));
};

const Details = ({ name, body, calories, ingredients, mealId }) => {
  const [isFlipped, setFlipped] = useState(false);
  const context = useContext(AuthContext);
  const { isAuth, loggedIn, uid } = context;

  const [startDate, setStartDate] = useState(new Date());
  const [showCal, setShowCal] = useState(false);
  const [schedule, setSchedule] = useState(true);

  const flipTile = () => {
    setFlipped(!isFlipped);
  };

  const savedMeal = (arg) => {
    let parsedDate = Date.parse(arg)
    let URL = "https://levelupfitness.herokuapp.com/api/favmeal";
    Axios.post(`${URL}`, {
      u_id: uid,
      id: mealId,
      name: name,
      dateAdded: parsedDate
    }).catch(error => {
      console.error(error.message);
    });
  };

  let flip = "";
  isFlipped ? (flip = "details-flipped") : (flip = "details-not-flipped");
  let sched = "";
  schedule ? (sched = "Schedule") : (sched = "Add To Profile");
  if (isFlipped === false) {
    return (
      <div className={flip}>
        <div className="name">Name: {name}</div>
        <div className="calories">Calories: {calories}</div>
        <div className="body">Body: {body}</div>
        <br />
        <div className="selectors">
          <button
            className="description"
            onClick={event => {
              event.preventDefault();
              flipTile(!isFlipped);
            }}
          >
            Show description
          </button>
          <button
            className={`schedule-${schedule}`}
            onClick={() => {
              setSchedule(!schedule);
              setShowCal(!showCal);
              savedMeal(startDate);
            }}
          >
            {sched}
          </button>
          <div className={`datepick-${showCal}`}>
            <input
              className="date-select"
              type="date"
              value={startDate}
              onChange={event => setStartDate(event.target.value)}
              required
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={flip} onClick={() => flipTile(!isFlipped)}>
        {ingredients.map((el, i) => (
          <Ingredients key={i} ing={el} />
        ))}
      </div>
    );
  }
};

const Ingredients = ({ key, ing }) => {
  return <div key={key}>{ing}</div>;
};

export default SubListMealPlan;
