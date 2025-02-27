const router = require("express").Router();
const {
  findDiscussionById,
  findDiscussionsByUser,
  createNewDiscussion,
  getAllDiscussions,
  addNewComment,
  deleteDiscussion,
  updateDiscussion,
} = require("../controllers/discussion.controller");
const passport = require("passport");
const {
  discussionValidationSchema,
  commentValidationSchema,
} = require("../validations/discussion.validator");
const { validateSchema } = require("../middlewares/validate.middleware");
const { checkAdminKey } = require("../middlewares/admin.middleware");
const {
  fetchUserInCollection,
  accessLevel,
} = require("../middlewares/user.middleware");
const {
  fetchDiscussion,
  verifyAuthor,
} = require("../middlewares/discussion.middleware");

const validateDiscussion = validateSchema(discussionValidationSchema);
const validateComment = validateSchema(commentValidationSchema);

const authenticate = passport.authenticate("jwt", { session: false });

router.post(
  "/new",
  authenticate,
  accessLevel,
  fetchUserInCollection,
  validateDiscussion,
  createNewDiscussion
);
router.get("/all", checkAdminKey, getAllDiscussions);
router.get("/user/:username", findDiscussionsByUser);
router.get("/id/:id", findDiscussionById);

router.patch("/id/:id", verifyAuthor, updateDiscussion);
router.delete("/id/:id", verifyAuthor, deleteDiscussion);

router.put(
  "/:id/comment",
  fetchUserInCollection,
  fetchDiscussion,
  validateComment,
  addNewComment
);

module.exports = router;
