import {NavLink} from "react-router-dom";
import {icons} from "../utils.ts";
import {useCategoryContext} from '../contexts/CategoryContext';

export default function CategoryNavLinks() {
    const {categories, setLastSelectedCategoryName} = useCategoryContext();
    const handleCategoryClick = (categoryName: string) => {
        setLastSelectedCategoryName(categoryName);
    }
    const categoryNavLinks = categories.map((category) => {
        const icon = category.name in icons ? icons[category.name] : '';
        return (
            <li key={category.categoryId} onClick={() => handleCategoryClick(category.name)}>
                <NavLink to={`/category/${category.name}`}>{category.name} <i className={icon}></i></NavLink>
            </li>
        );
    });

    return <ul>{categoryNavLinks}</ul>;
}
