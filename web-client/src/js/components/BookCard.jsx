import * as React from 'react'

export const BookCard = ({title, author}) => (
    <div className="bookCard">
        <div className="bookCard__title">{title}</div>
        <div className="bookCard__author">{author}</div>
    </div>
)