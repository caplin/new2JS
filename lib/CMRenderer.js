// This is an extension of the ObjectRenderer that uses
// code mirror to render functions.

function CMRenderer() {
	ObjectRenderer.call(this);
};
CMRenderer.prototype = Object.create(ObjectRenderer.prototype);
CMRenderer.prototype.renderFunctionDetail = function(value) {
	var result = document.createElement('div');
	var display = CodeMirror(function(elm) {
		result.appendChild(elm);
	}, {
		value: value.toString(),
		mode:  "javascript",
		lineNumbers: true,
		readOnly: 'nocursor'
	});
	result.editor = display;
	return result;
};
CMRenderer.prototype.toggleDetail = function(result, value, summary, detail, showSummary) {
	ObjectRenderer.prototype.toggleDetail.apply(this, arguments);
	if (detail.editor) {
		detail.editor.refresh();
	}
};