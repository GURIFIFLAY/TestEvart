
Feature('main');

Scenario('test something', async ({ I }) => {

    I.amOnPage("https://tasks.evalartapp.com/automatization/")
    I.fillField("username","651771");
    I.fillField("password","10df2f32286b7120Mi00LTE3NzE1Ng==30e0c83e6c29f1c3");
    I.click( "Send"
    ); 

   for (let i = 1; i <= 10; i++) {
    
 
  let pin = await I.grabTextFrom('html>body>div:nth-of-type(2)>form>div>div:nth-of-type(2)>p');
   I.extractNumbertoText(pin);
   emojis = await I.grabTextFrom('html>body>div:nth-of-type(2)>form>div>div:nth-of-type(3)>div>p:nth-of-type(2)');
   emoji = await I.grabTextFrom("(//p[@class='text-center text-xl'])[3]")

    I.extractEmoji(emoji,emojis);

   pin = await I.grabTextFrom("html>body>div:nth-of-type(2)>form>div>div:nth-of-type(4)>p")
    pin2 = await I.grabTextFrom("html>body>div:nth-of-type(2)>form>div>div:nth-of-type(4)>div")

   I.getMultiplos(pin,pin2);
   I.wait(3);
   pin = await I.grabTextFrom('html>body>div:nth-of-type(2)>form>div>div>p:nth-of-type(2)');
   I.conversionTextToNumber(pin);

   I.click("Send");

   
  }
  I.wait(20);


});
