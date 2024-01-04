import { ArrowLeft, ArrowRight } from '@/components/Icons';
import { Pagination } from '@nextui-org/react';
import { Button } from '@nextui-org/react'
import React from 'react'

const PaginationTable = ({ pagina, setPagina, maximo }: { pagina: number, setPagina: any, maximo: number }) => {

    const [currentPage, setCurrentPage] = React.useState(1);

    const prevPage = () => {
        setPagina(pagina - 1);
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
    }

    const nextPage = () => {
        setPagina(pagina + 1);
        setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
    }

    // console.log(maximo)

    return (
        <div className="flex flex-col gap-5 w-[100%]">
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <Button
                        isIconOnly
                        size="sm"
                        // variant={pagina == 1 ? 'solid' : 'shadow'}
                        variant='light'
                        onClick={prevPage}
                        disabled={pagina == 1 || pagina < 1}
                    >
                        <ArrowLeft className={pagina == 1 ? 'text-gray-400 text-2xl' : 'secondary text-2xl'} />
                    </Button>
                    <Pagination
                        classNames={{
                            cursor: "bg-foreground text-background",
                        }}
                        total={maximo}
                        color="default"
                        variant='light'
                        page={currentPage}
                        onChange={setCurrentPage}
                    />
                    <Button
                        // variant={pagina == maximo ? 'solid' : 'shadow'}
                        variant='light'
                        isIconOnly
                        size="sm"
                        onClick={nextPage}
                        disabled={pagina == maximo || pagina > maximo}
                    >
                        <ArrowRight className={pagina == maximo ? 'text-gray-400 text-2xl' : 'secondary text-2xl'} />
                    </Button>
                </div>
                <p className="text-small text-default-500">Selected Page: {currentPage}</p>
            </div>
        </div>
    )
}

export default PaginationTable