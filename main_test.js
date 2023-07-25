

Feature('main');

Scenario('test something', async ({ I }) => {

    I.amOnPage("https://tasks.evalartapp.com/automatization/")
    I.fillField("username","651771");
    I.fillField("password","10df2f32286b7120My0zLTE3NzE1Ng==30e0c83e6c29f1c3");
    I.click( "Send"
    ); 

   for (let i = 1; i <= 14; i++) {
    
 
  let pin = await I.grabTextFrom('html>body>div:nth-of-type(2)>div>p:nth-of-type(2)');
  let pin2 = await I.grabTextFrom('html>body>div:nth-of-type(3)>form>div');


  I.getCoordenadas(pin,pin2);
   

   
  }
  I.wait(20);


});


