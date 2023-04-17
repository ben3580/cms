const courseidValidator = async (value) => {
  if (!value.startsWith("CPTS")) {
    throw new Error("CourseID must start with CPTS");
  }
};
const enrollnumValidator = async (value, { req }) => {
  const courseid = req.body.courseid;
  const courseType = courseid.charAt(4);
  if (courseType == 4 && value > 60) {
    throw new Error("For 400 level courses enrollnum should not exceed 60");
  }
};
module.exports = { courseidValidator, enrollnumValidator };
