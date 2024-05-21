import Select from "./Select";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import SubmitButton from "./SubmitButton";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setLoading, setError, setJobs } from "../app/slices/jobSlice";

const Filter = () => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [sort, setSort] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  // * DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  //* Filtreleme veya sıralama ile ilgili bir state değiştiğinde API'den güncel verileri al
  useEffect(() => {
    const sortParam =
      sort === "a-z" || sort === "z-a"
        ? "company"
        : sort === "Latest" || sort === "Oldest"
        ? "date"
        : undefined;

    const orderParam =
      sort === "a-z"
        ? "asc"
        : sort === "z-a"
        ? "desc"
        : sort === "Latest"
        ? "desc"
        : sort === "Oldest"
        ? "asc"
        : undefined;

    const params = {
      q: text,
      _sort: sortParam,
      _order: orderParam,
      status: status || undefined,
      type: type || undefined,
    };

    dispatch(setLoading());
    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, sort, type, status, dispatch]);

  //formu sifirla
  const handleReset = (e) => {
    e.preventDefault();

    //stateleri sifirla
    setText();
    setDebouncedText();
    setSort();
    setStatus();
    setType();

    //inputlari sifirla
    e.target.reset();
  };
  return (
    <div className="filter-sec">
      <h2>Search Filter Form</h2>

      <form onSubmit={handleReset}>
        <div>
          <label>Search </label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>

        <Select
          label={"Status"}
          options={statusOpt}
          handleChange={(e) => setStatus(e.target.value)}
          value={status}
        />
        <Select
          label={"Type"}
          options={typeOpt}
          handleChange={(e) => setType(e.target.value)}
          value={type}
        />
        <Select
          label={"Sort By"}
          options={sortOpt}
          handleChange={(e) => setSort(e.target.value)}
          value={sort}
        />

        <div>
          <SubmitButton text={"Reset Filters"} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
