import { useContext, useState } from 'react'
import { CartContext } from '../../context/cart.context'

import './product-card.styles.css'


const ProductCard = ({size, weight}) => {

    const { items, setItems } = useContext(CartContext)

    const [cylinderCount, setCylinderCount] = useState(0)

    const increaseCount = () => {
        setCylinderCount(cylinderCount + 1)
        setItems(items + 1)
    }

    const decreaseCount = () => {
        if (items > 0 && cylinderCount > 0) {
            setCylinderCount(cylinderCount - 1)
            setItems(items - 1)
        }
    }

    return (
        <div className="w-90 m-auto d-flex jc-space-btw cylinder-container" >
            {/* Cylinder Info container */}
            <div className="d-flex fd-col jc-center">
                <h3 className="mb-1 secondary-text">{`${size} Cylinder`}</h3>
                <span className="f-size-0 " >Quantity : 1</span>
                <span className="f-size-0" >Pressure : 2000 psi</span>
                <span className="f-size-0" >{`Weight : ${weight}`}</span>
            </div>
            {/* Cylinder image container */}
            <div className="d-flex fd-col jc-center">
                <img className="cylinder-image-box" alt=''/>
                <div className="quantity-toggle">
                    <div className='quantity-elements' onClick={decreaseCount}>-</div>
                    <div className='quantity-elements'>{`${cylinderCount}`}</div>
                    <div className='quantity-elements' onClick={increaseCount}>+</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard