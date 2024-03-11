import { toast } from "react-toastify";
import { useState } from "react";

import css from './SearchForm.module.css'

export default function SearchForm({ onSubmit }) {

  const [name, setName] = useState("");

  const onHandleChange = (e) => {
    setName(e.currentTarget.value.toLowerCase());
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.info("Please enter your query!");
      return;
    }

    onSubmit(name);
    setName("");
  };

  return (
    <form onSubmit={onHandleSubmit} className={css.form}>
      <label className={css.formField}>
        <input
          type="text"
          value={name}
          autoComplete="off"
          autoFocus
          onChange={onHandleChange}
          className={css.formInput}
        ></input>
        <button type="submit" className={css.formButton}>
          Search
        </button>
      </label>
    </form>
  );
}

