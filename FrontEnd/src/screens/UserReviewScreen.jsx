import ReviewStars from '../components/ReviewStars/ReviewStars';
import GenericLightContainer from './../components/GenericLightContainer';

export default function UserReviewScreen(){
    const lotName = "krishna parkings"
    return <>
        <GenericLightContainer>
            <span className="display-6 text-primary" style={{fontWeight:"700"}}>Review Your Experience!</span>
            <span className="mx-3 text-success display-6 d-block">Lot : {lotName}</span>

            <div className="row my-5 border border-primary rounded mx-5 py-3">
                <h5 className="text-primary">How was your overall Experience?</h5>
                <div className="col-4"></div>
                {/* <div className="d-flex justify-content-around col">
                    <input type="radio" name="overall" id="" />
                    <input type="radio" name="overall" id="" />
                    <input type="radio" name="overall" id="" />
                    <input type="radio" name="overall" id="" />
                    <input type="radio" name="overall" id="" />
                </div> */}
                <ReviewStars no="5"/>
                <div className="col-4"></div>
            </div>

            <div className="row mt-5 mb-2 border border-primary rounded mx-5 py-3 d-flex justify-content-center">
                <h5 className="text-primary"> Additional feedback for the service?</h5>
                <textarea type="textarea" className="form-control px-5" style={{maxWidth:"90%", height:"5em"}} />
            </div>
            <button className="btn btn-lg btn-success">Submit</button>
            <hr></hr>
            <span className="text-body-secondary text-muted ">
                Your response will help us improve our service for the next time you use it
            </span>
            <span className="text-body-secondary text-muted d-block">
                If you have any complaints please raise a ticket &nbsp;
                <a href=".">here</a>
            </span>
        </GenericLightContainer>
    </>
}