
"use client"

//import FeatureCard from "@/components/feature-card";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  ChevronRight} from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ModeToggle } from "@/components/toogle"
import { ROUTES } from "@/lib/constants/constants"
import { useRouter } from "next/navigation"
import { LandingPageFooter } from "@/components/homePage/homeFooter";
import Link from "next/link";
import { useAuthContext } from "@/contexts/auth-context.provider"
export default function AnimatedCardOptions() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false)
  const { getUser } = useAuthContext();
  
  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  const FEATURE_CARDS = [
    {
      description: "Food AI",
      id: '1',
      route: ROUTES.FOOD_AI,
    },
    {
      description: "Personal Care AI",
      id: '2',
      route: ROUTES.PERSONAL_CARE_AI,
    },
    {
      description: "Chats",
      id: '3',
      route: ROUTES.CHATS,
    },
    {
      description: "User Settings",
      id: '4',
      route: ROUTES.USER_SETTINGS,
    },
  ];

  const handleCardSelection = (card: typeof FEATURE_CARDS[0]) => {
    router.push(card.route);
  }

  const plans = [
    {
      title: "Basic Green",
      description: "Perfect for small households",
      price: "$29",
      features: ["Energy-efficient lighting", "Water-saving tips", "Recycling guide"],
    },
    {
      title: "Eco Warrior",
      description: "Ideal for eco-conscious individuals",
      price: "$49",
      features: ["Solar panel consultation", "Composting starter kit", "Electric vehicle guide"],
    },
    {
      title: "Green Business",
      description: "Sustainable solutions for companies",
      price: "$99",
      features: ["Energy audit", "Waste reduction plan", "Green certification assistance"],
    },
    {
      title: "Community Green",
      description: "Transform your neighborhood",
      price: "$199",
      features: ["Community garden planning", "Local recycling program", "Green education workshops"],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-50 to-white dark:from-background dark:to-background">
      <header className="shadow-md bg-background  w-full">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href={"/"} className="text-3xl flex font-bold gap-2">CELECARE <span className="text-app-primary flex gap-2 items-center">
          Ai </span></Link>
          <ModeToggle />
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Choose Your Health Solution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURE_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              custom={index}
            >
              <Card 
                className="flex flex-col h-full cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl dark:bg-neutral-800 dark:text-white"
                onClick={() => handleCardSelection(card)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-green-600 dark:text-green-400">{card.description}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300">Explore our {card.description.toLowerCase()} solutions</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-300">
                    Get Started
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <LandingPageFooter/>

     {/*  <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">About CELECARE</h3>
              <p className="text-gray-300">We're committed to providing innovative health solutions for a better you.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">Our Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
              <p className="text-gray-300">1234 Health Street, Wellness City, WC 12345</p>
              <p className="text-gray-300">contact@CELECARE.com</p>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 CELECARE. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
