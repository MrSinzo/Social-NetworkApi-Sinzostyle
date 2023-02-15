const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thoughtController')


router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).post(updateThought)

router.route('/:thoughtId/reactions').post(newReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)
module.exports = router