import * as React from 'react'
import {useEffect, useState} from "react";
import {BookCard} from "./BookCard";
import {BookApi} from "../api/BookApi";

export const BookList = ({books}) => {

    return (
        <div className="bookList">
            {books.map(book => <BookCard {...book}/>)}
        </div>
    );
}