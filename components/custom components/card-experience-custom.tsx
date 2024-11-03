'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'


import { Users, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../button'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface AppCardProps {
  name: string;
  description: string;
  imageUrl: string | StaticImport
  category: string;
  users: number;
  releaseDate: string;

}

export default function CardExperienceCustom({
  name ,
  description ,
  imageUrl,
  category ,
  users ,
  releaseDate ,

}: Partial<AppCardProps>) {
  const [isHovered, setIsHovered] = useState(false)
  const handleViewDetails = () => {
    console.log("View details clicked");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="w-full max-w-sm mx-auto overflow-hidden relative group hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-800 via-cyan-500  to-black opacity-100 z-0 
                        transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:cursor-pointer" />
        <div className="absolute inset-0 opacity-30 bg-grid-white-300/[0.2] z-10" />
        
        <CardHeader className="relative z-20">
          <motion.div 
            className="relative w-full h-48 mb-4 rounded-lg overflow-hidden shadow-lg"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={imageUrl ? imageUrl: '/dashboard.png'}
              alt={`${name} screenshot`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
          <Badge className="absolute top-2 right-2 bg-black text-cyan-400 hover:bg-white">{category}</Badge>
          <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
          <p className="text-white/90">{description}</p>
        </CardHeader>
        <CardContent className="relative z-20">
          <div className="flex justify-between items-center text-white/80 text-sm mt-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{users ? users.toLocaleString(): '&'} users</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Released {releaseDate? new Date(releaseDate).toLocaleDateString(): new Date('2023-06-15').toDateString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative z-20">
          <Button 
            onClick={handleViewDetails} 
            className="w-full bg-gray-800 text-cyan-400 hover:bg-cyan-100 transition-colors duration-300"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}