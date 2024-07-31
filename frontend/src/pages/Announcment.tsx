import AnnouncementsList from "../components/AnnouncementsList";
import AnnouncementAdd from "../components/AnnouncementAdd";
import Navbar from "../components/NavBar";

const Announcment = () => {
  return (
    <>
      <Navbar />
      <AnnouncementAdd />
      <AnnouncementsList />
    </>
  );
};

export default Announcment;
