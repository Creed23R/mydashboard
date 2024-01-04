import React, { useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Categories } from '@/interfaces/Categories';
import PaginationTable from './Pagination';

const table = ({ categories }: { categories: Categories[] }) => {

    const [pagina, setPagina] = useState(1);
    const [cantidad, setCantidad] = useState(5);


    const maximo = categories ? Math.ceil(categories.length / cantidad) : 5;

    return (
        <>
            <Table
                className="min-h-[222px] max-h-[382px]"
                removeWrapper
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {
                        categories.slice(
                            (pagina - 1) * cantidad,
                            (pagina - 1) * cantidad + cantidad
                        ).map(categorie => {
                            return (
                                <TableRow key={categorie.id_categoria}>
                                    <TableCell>{categorie.id_categoria}</TableCell>
                                    <TableCell>{categorie.categoria}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            {/* <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} /> */}
            <PaginationTable pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </>
    )
}

export default table