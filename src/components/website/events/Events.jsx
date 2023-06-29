import { useSelector } from "react-redux";

import EventCard from "./EventCard";
import styles from "../../../styles/styles";
import Loader from "../../website/layout/Loader";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section} `}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
