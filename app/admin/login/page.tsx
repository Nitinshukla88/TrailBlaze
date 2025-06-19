'use client';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@heroui/react'
import Image from 'next/image';
import React, { useState } from 'react';

import { Architects_Daughter } from 'next/font/google';
import axios from 'axios';
import { ADMIN_API_ROUTES } from '@/app/utils';
import { useAppStore } from '@/app/store';
import { useRouter } from 'next/navigation';

const ArchitectsDaughter = Architects_Daughter({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

const LoginPage = () => { 
  const router = useRouter()
  const {setUserInfo} = useAppStore();
  const handleLogin = async () => {
    try {
      const response = await axios.post(ADMIN_API_ROUTES.LOGIN, {email, password});
      if(response.data.userInfo) {
        setUserInfo(response.data.userInfo);
        router.push('/admin');
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");   
  return (
    <div className='h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative' style={{ backgroundImage: 'url(/home/home-bg.png)' }}>
      <div className='absolute inset-0 bg-black/50 backdrop-blur-xs'></div>
      <Card className='shadow-2xl bg-gray-400/50 w-[480px]'>
        <CardHeader className='flex flex-col gap-1 capitalize text-3xl items-center'>
          <div className='flex flex-col gap-1 capitalize text-3xl items-center'>
            <Image src={"/logo.png"} alt="Logo" width={80} height={80} className="cursor-pointer" />
            <span className='text-xl uppercase font-medium italic text-white'>
              <span className={ArchitectsDaughter.className}>TrailBlaze Admin Login</span>
            </span>
          </div>
        </CardHeader>
        <CardBody className='flex flex-col items-center w-full justify-center'>
          <div className='flex flex-col gap-2 w-full'>
            <Input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} color="danger"/>
            <Input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} color="danger"/>
          </div>
        </CardBody>
        <CardFooter className='flex flex-col gap-2 items-center justify-center'>
          <Button className='w-full capitalize' color='danger' variant='shadow' size='lg' onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
