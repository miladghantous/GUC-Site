import ConferencesList from "../components/ConferencesList";
import ConferenceAdd from "../components/ConferenceAdd";
import Navbar from "../components/NavBar";

const Conference = () => {
  return (
    <>
      <Navbar />
      <ConferenceAdd />
      <ConferencesList />
    </>
  );
};

export default Conference;
