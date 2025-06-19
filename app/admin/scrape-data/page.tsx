"use client";
import { ScrapingQueue } from "@/app/components/admin/sidebar/scraping-queue";
import { apiClient } from "@/app/lib";
import { ADMIN_API_ROUTES } from "@/app/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Listbox,
  ListboxItem,
  Tab,
  Tabs,
} from "@heroui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CurrentlyScrapingTable } from "./components";

const ScrapeData = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<undefined | string>(
    undefined
  );
  const [jobs, setJobs] = useState([])
  const searchCities = async (searchString: string) => {
    const response = await axios.get(
      `https://secure.geonames.org/searchJSON?q=${searchString}&maxRows=5&username=nitin990&style=SHORT`
    );
    const parsed = response.data?.geonames;
    setCities(parsed?.map((city: { name: string }) => city.name) ?? []);
    console.log(response);
  };

  const startScraping = async () => {
    await axios.post(ADMIN_API_ROUTES.CREATE_JOB, {
      url : `https://packages.yatra.com/holidays/intl/search.htm?destination=${selectedCity}`,
      jobType : { type : "location" },
    })
  }

useEffect(()=> {
    const getData = async () => {
      const data = await axios.get(ADMIN_API_ROUTES.JOB_DETAILS);
      setJobs(data?.data?.jobs ?? 0);
    }
    const interval = setInterval(()=> getData(), 3000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <section className="m-10 grid grid-cols-3 gap-5">
      <Card className="col-span-2">
        <CardBody>
          <Tabs>
            <Tab key="location" title="Location">
              <Input
                type="text"
                label="Search for a Location"
                onChange={(e) => searchCities(e.target.value)}
              />
              <div className="w-full min-h-[200px] max-w-[260px] px-1 py-2 rounded-small border  border-default-200 mt-5">
                <Listbox onAction={(key) => setSelectedCity(key as string)}>
                  {cities.map((city) => (
                    <ListboxItem
                      key={city}
                      color="primary"
                      className="text-primary-500"
                    >
                      {city}
                    </ListboxItem>
                  ))}
                </Listbox>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col gap-5">
          <div>
            {selectedCity && (
              <h1 className="text-xl">Scrape data for {selectedCity}</h1>
            )}
          </div>
          <Button size="lg" className="w-full" color="primary" onClick={startScraping}>
            Scrape
          </Button>
        </CardFooter>
      </Card>
      <ScrapingQueue/>
      <div className="col-span-3">
        <CurrentlyScrapingTable jobs={jobs} />
      </div>
    </section>
  );
};

export default ScrapeData;
