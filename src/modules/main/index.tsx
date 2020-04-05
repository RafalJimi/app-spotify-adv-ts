import React, { memo, useState } from "react";

import { useDispatch } from "react-redux";

import { fetchSongsStarted } from "../../store/fetchSongs/actions";

import { MainLayout } from "./layout";

export const Main = memo(() => {
  const [term, setTerm] = useState<string>("");

  const dispatch = useDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTerm(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(fetchSongsStarted({ term: term }));
  };

  return (
    <MainLayout
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
});
