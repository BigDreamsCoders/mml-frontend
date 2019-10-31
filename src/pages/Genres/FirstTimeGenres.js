import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { MainLayout } from "../../layout/MainLayout";
import { GenreList } from "../../components/GenreList.js";
import { Constants } from "../../utils/Constants";

export const FirstTimeGenres = props => {
  const [data, setData] = useState({genres: [], isFetching: false});
  useEffect(() => {
        const fetchGenres = async () => {
            try {
                setData({genres: data.genres, isFetching: true});
                var config = {
                  headers: {'Authorization':window.localStorage.getItem(Constants.TOKEN)}
                };
                const response = await axios.get(process.env.REACT_APP_API_URL+"/api/v1/genre/all",config);
                console.log(response);
                setData({genres: response.data, isFetching: false});
            } catch (e) {
                console.log(e);
                setData({genres: data.genres, isFetching: false});
            }
        };
        fetchGenres();
    }, []);

  return (
    <MainLayout title="Set up">
      <main></main>
      <GenreList list={data.genres}/>
    </MainLayout>
  );
};
