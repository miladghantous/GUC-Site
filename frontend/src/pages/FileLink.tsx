import FileLinksList from "../components/FileLinksList";
import FileLinkAdd from "../components/FileLinkAdd";
import Navbar from "../components/NavBar";

const FileLink = () => {
  return (
    <>
      <Navbar />
      <FileLinkAdd />
      <FileLinksList />
    </>
  );
};

export default FileLink;
