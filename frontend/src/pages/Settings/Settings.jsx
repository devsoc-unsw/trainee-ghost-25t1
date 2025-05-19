import { useForm } from "react-hook-form";
import "./Settings.css";
import resetImg from '../../assets/reset.png'
import { useEffect, useState } from "react";
import { getTeamData } from "../../api/tasks";

const Settings = () => {
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getTeamData();
            setTeamData(data);
        })();
    }, []);

    console.log(teamData)

  return (
    <section className="will-popup-menu-style">
        <div className="input-and-label-container">
            <label htmlFor="access-code">Access code</label>
            <div className="access-code-and-button">
                <div className="access-code-container">
                    {teamData && 'S3jd67ss'}
                </div>
                <button className="reset-access-code">
                    <img src={resetImg} alt="Reset"/>
                </button>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            
        </form>
    </section>
  )
};

export default Settings;
