'use client'
import React, { use, useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ProductsContext } from '@/app/context/ProductsContext';
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation';
import {
    BackIcon,
    EditDocumentIcon,
    DeleteDocumentIcon
} from '@/components/Icons'
import { Image } from '@nextui-org/image'

const ProductPage = () => {

    const path = useRouter();

    const id_product = useParams().id_product;

    const { product, loadProduct } = useContext(ProductsContext)

    useEffect(() => {
        loadProduct(id_product.toString());
    }, [])

    console.log(product?.imgUrl)

    function obtenerUrls(input: string): string[] {
        // Dividir el string en función de las comas
        const urls: string[] = input.split(',');

        // Limpiar los espacios alrededor de cada URL
        const urlsLimpias: string[] = urls.map(url => url.trim());

        return urlsLimpias;
    }

    var urls;
    if (product?.imagenes) {
        urls = obtenerUrls(product?.imagenes!)
        console.log(urls.length)
    }

    const getClassNames = (length: number): string => {
        switch (length) {
            case 1:
                return "min-h-[100px] min-w-[150px] max-h-[100px] max-w-[150px] cursor-pointer rounded-xl transition-all hover:opacity-25 border-orange";
            case 2:
                return "min-h-[100px] min-w-[150px] max-h-[100px] max-w-[150px] cursor-pointer rounded-xl transition-all hover:opacity-25 border-orange";
            case 3:
                return "min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25 border-orange";
            case 4:
                return "min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] cursor-pointer rounded-xl transition-all hover:opacity-25 border-orange";
            case 5:
                return "min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px] cursor-pointer rounded-xl transition-all hover:opacity-25 border-orange";
            default:
                // Puedes ajustar el valor predeterminado según tus necesidades
                return "min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25 border-orange";
        }
    };


    return (
        <main className=''>
            <div className="main-wrapper flex flex-col md:flex-row md:px-[200px] md:py-[10px] relative">
                <div className="image md:basis-1/2 md:flex md:flex-col md:items-center ">
                    <div className="hidden md:block large-image">
                            <Image
                                className="object-cover cursor-pointer rounded-xl w-[350px] h-[350px]"
                                src={product?.imgUrl!}
                                alt="snekers-photo"
                            />
                    </div>

                    <div className="md:hidden large-image">
                        <img
                            className="w-[100%] h-[300px] object-cover"
                            src="https://nextui.org/_next/image?url=%2Fimages%2Falbum-cover.png&w=640&q=75"
                            alt="snekers-photo"
                        />
                    </div>

                    <div
                        className={urls && urls?.length < 3 ? "small-images hidden md:flex mt-7 justify-around w-[400px]" : "small-images hidden md:flex mt-7 justify-between w-[400px]"}
                    >

                        {urls && urls.map((url, index) => (
                            <div key={index} className="single-image">
                                <Image
                                    // onClick={() => setImgPrincipal(url)}
                                    isZoomed
                                    // className="min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] cursor-pointer rounded-xl transition-all hover:opacity-25 border-orange"
                                    className={getClassNames(urls.length)}
                                    src={url}
                                    alt={`image-${index}`}
                                />
                            </div>
                        ))}

                        {/* {urls && urls.map((img, idx) => {
                            return (
                                <div key={idx} className="single-image">
                                    <img
                                        // onClick={() => setValue(idx)}
                                        className="w-[80px] cursor-pointer rounded-xl transition-all hover:opacity-25 hover:border-[3px] border-orange"
                                        src={img}
                                        alt="product-photo"
                                    />
                                </div>
                            );
                        })} */}

                        {/* <div key={1} className="single-image">
                            <Image
                                isZoomed
                                className="w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25  border-orange"
                                src={product?.imgUrl!}
                                alt="snekers-photo"
                            />
                        </div>
                        <div key={2} className="single-image">
                            <Image
                                isZoomed
                                className="w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25  border-orange"
                                src={product?.imgUrl!}
                                alt="snekers-photo"
                            />
                        </div>
                        <div key={3} className="single-image">
                            <Image
                                isZoomed
                                className="w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25  border-orange"
                                src={product?.imgUrl!}
                                alt="snekers-photo"
                            />
                        </div> */}
                    </div>
                </div>

                <div className="description p-6 md:basis-1/2 md:py-[40px]">
                    <p className="text-orange-500 text-[14px] tracking-widest uppercase font-[700] mb-6">
                        {product?.marca}
                    </p>
                    <h1 className="text-3xl md:text-4xl capitalize font-[700]">
                        {product?.titulo}
                    </h1>
                    <p className="hidden md:block text-darkGrayishBlue my-10 leading-7">
                        {product?.descripcion}
                    </p>
                    <p className="md:hidden text-darkGrayishBlue my-6 leading-7">
                        {product?.descripcion}
                    </p>

                    <div className="price flex items-center">
                        <span className="text-3xl font-[700] mr-4">${product?.precio}</span>
                        <span className="bg-orange-300 text-orange-500 font-[700] py-1 px-2 rounded-lg">
                            {product?.porcentajeDescuento}%
                        </span>
                        <p className="md:hidden line-through text-grayishBlue font-[700] translate-x-[100px] mb-2">
                            $250.00
                        </p>
                    </div>
                    <p className="hidden md:block line-through text-grayishBlue font-[700] mt-2">
                        $250.00
                    </p>

                    <div className="buttons-container flex flex-col md:flex-row mt-8">
                        <div className="state w-[100%] flex justify-around md:justify-center items-center space-x-10 bg-lightGrayishBlue rounded-lg p-3 md:p-2 md:mr-4 md:w-[150px]">
                            <button
                                // onClick={decrease}
                                className="minus text-[24px] md:text-[20px] font-[700] text-orange-500 transition-all hover:opacity-50"
                            >
                                -
                            </button>
                            <p className="md:text-[14px] font-bold">{product?.stock}</p>
                            <button
                                // onClick={() => setQty((prev) => prev + 1)}
                                className="plus text-[24px] md:text-[20px] font-[700] text-orange-500 transition-all hover:opacity-50"
                            >
                                +
                            </button>
                        </div>
                        <button className="bg-orange-500 rounded-lg text-white font-[700] px-[70px] py-[18px] mt-4 md:mt-0 md:py-0 md:text-[14px] transition-all btn-shadow hover:opacity-50">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </main>

        // <section className='h-[100%] flex justify-center items-center '>
        //     <div className="main-wrapper flex flex-col md:flex-row relative ">
        //         <Button
        //             isIconOnly
        //             onClick={() => path.back()}
        //         >
        //             <BackIcon className="text-xl text-white" />
        //         </Button>

        //         <div className='image basis-1/2 flex flex-col items-center justify-between'>
        //             <div className="bg-red-500 hidden md:block large-image">
        //                 <Image
        //                     className="object-cover cursor-pointer rounded-xl w-[400px] h-[400px]"
        //                     src={product?.imgUrl!}
        //                     alt="snekers-photo"
        //                 />
        //                 {/* <img
        //                     className="object-cover cursor-pointer rounded-xl w-[400px] h-[400px]"
        //                     src={product?.imgUrl!}
        //                     alt="snekers-photo"
        //                 /> */}
        //             </div>

        //             <div className="small-images hidden md:flex mt-7 justify-between w-[400px] gap-4">
        //                 <div className="single-image">
        //                     <Image
        //                         isZoomed
        //                         className="w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25  border-orange"
        //                         src={product?.imgUrl!}
        //                         alt="snekers-photo"
        //                     />
        //                 </div>
        //                 <div className="single-image">
        //                     <Image
        //                         isZoomed

        //                         className="w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25  border-orange"
        //                         src={product?.imgUrl!}
        //                         alt="snekers-photo"
        //                     />
        //                 </div>
        //                 <div className="single-image">
        //                     <Image
        //                         isZoomed

        //                         className="w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25  border-orange"
        //                         src={product?.imgUrl!}
        //                         alt="snekers-photo"
        //                     />
        //                 </div>
        //                 <div className="single-image">
        //                     <Image
        //                         isZoomed
        //                         className="w-[100px] cursor-pointer rounded-xl transition-all hover:opacity-25  border-orange"
        //                         src={product?.imgUrl!}
        //                         alt="snekers-photo"
        //                     />
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="description p-6 md:basis-1/2 md:py-[40px]">
        //             <p className="text-orange text-[14px] tracking-widest uppercase font-[700] mb-6">
        //                 {product?.marca!}
        //             </p>
        //             <h1 className="text-3xl md:text-4xl capitalize font-[700]">
        //                 {product?.titulo!}
        //             </h1>
        //             <p className="hidden md:block text-darkGrayishBlue my-10 leading-7 w-[70%]">
        //                 {product?.descripcion!}
        //             </p>
        //             <div className="price flex items-center">
        //                 <span className="text-3xl font-[700] mr-4">${product?.precio!}</span>
        //                 <span className="bg-paleOrange text-orange font-[700] py-1 px-2 rounded-lg">
        //                     {product?.porcentajeDescuento}%
        //                 </span>
        //                 <p className="md:hidden line-through text-grayishBlue font-[700] translate-x-[100px] mb-2">
        //                     $250.00
        //                 </p>
        //             </div>
        //             <p className="hidden md:block line-through text-grayishBlue font-[700] mt-2">
        //                 $250.00
        //             </p>

        //             <div className="buttons-container flex flex-col md:flex-row mt-8 gap-4">
        //                 <Button isIconOnly className="" color="warning">
        //                     <EditDocumentIcon className="text-xl " />
        //                 </Button>
        //                 <Button isIconOnly className="" color="danger">
        //                     <DeleteDocumentIcon className="text-xl " />
        //                 </Button>
        //             </div>
        //         </div>

        //     </div>
        // </section>
    )
}

export default ProductPage