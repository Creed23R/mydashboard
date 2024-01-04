import { Categories } from '@/interfaces/Categories'
import React from 'react'

const CardUsers = ({ categories }: { categories: Categories[] }) => {
  return (
    <div>
      {
        categories.map(category => (
          <div key={category.id_categoria}>
            <p>{category.categoria}</p>
          </div>
        ))
      }
    </div>
  )
}

export default CardUsers