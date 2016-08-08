var babel = require('babel-core');

var options = {
  presets: ["es2015", "react"]
};

module.exports = {
	process: function (src) {
		const result = babel.transform(src, options).code
		// console.log('Transformation result\n', result, '\n\n');
		return result;
	}
}
