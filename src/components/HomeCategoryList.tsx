import HomeCategoryListItem from "./HomeCategoryListItem";
import "./HomeCategoryList.css";
import {useCategoryContext} from "../contexts/CategoryContext.tsx";

export default function HomeCategoryList() {
    const { categories } = useCategoryContext();
    const firstFourCategories = categories.slice(0, 4);
    const categoryImageLinks = firstFourCategories.map((myCategory) => (
        <li key={myCategory.categoryId}>
            <HomeCategoryListItem category={myCategory}/>
        </li>
    ));
    return <div className="category-image-items"><ul>{categoryImageLinks}</ul></div>;
}
