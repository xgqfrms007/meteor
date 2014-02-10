var selftest = require('../selftest.js');
var Sandbox = selftest.Sandbox;

selftest.define("login", ['net'], function () {
  var s = new Sandbox;

  var run = s.run("whoami");
  run.matchErr("Not logged in");
  run.expectExit(1);

  // Username and password prompts happen on stderr so that scripts can
  // run commands that do login interactively and still save the command
  // output with the login prompts appearing in it.
  run = s.run("login");
  run.matchErr("Username:");
  run.write("test\n");
  run.matchErr("Password:");
  run.write("testtest\n");
  run.waitSecs(5);
  run.matchErr("Logged in as test.");
  run.expectExit(0);

  // XXX test login failure
  // XXX test login by email

  run = s.run("whoami");
  run.read("test\n");
  run.expectEnd();
  run.expectExit(0);

  run = s.run("logout");
  run.waitSecs(5);
  run.matchErr("Logged out");
  run.expectExit(0);

  run = s.run("logout");
  run.matchErr("Not logged in");
  run.expectExit(0);

  run = s.run("whoami");
  run.matchErr("Not logged in");
  run.expectExit(1);
});
