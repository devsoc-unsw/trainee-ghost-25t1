import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { loginUser } from "../../api/users";
import "../../components/InputBox.css";
import { AuthContext } from "../../context/authContext";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { refetchUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const resData = await loginUser(data.email, data.password);

    if (resData.success) {
      // Route to home page if a team is joined. Otherwise, go to team selection
      if (resData.user.team_id) {
        await refetchUser();
        navigate("/");
      } else {
        navigate("/team-selection");
      }
    } else {
      console.error(`Login error: ${resData.error}`);
      setErrorMsg(resData.error || "Something went wrong, please try again");
    }
  };

  return (
    <>
      <div className="input-box">
        Login
        <InputBox
          fields={[
            { name: "Email Address", value: "email" },
            { name: "Password", value: "password" },
          ]}
          buttonText="Sign In"
          buttonTopText={errorMsg}
          onSubmit={onSubmit}
        />
        <Button
          className="navigate-button"
          topText="don't have an account?"
          innerText="Go to Register"
          onClick={() => navigate("/signup")}
        />
      </div>
    </>
  );
}

export default Login;
