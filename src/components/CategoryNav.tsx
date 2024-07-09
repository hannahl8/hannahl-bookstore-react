import "./HeaderDropdown.css";
import "./CategoryNav.css";
import CategoryNavLinks from "./CategoryNavLinks.tsx";

export default function CategoryNav() {
    return (
        <div className="category-nav">
            <CategoryNavLinks />
        </div>
    );
}