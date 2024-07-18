import axios, {AxiosResponse} from 'axios';
import {BookItem, CategoryItem, CustomerForm, OrderDetails, ServerErrorResponse, ShoppingCart} from './types';

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

export async function placeOrder(
    cart: ShoppingCart,
    customerForm: CustomerForm
): Promise<OrderDetails | ServerErrorResponse> {
    const order = {cart: cart, customerForm: customerForm};
    console.log(JSON.stringify(order));
    try {
        const response: AxiosResponse<OrderDetails> = await axios.post(
            `${apiUrl}/orders`,
            order,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const serverErrorResponse: ServerErrorResponse = error.response.data;
            return serverErrorResponse;
        } else {
            // Handle unexpected errors
            throw new Error("An unexpected error occurred");
        }
    }

}