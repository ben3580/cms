const { courseidValidator, enrollnumValidator } = require("./validations");

test("the courseidValidator throws validation error", async () => {
  await expect(courseidValidator("EECS421")).rejects.toMatchObject(
    new Error("CourseID must start with CPTS")
  );
});
test("the courseidValidator throws validation error", async () => {
  await expect(courseidValidator("CPTS421")).resolves.not.toThrow();
});
const failRequest = {
  req: {
    body: {
      courseid: "CPTS489",
    },
  },
};
test("the enrollnumvalidator throws validation error", async () => {
  await expect(enrollnumValidator(80, failRequest)).rejects.toMatchObject(
    new Error("For 400 level courses enrollnum should not exceed 60")
  );
});
const passRequest = {
  req: {
    body: {
      courseid: "CPTS389",
    },
  },
};

test("the courseidValidator throws validation error", async () => {
  await expect(enrollnumValidator(80, passRequest)).resolves.not.toThrow();
});
