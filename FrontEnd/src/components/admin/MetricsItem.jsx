const MetricsItem = (props)=>{
    const size =(props.col? props.col:"col-3") + " "
    return (
        <div className={size+"border border-success m-4 p-4 rounded justify-content-around"}>
            <div className='row'>
                <div className='m-1 col' style={{fontSize:"2em"}}>
                    {props.itemIcon}
                </div>
                <div className='m-1 col'>
                    <div className='row'>{props.topRowItem}</div>
                    <div className='border'></div>
                    <div className='row'>{props.bottomRowItem}</div>
                </div>
            </div>
        </div>
    )
 }
 export default MetricsItem;