import { v4 as uuidv4 } from "uuid";
import AutoInput from "../components/AutoInput";
import { statusOpt, typeOpt } from "../constants";
import { toast } from "react-toastify";
import api from "../utils/api";
import { createJob } from "../app/slices/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import SubmitButton from "../components/SubmitButton";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //form gonderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    //formData olustur
    const formData = new FormData(e.target);

    //inputlardaki verilerden bir nesne olustur
    const newJobData = Object.fromEntries(formData.entries());

    //tarih ve id ekle
    newJobData.id = uuidv4();
    newJobData.date = new Date().toLocaleDateString();

    //api'a yeni veriyi kaydet
    api
      .post("/jobs", newJobData)
      .then((res) => {
        // bildirim gonder
        toast.success("Job added successfully!");

        //store'a yeni veriyi kaydet
        dispatch(createJob(newJobData));
        //anasayfaya yonlendir
        navigate("/");
      })
      .catch((error) => {
        //basarisiz olursa bildirim gonder
        toast.error("Failed to add job!");
        console.error("Error adding job:", error);
      });
  };

  return (
    <div className="add-page">
      <section className="container">
        <h2>ADD NEW JOB</h2>

        <form onSubmit={handleSubmit}>
          <AutoInput label={"Position"} name={"position"} />
          <AutoInput label={"Company"} name={"company"} />
          <AutoInput label={"Location"} name={"location"} />

          <Select label={"Status"} options={statusOpt} name={"status"} />
          <Select label={"Type"} options={typeOpt} name={"type"} />
          <div>
            <SubmitButton text={"Submit"} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
