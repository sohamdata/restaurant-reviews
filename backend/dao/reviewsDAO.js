import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId; // reqd to convert string to a mongodb object id

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) { // if the review already exists
            return;
        }
        try {
            reviews = await conn.db(process.env.database).collection("reviews");
        } catch (e) {
            console.error(`unable to establish a connection handle in reviewsDAO: ${e}`);
        }
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            }
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { text: text, date: date } },
            )
            return updateResponse;
        } catch (e) {
            console.error(`unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            }
            )
            return deleteResponse;

        } catch (e) {
            console.error(`unable to delete review: ${e}`);
            return { error: e };
        }
    }
}