import './directory.component.style.scss'
import { Outlet } from "react-router-dom";
import DirectoryItem from '../category-item/directory-item';


const categories = [
    {
        id: '1adfwe2eed',
        title: "hats",
        imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
        route: 'shop/hats'
    },
    {
        id: '2sfisdfn',
        title: "jackets",
        imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
        route: 'shop/jackets'
    },
    {
        id: '3sjkbf823',
        title: "sneakers",
        imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
        route: 'shop/sneakers'
    },
    {
        id: '4siuf82hbr2b',
        title: "womens",
        imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
        route: 'shop/womens'
    },
    {
        id: '5fiuwd89yhd',
        title: "mens",
        imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
        route: 'shop/mens'
    }
]

const Directory = () => { 
    const {id} = categories

    return( 
        <div>
            <Outlet />
            <div className="categories-container">
                {categories.map((categories) => (
                    <DirectoryItem key={id} categories={categories}/>
                    ))}
            </div>
        </div>
    )
}

export default Directory