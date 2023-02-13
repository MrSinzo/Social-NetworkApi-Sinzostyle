const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  newReaction
} = require('../../controllers/thoughtController')


router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).post(updateThought)

router.route('/:thoughtId/reactions').post(newReaction)
module.exports = router