const shelljs = require("shelljs");

shelljs.set("-e");

const exec = (command) => shelljs.exec(command, { silent: true });
const which = shelljs.which;
const cd = shelljs.cd;

module.exports = {
  exec,
  cd,
  which,
};
