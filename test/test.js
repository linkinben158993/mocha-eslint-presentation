function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

describe("Test APIs", () => {
  beforeEach(function () {
    console.log("Try running something before each test!");
  });

  importTest("users.test", "./users/users.test");
  importTest("all.test.js", "./all/all.test");

  after(function () {
    console.log("Run all test!");
  });
});
