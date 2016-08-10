var babel = require('babel-core');

var options = {
  presets: ["es2015", "react"],
  plugins: ["transform-object-rest-spread"]
};

module.exports = {
	process: function (src) {
		const result = babel.transform(src, options).code
		// console.log('Transformation result\n', result, '\n\n');
		return result;
	}
}
