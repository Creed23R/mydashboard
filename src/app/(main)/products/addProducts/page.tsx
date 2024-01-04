'use client'
import React, { useContext, useEffect } from 'react'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import {
    BackIcon,
    EyeIcon,
    PlusIcon,
} from '@/components/Icons'
import { useRouter } from 'next/navigation'
import { Image } from '@nextui-org/image'
import { Select, SelectItem } from '@nextui-org/select'
import { CategoriesContext } from '@/app/context/CategoriesContext'
import ModalCategory from './components/ModalCategory'

const AddProductPage = () => {
    const path = useRouter();
    const { categories } = useContext(CategoriesContext)


    return (
        <section className='flex justify-center items-center gap-5 w-[100%]'>
            <div className='flex w-[100%] gap-7'>
                <div className=''>
                    <Button
                        isIconOnly
                        onClick={() => path.back()}
                    >
                        <BackIcon className="text-xl" />
                    </Button>
                </div>
                <div className='w-[80%]'>
                    <form action="" className="grid grid-cols-2 w-[100%]">
                        <div className="flex flex-col gap-5 p-5">
                            <Input
                                variant="bordered"
                                type="text"
                                label="Titulo"
                                placeholder="Hamburguesa de Carne.."
                                labelPlacement="outside"
                                className="max-w-xs"
                            />
                            <Textarea
                                variant="bordered"
                                label="Descripccion"
                                labelPlacement="outside"
                                placeholder="Ingresa la descripcion.."
                                className="max-w-xs"
                            />
                            <Input
                                variant="bordered"
                                type="number"
                                label="Price"
                                placeholder="0.00"
                                labelPlacement="outside"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">$</span>
                                    </div>
                                }
                                className="max-w-xs"
                            />
                            <Input
                                variant="bordered"
                                type="number"
                                label="Price"
                                placeholder="0.00"
                                labelPlacement="outside"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">%</span>
                                    </div>
                                }
                                className="max-w-xs"
                            />
                            <Input
                                variant="bordered"
                                type="number"
                                label="Stock"
                                placeholder="Ingrese Stock"
                                labelPlacement="outside"
                                className="max-w-xs"
                            />
                        </div>
                        <div className="flex flex-col p-5 gap-5">
                            <div className='flex gap-5 items-center'>
                                <Button
                                    isIconOnly
                                    color="success"
                                    size='sm'
                                    onClick={() => path.push("/addProducts/categories")}
                                    className="text-background"
                                >
                                    <EyeIcon className="text-xl" />
                                </Button>
                                <Select
                                    variant="bordered"
                                    labelPlacement="outside"
                                    label="Seleccione la Categoria"
                                    placeholder="Seleccione la Categoria"
                                    className="max-w-[60%]"
                                >
                                    {categories.map((categorie) => (
                                        <SelectItem key={categorie?.id_categoria!} value={categorie?.categoria!}>
                                            {categorie?.categoria?.toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <ModalCategory />

                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                                {/* Casilla 1 */}
                                <div>
                                    <Image
                                        isZoomed
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt="NextUI Image with fallback"
                                        className="w-full object-cover h-[120px]"
                                        src="https://nextui.org/images/fruit-1.jpeg"
                                    />
                                </div>

                                {/* Casilla 2 */}
                                <div>
                                    <Image
                                        isZoomed
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt="NextUI Image with fallback"
                                        className="w-full object-cover h-[120px]"
                                        src="https://nextui.org/images/fruit-1.jpeg"
                                    />
                                </div>

                                {/* Casilla 3 */}
                                <div>
                                    <Image
                                        isZoomed
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt="NextUI Image with fallback"
                                        className="w-full object-cover h-[120px]"
                                        src="https://nextui.org/images/fruit-1.jpeg"
                                    />
                                </div>

                                {/* Casilla 4 */}
                                <div>
                                    <Image
                                        isZoomed
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt="NextUI Image with fallback"
                                        className="w-full object-cover h-[120px]"
                                        src="https://nextui.org/images/fruit-1.jpeg"
                                    />
                                </div>

                                {/* Casilla 5 */}
                                <div>
                                    <Image
                                        isZoomed
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt="NextUI Image with fallback"
                                        className="w-full object-cover h-[120px]"
                                        src="https://nextui.org/images/fruit-1.jpeg"
                                    />
                                </div>

                                {/* Casilla 6 */}
                                <div className='flex justify-center items-center'>
                                    <Button
                                        color="success"
                                        size='md'
                                        onClick={() => path.push("/addProducts")}
                                        className="text-background"
                                        endContent={<PlusIcon className="text-2xl" />}
                                    >
                                        Save Product
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        </section>
    )
}

export default AddProductPage