// import types

import {useParams} from "react-router-dom";
import "./CategoryBookList.css";
import CategoryBookListItem from "./CategoryBookLIstItem";
import {useCategoryContext} from "../contexts/CategoryContext.tsx";
import {fetchBooksByCategoryName} from "../services.ts";
import {BookItem} from "../types.ts";
import {useEffect, useState} from "react";

export default function CategoryBookList() {
    const {categories} = useCategoryContext();

    const {categoryName} = useParams();

    const [books, setBooks] = useState<BookItem[]>([]);

    useEffect(() => {
        fetchBooksByCategoryName(categoryName)
            .then((data) => setBooks(data))
            .catch((error) => console.error(error));
    }, [categoryName]);

    const bookBoxList = books.map((myBook: BookItem) => (
        <CategoryBookListItem key={myBook.bookId} book={myBook} categories={categories}/>
    ));

    return <section className="category-book-list">
        <ul id="book-boxes">{bookBoxList}</ul>
    </section>;
}
