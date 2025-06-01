'use client';
import { Card, CardHeader } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
const LoginPage = () => {
  return (
    // <div className="relative flex items-center justify-center">
    //   <img src="/home/home-bg.png" className="absolute inset-0 -z-10 h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat" alt="Background Image"/>
    //   <div className="absolute inset-0 z-10 flex items-center justify-center h-[100vh] w-full bg-black/60">
    //   </div>
    //   <Card className='shadow-2xl bg-opacity-20 w-[480px]'>
    //     <CardHeader className='flex flex-col gap-1 capitalize text-3xl items-center justify-center'>
    //       <div>
    //         <Image src={"/logo.png"} alt="Logo" width={80} height={80} className="cursor-pointer" />
    //       </div>
    //     </CardHeader>
    //   </Card>
    // </div>
    <div className='h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative' style={{ backgroundImage: 'url(/home/home-bg.png)' }}>
      <div className='absolute inset-0 bg-black/60'></div>
      <Card className='shadow-2xl bg-opacity-20 w-[480px]'>
        <CardHeader className='flex flex-col gap-1 capitalize text-3xl items-center'>
          <div className='flex flex-col gap-1 capitalize text-3xl items-center'>
            <Image src={"/logo.png"} alt="Logo" width={80} height={80} className="cursor-pointer" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LoginPage;
