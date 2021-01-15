const rollup = require('rollup');
const config = require('../config/rollup.config');

function build ({ input, output }) {
  rollup.rollup(input).then(bundle => {
    bundle.write(output);
  });
}

build(config);
