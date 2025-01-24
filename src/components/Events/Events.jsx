import { useSelector } from 'react-redux';
import EventCard from "./EventCard.jsx";
import styles from '../../styles/styles.js';
import { FaRegCalendarTimes } from "react-icons/fa";

const Events = ({cart}) => {
  const {allEvents,isLoading} = useSelector((state) => state.events);  
  return (
    <div>
     {
      !isLoading && (
        <div className={`${styles.section} pt-5`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid">
      {allEvents && allEvents.length > 0 ? ( allEvents.map((event, index) => (
                                                            <EventCard key={event.id || index} data={event} cart={cart}/>))) : (
                                                              <div className="flex flex-col items-center justify-center w-full h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-6">
                                                                {/* Icon Section */}
                                                                <div className="flex items-center justify-center bg-white rounded-full w-24 h-24 mb-6 shadow-lg">
                                                                  <FaRegCalendarTimes className="text-blue-500 text-5xl" />
                                                                </div>

                                                                {/* Text Section */}
                                                                <h4 className="text-2xl font-bold mb-2">No Events Available</h4>
                                                                <p className="text-center text-lg">
                                                                  There's nothing here at the moment. Check back soon for exciting events!
                                                                </p>

                                                                {/* Call-to-Action Button */}
                                                                <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
                                                                  onClick={() => window.location.reload()}>
                                                                  Refresh Page
                                                                </button>
                                                              </div>
                                                            )}
      </div>
    </div>
    )}
  </div>
  )
}

export default Events