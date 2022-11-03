import CategoryItem from "../category-item/category-item"
import './directory.style.scss';
import { Outlet } from "react-router-dom";


const Directory = ({category}) => { 
    const {id} = category


    return( 
        <div>
            <Outlet />
            <div className="categories-container">
                {category.map((category) => (
                    <CategoryItem key={id} categories={category}/>
                    ))}
            </div>
        </div>
    )
}

export default Directory