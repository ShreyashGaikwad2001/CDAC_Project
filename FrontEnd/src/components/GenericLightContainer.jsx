export default function GenericLightContainer({id, children}){
    return (
        <div className="container mt-5 py-4 text-center 
                        border bg-light border-success 
                        rounded shadow-sm" id={id}>
            {children}
        </div>
    )
}