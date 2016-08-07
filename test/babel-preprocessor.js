var babel = require('babel-core');

var options = {
  presets: ["es2015", "react"]
};

module.exports = {
	process: function (src) {
		return babel.transform(src, options).code
	}
}
