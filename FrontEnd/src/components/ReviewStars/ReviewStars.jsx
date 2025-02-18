import { useState } from 'react';
import YellowFillStar from '../../res/YellowFillStar.png'
import './ReviewStarStyle.css'

export default function ReviewStars(props){


    const starsArray = [];
    for(let i = 0; i<parseInt(props.no); i++){
        starsArray.push(false);
    }
    const [rating, setRating] = useState(-1);
    return (
        <div className='d-flex justify-content-center'>
            {
                starsArray.map((ele, index)=>{
                    const ratingValue = index + 1;
                    return <div  className='col-2' key={index}>
                           <label key={index} className={(rating>=index)?' star-item-active':'star-item'}>
                                <input type="radio" name="rating" value={ratingValue} className='star-radio' onChange={()=>{setRating(index)}}/>
                                <img src={YellowFillStar} style={{height:"100%", width:"100%"}} alt='star-item'/>
                            </label>
                        </div>
                })
            }
        </div>
    )
}