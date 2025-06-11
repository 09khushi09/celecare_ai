import { IconHealthRecognition, IconRibbonHealth } from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Fa500Px, FaRunning } from 'react-icons/fa';
import { StethoscopeIcon } from 'lucide-react';
//import { GiftIcon, MapIcon, MedalIcon, PlaneIcon } from "./icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <IconHealthRecognition color='green' />,
    title: 'Scan Food Labels for Health Insights',
    description:
      'Scan any food label to see how the ingredients affect your health—good, bad, or neutral.',
  },
  {
    icon: <FaRunning color='green' />,
    title: 'Personalized Diet Plans',
    description:
      'Get weekly diet plans tailored to your health goals, from weight loss to muscle gain.',
  },
  {
    icon: <StethoscopeIcon color='green' />,
    title: 'Get Advice for Specific Health Conditions',
    description: `Scan products to check if they're safe or beneficial based on conditions like diabetes or allergies.`,
  },
  {
    icon: <Fa500Px color='green' />,
    title: 'Scan Personal Care Products',
    description:
      'Analyze personal care items for ingredient safety and skin compatibility.',
  },
];

export const StepByStepGuide = () => {
  return (
    <section
      id='howItWorks'
      className='container text-center py-24 p-3 sm:py-32'
    >
      <h2 className='text-3xl md:text-4xl font-bold '>
        How It <span className='text-app-primary bg-clip-text'>Works </span>
        Step-by-Step Guide
      </h2>
      <p className='md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground'>
        At CELECARE, we aim to simplify nutrition and personal care for you.
        Whether you are aiming to lose weight, gain weight, or simply stay
        healthy, our AI-powered app is here to guide you through every step of
        your journey. Here is what you can do with CELECARE
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className='bg-muted/50'>
            <CardHeader>
              <CardTitle className='grid gap-4 place-items-center'>
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
