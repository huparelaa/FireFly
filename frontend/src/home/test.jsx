import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function MyComponent() {
    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)

        // other logic
    }
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value, index) => console.log(value, index)

    return (
        <div className="container px-4 px-md-3 mt-5 pt-5">
            <div className="row mb-5 pb-md-4 align-items-center">
                <div className="col-12 col-lg-10 mx-auto">
                    <div className="box">
                        <h3>Demo</h3>
                        <div className="demo">      
                        <Rating
                            onClick={handleRating}
                            onPointerEnter={onPointerEnter}
                            onPointerLeave={onPointerLeave}
                            onPointerMove={onPointerMove}
                            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            emptyStyle={{ display: "flex" }} 
                            fillStyle={{ display: "-webkit-inline-box" }}
                            transition
                            allowFraction
                            showTooltip
                        />
                        </div> </div> </div> </div> </div>
    )
}