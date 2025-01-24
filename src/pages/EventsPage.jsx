import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import Header from "../components/Layout/Header";
// import EventCard from "../components/Events/EventCard";
import Events from "../components/Events/Events";

const EventsPage = () => {
  const { isLoading } = useSelector((state) => state.events);
  const {cart} = useSelector((state)=> state.cart); 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {/* <EventCard active={true} data={allEvents && allEvents[0]} />EventCard */}
          <Events cart={cart}/>
        </div>
      )}
    </>
  );
};

export default EventsPage;