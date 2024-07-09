import axios from 'axios';
import {BookItem, CategoryItem} from './types';

const apiUrl =
    `${location.protocol}//${location.hostname}:` +
    `${location.port === '5173' ? '8080' : location.port}` +
    `${import.meta.env.BASE_URL}/api`

export const fetchCategories = async (): Promise<CategoryItem[]> => {
    const response = await axios.get(`${apiUrl}/categories`);
    return response.data as CategoryItem[];
};

export const fetchBooksByCategoryName = async (categoryName: string | undefined): Promise<BookItem[]> => {
    const response = await axios.get(`${apiUrl}/categories/name/${categoryName}/books`);
    return response.data as BookItem[];
}