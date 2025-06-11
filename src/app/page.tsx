'use client';

import Header from '@/components/header';
import { BackgroundColor } from '@/components/homePage/background';
import { HomePageCard } from '@/components/homePage/card';
import { StepByStepGuide } from '@/components/homePage/guide';
import { LandingPageFooter } from '@/components/homePage/homeFooter';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth-context.provider';
import { AUTH_ROUTES, HOME_ROUTE } from '@/lib/constants/constants';
import { useRouter } from 'next/navigation';
import { FaRunning } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  const { user } = useAuthContext();

  return (
    <div className=' flex flex-col w-full  items-center justify-center overflow-hidden '>
      {/* <BackgroundColor/> */}
      {/* <Header /> */}
      {/* <TypeWritterEffect/> */}

      <div className='flex flex-1 w-full min-h-[90vh] flex-col items-center justify-center '>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl'>
            Welcome to <span className='text-app-primary'>CELECARE</span> –
            Your Personalized Health Assistant
          </h1>
          <p className='mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
            Empower your health journey with smarter choices.
          </p>
          <div className='mt-10 sm:flex sm:justify-center'>
            {user ? (
              <Button
                onClick={() => router.push(HOME_ROUTE)}
                variant='app-primary'
                size='lg'
                className='w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md shadow'
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <div className='rounded-md shadow'>
                  <Button
                    onClick={() => router.push(AUTH_ROUTES[0])}
                    variant='app-primary'
                    size='lg'
                    className='w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md'
                  >
                    Sign In
                  </Button>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <Button
                    onClick={() => router.push(AUTH_ROUTES[1])}
                    variant='outline'
                    size='lg'
                    className='w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md'
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='mt-16 w-full max-w-4xl mx-auto'>
          <div className='aspect-w-16 aspect-h-9'>
            add demo video
            <iframe
              className='w-full h-[400px] rounded-lg shadow-lg'
              src=''
              title='CELECARE Introduction'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <StepByStepGuide />
      <HomePageCard />
      
      <LandingPageFooter />
    </div>
  );
}
