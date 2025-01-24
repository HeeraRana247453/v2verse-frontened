import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/styles";
import EventCard from "../components/Events/EventCard";

const MostPopularEvent = () => {
  const { allEvents } = useSelector((state) => state.events);
  const [maxSoldEvent, setMaxSoldEvent] = useState([]);

  // Find the top 2 events with the maximum number of `sold_out`
  useEffect(() => {
    if (allEvents && allEvents.length > 0) {
      const sortedData = [...allEvents].sort((a, b) => b.sold_out - a.sold_out);
      setMaxSoldEvent(sortedData.slice(0, 2));
    }
  }, [allEvents]);

  return (
    <div className={`${styles.section}`}>
      {maxSoldEvent.length > 0 ? (
        <>
          <h1 className={`${styles.heading}`}>Popular Events</h1>
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
            {maxSoldEvent.map((event,index) => (
              <EventCard key={index} data={event} />
            ))}
          </div>
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default MostPopularEvent;
