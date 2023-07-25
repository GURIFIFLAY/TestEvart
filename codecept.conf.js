const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  timeout: 50000,
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://tasks.evalartapp.com/automatizatio',
      show: true
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'New folder'
}