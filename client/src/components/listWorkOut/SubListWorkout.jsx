import React, { useState } from "react";

const SubListWorkout = ({ subList }) => {
  const [show, setShow] = useState(false);
  const [sendExercise, setSendExercise] = useState("");

  const showExercise = param => {
    const holder = subList.filter((el, i) => {
      if (i === param) {
        return el;
      }
    });
    setSendExercise(holder);
    setShow(true);
  };
  if (!show) {
    return subList.map((exercises, i) => (
      <div
        className="list-item"
        key={exercises._id}
        onClick={() => {
          showExercise(i);
        }}
      >
        {exercises.muscleGroup || exercises.exercise}
      </div>
    ));
  } else {
    return <Exercise exercise={sendExercise} />;
  }
};

const Exercise = ({ exercise }) => {
  let details = exercise[0].type;
  return details.map((el, i) => (
    <Details
      key={el._id}
      name={el.name}
      intensity={el.intensity}
      duration={el.duration}
      amount={el.amount}
      description={el.description}
    />
  ));
};

const Details = ({ name, intensity, duration, amount, description }) => {
  const [isFlipped, setFlipped] = useState(false);
  const flipTile = () => {
    setFlipped(!isFlipped);
  };
  let flip = ''
  isFlipped? flip = "details-flipped": flip = "details-not-flipped"
  if (isFlipped ===false) {
    return (
      <div className={flip}>
        <div className="name">Name: {name}</div>
        <div className="intensity">Intensity: {intensity}</div>
        <div className="duration">Duration: {duration}</div>
        <div className="amount">Amount: {amount}</div>
        <div className= "name" onClick={() => flipTile(!isFlipped)}>
          Description:
        </div>
        <br />
      </div>
    );
  } else {
    return (
      
        <div  className = {flip} onClick={() => flipTile(!isFlipped)}>
          {description.map((el, i) => (
            <Description key={i} desc={el} />
          ))}
        </div>
        
    );
  }
};

const Description = ({  key, desc }) => {
  return (
    <div key={key}  >
      {desc}
    </div>
  );
};

export default SubListWorkout;
