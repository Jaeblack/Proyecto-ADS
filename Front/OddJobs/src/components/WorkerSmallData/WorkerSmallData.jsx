import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext/DataContext";
import { BsStarFill, BsStar } from "react-icons/bs";
import "./workersmalldata.scss";

export function WorkerSmallData({ workerData, category, service }) {
  const [worker, setWorker] = useState({});
  // const {getUser} = useContext(DataContext);

  useEffect(() => {
    setWorker({ ...workerData });
  }, []);

  function getEmptyStars() {
    let stars = [];
    for (let i = 0; i < worker.evaluation; i++) {
      stars.push(<BsStar size={"30px"} />);
    }
    return stars;
  }

  function getStars() {
    let stars = [];
    for (let i = worker.evaluation; i < 5; i++) {
      stars.push(<BsStarFill size={"30px"} />);
    }
    return stars;
  }

  return (
    <div className="worker_small_data_container">
      <p>{`${worker.name} ${worker.lastname}`}</p>
      <p>{category}</p>
      <p>{service}</p>
      <div className="evaluation_container">
        <span>
          {getStars()}
          {getEmptyStars()}
        </span>
      </div>
    </div>
  );
}
