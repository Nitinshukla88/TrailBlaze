import { apiClient } from '@/app/lib';
import { ADMOIN_API_ROUTES } from '@/app/utils';
import { Card, CardBody, CardHeader } from '@heroui/react';
import React, { useEffect, useState } from 'react'

const ScrapingQueue = () => {
  const [onGoingJobs, setOnGoingJobs] = useState(0);

  useEffect(()=> {
    const getData = async () => {
      const data = await apiClient.get(ADMOIN_API_ROUTES.JOB_DETAILS);
      setOnGoingJobs(data?.data?.ongoingJobs ?? 0);
    }
    const interval = setInterval(()=> getData(), 3000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const onGoingJobColor = () => {

  }

  const onGoingJobTextColor = () => {

  }
  return (
    <Card className='h-full'>
      <CardHeader>Current Queue</CardHeader>
      <CardBody className='flex items-center justify-center'>
        <div className={`h-52 w-52 rounded-full flex items-center justify-center ${onGoingJobColor}`}>
          <div className='h-44 w-44 bg-white rounded-full flex items-center justify-center'>
            <h4 className={`text-6xl font-bold ${onGoingJobTextColor()}`}>{onGoingJobs}</h4>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default ScrapingQueue