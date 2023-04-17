const {
  Builder,
  Browser,
  By,
  Key,
  until,
  WebElement,
} = require("selenium-webdriver");

async function createcourse() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    /// Login
    await driver.get("http://localhost:3000");
    let username = await driver.wait(
      until.elementLocated(By.id("username")),
      1000
    );
    let password = await driver.wait(
      until.elementLocated(By.id("password")),
      1000
    );
    await username.sendKeys("subu");
    await password.sendKeys("1234");
    await password.submit();
    /// Fill Course Info
    let courseid = await driver.wait(
      until.elementLocated(By.name("courseid")),
      1000
    );
    let coursename = await driver.wait(
      until.elementLocated(By.name("coursename")),
      1000
    );
    let coursedesc = await driver.wait(
      until.elementLocated(By.name("coursedesc")),
      1000
    );
    let courseform = await driver.wait(
      until.elementLocated(By.id("courseform")),
      1000
    );
    await courseid.sendKeys("CPTS421");
    await coursename.sendKeys("Capstone");
    await coursedesc.sendKeys("Senior Year Project Course");
    await courseform.submit();
    //check if the course id card is found
    await driver.wait(until.elementLocated(By.id("CPTS421")), 1000);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await driver.quit();
  }
}
test("Creation of a course using selenium", async () => {
  await expect(createcourse()).resolves.not.toThrow();
});
