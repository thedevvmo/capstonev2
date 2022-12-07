
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.style'
import { useNavigate } from 'react-router-dom'


const DirectoryItem = ({categories}) => {

    const {imageUrl, title, route} = categories
    const navigate = useNavigate()

    const onNavigateHandler = () => navigate(route)

    return(
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
                <Body>
                    <h1>{title}</h1>
                    <p>Shop Now</p>
                </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem