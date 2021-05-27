function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

describe('Test APIs', () => {
  beforeEach(function () {
    console.log('Try running something before each test!');
  });

  // importTest('changeName.test', './users/changeName.test');

  importTest('users.test', './users/users.test');
  importTest('changeName.test', './users/changeName.test.js');

  after(function () {
    console.log('Run all test!');
  });
});
