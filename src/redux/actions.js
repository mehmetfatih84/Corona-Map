import { createAsyncThunk } from "@reduxjs/toolkit";
import { headers } from "./../constants/index";
import axios from "axios";

export const getData = createAsyncThunk("countryData", async (isoCode) => {
  const params = { q: isoCode };

  const req1 = axios.get(`https://covid-19-statistics.p.rapidapi.com/reports`, {
    params,
    headers,
  });

  const req2 = axios.get(`https://restcountries.com/v3.1/name/${isoCode}`);

  const responses = await Promise.all([req1, req2]);

  const covid = {
    ...responses[0].data.data[0],
    ...responses[0].data.data[0].region,
  };

  delete covid.region;
  delete covid.cities;

  return {
    covid,
    country: responses[1].data[0],
  };
});
