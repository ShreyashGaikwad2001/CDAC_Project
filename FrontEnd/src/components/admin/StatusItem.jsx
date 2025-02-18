const StatusItem = (props)=>{
    return (
             <div className="border m-4 p-4 rounded align-content-center col border-success" style={{height:"auto"}}>
                 <span>{props.title}</span>
                 <ul className="list-group list">
                    {
                        props.items?
                            props.items.map((item)=>{
                                return <li className="list-group-item">{item}</li>
                            })
                        :''
                    }
                 </ul>
             </div>
    )
 } 
 export default StatusItem;