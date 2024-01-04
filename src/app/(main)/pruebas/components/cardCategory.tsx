import { Categories } from '@/interfaces/Categories';
import React, { useContext } from 'react'
import { Button } from '@nextui-org/button';
import { DeleteDocumentIcon } from '@/components/Icons'
import { CategoriesContext } from '@/app/context/CategoriesContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';
import { CheckIcon } from '@/components/Icons'

const cardCategory = ({ category }: { category: Categories }) => {

    const newDate = new Date();
    const formattedDate = format(newDate, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es });


    const { deleteCategory } = useContext(CategoriesContext)


    const handleDeleteCategory = async (id_categoria: number) => {
        const response = await deleteCategory(id_categoria.toString())
        if (response.status === 200) {
            toast.success('Event has been created', {
                // description: 'Monday, January 3rd at 6:00pm',
                description: formattedDate.toString(),
                icon: <CheckIcon />,
            });
        }
    }

    return (
        <div className='flex justify-between rounded-lg p-5 m-3 border-1 border-white'>
            <p>{category.id_categoria} .- {category.categoria}</p>
            <Button
                isIconOnly
                color='danger'
                onClick={() => {
                    if (category.id_categoria !== null) {
                        handleDeleteCategory(category.id_categoria);
                    }
                }}
            >
                <DeleteDocumentIcon />
            </Button>
        </div>
    )
}

export default cardCategory