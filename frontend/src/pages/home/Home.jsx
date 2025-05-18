import { useContext } from "react";
import NavBar from "../../components/NavBar";
import "./Home.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import TaskViewer from "../../components/TaskViewer";

function Home() {
  const navigate = useNavigate();
  const { user, userLoading } = useContext(AuthContext);

  if (userLoading) {
    return <Loading />;
  }

  // if the user dosent exist or they dont have a team, redirect them to signup
  if (user?.team_id) {
    navigate('/signup');
  }

  return (
    <>
      <NavBar/>
    </>
  );
}

export default Home;
