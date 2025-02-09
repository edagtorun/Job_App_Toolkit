import { MdLocationOn } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import DelButton from "./DelButton";

const Card = ({ job }) => {
  const colors = {
    Interview: "green",
    Denied: "red",
    Continuing: "orange",
  };

  return (
    <div className="card">
      <div className="head">
        <section>
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>

          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </section>

        <section>
          <DelButton id={job.id} />
        </section>
      </div>

      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>{new Date(job.date).toLocaleDateString()}</p>
        </div>

        <div className="status">
          <p style={{ background: colors[job.status] }}>{job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
