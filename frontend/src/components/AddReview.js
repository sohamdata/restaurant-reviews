import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const AddReview = props => {
    let initialReviewState = "";

    let editing = false; // we are not editing by default

    // if we are editing, we need to get the review from the database
    if (props.location.state && props.location.state.currentReview) {
        editing = true;
        initialReviewState = props.location.state.currentReview.text;
    }

    const [review, setReview] = useState(initialReviewState); // we set the initial state to be the review we are editing, or an empty string
    const [submitted, setSubmitted] = useState(false); // we set the initial state to be false, because we haven't submitted anything yet

    const handleInputChange = event => {
        setReview(event.target.value); // we set the review to be the value of the input
    };

    const saveReview = () => {
        var data = {
            text: review,
            name: props.user.name,
            user_id: props.user.id,
            restaurant_id: props.match.params.id
        };

        // if we are editing, we need to update the review
        if (editing) {
            data.review_id = props.location.state.currentReview._id
            RestaurantDataService.updateReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            RestaurantDataService.createReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    };

    return (
        <div>
            {/*check if user is logged in*/}
            {props.user ? (
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
                                Back to Restaurant
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="description">{editing ? "Edit" : "Create"} Review</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    required
                                    value={review}
                                    onChange={handleInputChange}
                                    name="text"
                                />
                            </div>
                            <button onClick={saveReview} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>

            ) : (
                <div>
                    Please log in.
                </div>
            )}

        </div>
    );
};

export default AddReview;