import { Card, CardHeader, CardFooter, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
import { Products } from '@/interfaces/Products'
import React from 'react'
import {
    EditDocumentIcon,
    DeleteDocumentIcon,
    EyeIcon
} from '@/components/Icons'
import { useRouter } from 'next/navigation'

export const CardProduct = ({ product }: { product: Products }) => {

    const path = useRouter()

    return (
        <Card className='box-content w-[280px] h-auto' shadow="sm" key={product.id}>
            <CardBody className="overflow-visible p-0">
                <Image
                    isZoomed
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={product.titulo ? product.titulo : ''}
                    className="w-full object-cover h-[250px] scale-100"
                    src={product.imgUrl ? product.imgUrl : ''}
                />
            </CardBody>
            <CardFooter className=" flex flex-col gap-2 h-[100%] justify-center py-3">
                <div className='w-[100%] flex flex-col text-start'>
                    <p className="my-[1px] text-base font-normal">${product.precio}</p>
                    <h4 className="h-max-[24px] my-[1px] font-medium text-base">{product.titulo}</h4>
                </div>
                <div className='w-[100%] flex justify-between'>
                    <p className="my-[1px] mb-2 text-tiny text-left">{product.descripcion}</p>
                </div>
                <div className='flex w-[100%] gap-3'>
                    <Button
                        isIconOnly
                        className=""
                        color="success"
                        onClick={() => path.push(`products/${product.id}`)}>
                        <EyeIcon className="text-xl " />
                    </Button>
                    <Button isIconOnly className="" color="warning">
                        <EditDocumentIcon className="text-xl " />
                    </Button>
                    <Button isIconOnly className="" color="danger">
                        <DeleteDocumentIcon className="text-xl " />
                    </Button>
                </div>
            </CardFooter>
        </Card>

    )
}
