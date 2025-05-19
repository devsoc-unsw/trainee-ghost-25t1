import { useForm } from "react-hook-form";
import "./Settings.css";

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return <section className="will-popup-menu-style"></section>;
};

export default Settings;
