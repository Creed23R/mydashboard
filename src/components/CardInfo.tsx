import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image, { StaticImageData } from 'next/image'
import { Button } from '@nextui-org/button';

const CardInfo = ({image, title, description}: {image: StaticImageData, title: string, description: string}) => {
    return (
        // <Card className='border-white/20 border-1 bg-[#0a0a0a] px-4'>
        <Card isPressable className='w-[100%]'>
            <CardBody>
                <div className='mb-3'>
                    <Image height={50} src={image} alt="" />
                </div>
                <div className='flex flex-col gap-2'>
                    <h3 className="font-bold text-foreground">{title}</h3>
                    <p className="text-small text-foreground">{description}</p>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardInfo