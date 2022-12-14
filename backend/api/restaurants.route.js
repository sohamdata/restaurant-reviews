import express from 'express';
import RestaurantsController from "./restaurants.controller.js"
import ReviewsController from "./reviews.controller.js"



const router = express.Router();
router.route('/').get(RestaurantsController.apiGetRestaurants);
router.route('/id/:id').get(RestaurantsController.apiGetRestaurantById);
router.route('/cuisines').get(RestaurantsController.apiGetRestaurantCuisines); // ability to select cuisine from a dropdown menu


router
    .route("/Review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router;