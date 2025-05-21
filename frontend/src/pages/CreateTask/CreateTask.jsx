import { useForm } from "react-hook-form";
import "./CreateTask.css";
import taskCreationOptions from "./taskCreationOptions";
import { createTaskApiCall } from "../../api/tasks";
import { useContext } from "react";
import oak from "../../assets/professoroak_2x.png";
import { HomeContext } from "../../context/homeContext";

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { homeData, refetchHomeData } = useContext(HomeContext);

  const onSubmit = async (data) => {
    data.assignedTo = data.assignedTo.map((num) => Number(num));
    data.difficulty = Number(data.difficulty);
    await createTaskApiCall(data);
    await refetchHomeData();
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
            {errors.dueDate && (
              <p className="error">{errors.dueDate.message}</p>
            )}
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
              {homeData?.team?.members?.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            {errors.assignedTo && (
              <p className="error">{errors.assignedTo.message}</p>
            )}
          </div>
          <button>Create</button>
        </form>
        <img className="professor-oak-img" src={oak} alt="Professor oak" />
      </div>
    </section>
  );
};

export default CreateTask;
