function App(codeEntry, history, url) {
	var tutorial = this.tutorial = new Tutorial();
	this.renderer = new CMRenderer();
	this.history = history;
	var editor = this.editor = CodeMirror(codeEntry, {
		value: "... loading tutorial from "+url+" ...",
		mode: "javascript",
		lineNumbers: true,
		extraKeys: {
			"Ctrl-Enter": this.executeCurrent.bind(this),
			"Ctrl-Right": tutorial.next.bind(tutorial),
			"Ctrl-Left": tutorial.back.bind(tutorial)
		}
	});
	this.executionContext = {
		show: this.show.bind(this),
		next: tutorial.next.bind(tutorial),
		back: tutorial.back.bind(tutorial),
		reset: function() {
			editor.setValue(tutorial.getCurrentSection());
		},
		clear: editor.setValue.bind(editor, ""),
		lomu: undefined,
		weepu: undefined
	};
	this.tutorial.on("sectionChanged", function(newContent) {
		editor.setValue(newContent);
	});
	this.tutorial.on("problem", function(code) {
		editor.setValue("Unable to load "+url+" error: "+code);
	});
	this.tutorial.load(url);
}

App.prototype.executeCurrent = function() {
	var js = this.editor.getValue();
	this.execute(js);
};

App.prototype.show = function() {
	this.history.appendChild(this.renderer.getLogElement.apply(this.renderer, arguments));
};

App.prototype.execute = function(funcString) {
	var code = document.createElement('pre');
	code.appendChild(document.createTextNode(funcString));
	code.className = 'coderun';
	var editor = this.editor;
	code.onclick = function() {
		editor.setValue(funcString);
	};
	this.history.appendChild(code);
	var result;
	try {
		with (this.executionContext) {
			result = eval(funcString);
		}
	} catch (e) {
		result = e;
	}
	if (result !== undefined) {
		result = this.renderer.getElement(result);
		result.className += ' result';
		this.history.appendChild(result);
	}
	this.history.scrollTop = this.history.scrollHeight - this.history.clientHeight;
};