function Tutorial() {
	Emitter.call(this);
	this.sections = [];
	this.currentSection = -1;
}
Tutorial.prototype = Object.create(Emitter.prototype);

Tutorial.prototype.next = function() {
	if ( (this.currentSection + 1) < this.sections.length) {
		var oldSection = this.currentSection ++;
		this.emit("sectionChanged", this.sections[this.currentSection], this.sections[oldSection], this.currentSection, oldSection);
	}
};
Tutorial.prototype.getCurrentSection = function() {
	return this.sections[this.currentSection];
};
Tutorial.prototype.back = function() {
	if (this.currentSection > 0) {
		var oldSection = this.currentSection --;
		this.emit("sectionChanged", this.sections[this.currentSection], this.sections[oldSection], this.currentSection, oldSection);
	}
};
Tutorial.prototype.setSection = function(section) {
	if (section != this.currentSection && section >= 0 && section < this.sections.length) {
		var oldSection  = this.currentSection;
		this.currentSection = section;
		this.emit("sectionChanged", this.sections[this.currentSection], this.sections[oldSection], this.currentSection, oldSection);
	};
};
Tutorial.prototype.load = function(url) {
	var oThis = this;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var js = xhr.responseText;
				oThis.sections = js.split(/\/\* Next Section \*\/[\r\n]+/);
				oThis.setSection(0);
			} else {
				oThis.emit("problem", xhr.statusText);
			}
		}
	};
	this.emit("loading", url);
	xhr.send(null);
};