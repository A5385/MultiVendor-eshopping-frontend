import Header from "../../components/website/layout/Header";
import EventCard from "../../components/website/events/EventCard";
import Footer from "../../components/website/layout/Footer";
import { useSelector } from "react-redux";
import Loader from "../../components/website/layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      <Header activeHeading={4} />
      {isLoading ? (
        <Loader />
      ) : (
        allEvents &&
        allEvents.map((event, index) => (
          <>
            <br />
            <EventCard data={event} key={index} active={true} />
            <br />
          </>
        ))
      )}
      <Footer />
      {/* <EventCard active={true} /> */}
    </div>
  );
};

export default EventsPage;
