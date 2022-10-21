import CategoryItem from "../category-item/category-item"
import './directory.style.scss';


const Directory = ({category}) => { 
    const {id} = category


    return( 
        <div className="categories-container">
            {category.map((category) => (
            <CategoryItem key={id} categories={category}/>
            ))}
        </div>
    )
}

export default Directory