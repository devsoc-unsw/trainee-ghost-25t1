import { useForm } from "react-hook-form";
import "./CreateTask.css";
import taskCreationOptions from "./taskCreationOptions";
import { createTaskApiCall, getTeamData } from "../../api/tasks";
import { useEffect, useState } from "react";
import oak from '../../assets/professoroak_2x.png'
import Button from "../../components/Button";

const CreateTask = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [teamData, setTeamData] = useState(null);
    const [btnMsg, setBtnMsg] = useState("");

    useEffect(() => {
        (async () => {
            const data = await getTeamData();
            setTeamData(data);
        })();
    }, []);

    const onSubmit = async (data) => {
        data.assignedTo = data.assignedTo.map(num => Number(num));
        data.difficulty = Number(data.difficulty);
        const resData = await createTaskApiCall(data);
        if (resData.success) {
            setBtnMsg("Task successfully created!");
        } else {
            setBtnMsg(resData.error);
        }
    };

    return (
        <section className="make-new-task will-popup-menu-style">
            <h1>Make new task</h1>
            <div className="form-and-img">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <input
                            placeholder="Task title"
                            {...register("title", taskCreationOptions.title)}
                            maxLength={150}
                        />
                        {errors.title && <p className="error">{errors.title.message}</p>}
                    </div>
                    <div className="input-container">
                        <input
                            placeholder="Description"
                            maxLength={400}
                            {...register("description", taskCreationOptions.description)}
                        />
                        {errors.description && (
                            <p className="error">{errors.description.message}</p>
                        )}
                    </div>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="Difficulty (1-10)"
                            {...register("difficulty", taskCreationOptions.difficulty)}
                        />
                        {errors.difficulty && (
                            <p className="error">{errors.difficulty.message}</p>
                        )}
                    </div>
                    <div className="input-container">
                        <input
                            type="date"
                            placeholder="Due date"
                            {...register("dueDate", taskCreationOptions.dueDate)}
                        />
                        {errors.dueDate && <p className="error">{errors.dueDate.message}</p>}
                    </div>
                    <div className="input-container">
                        <select
                            className="multi-select"
                            multiple
                            {...register("assignedTo", taskCreationOptions.assignedTo)}
                        >
                            <option value="" disabled>
                                Assign to team members
                            </option>
                            {Array.isArray(teamData?.members) && teamData.members.length &&
                                teamData.members.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                ))}
                        </select>
                        {errors.assignedTo && (
                            <p className="error">{errors.assignedTo.message}</p>
                        )}
                    </div>
                    <Button topText={btnMsg} innerText="Create"/>
                </form>
                <img className="professor-oak-img" src={oak} alt="Professor oak" />
            </div>
        </section>
    );
};

export default CreateTask;
