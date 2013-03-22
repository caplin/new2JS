function ObjectRenderer() {
	this.functionSummaryLength = 20;
	this.objectSummaryLength = 80;
}

ObjectRenderer.getPrimitiveRenderer = function() {
	var classes = Array.prototype.join.call(arguments, " ");
	return function(value) {
		var result = document.createElement('span');
		result.className = 'primitive '+classes;
		result.appendChild(document.createTextNode(String(value)));
		return result;
	}
};

ObjectRenderer.prototype._addSummaryAndDetail = function(parent, value, summary, detail, showDetail) {
	var showSummary = ! showDetail;
	parent.appendChild(summary);
	parent.appendChild(detail);
	var oThis = this;

	oThis.toggleDetail(parent, value, summary, detail, showSummary);

	parent.onclick = function(e) {
		e = e || event;
		showSummary = ! showSummary;
		oThis.toggleDetail(parent, value, summary, detail, showSummary);
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
	}
};

ObjectRenderer.prototype.toggleDetail = function(parent, value, summary, detail, showSummary) {
	detail.style.display = showSummary ? 'none' : '';
	summary.style.display = showSummary ? '' : 'none';
};

ObjectRenderer.prototype.getLogElement = function(msg) {
	var i;
	var result = document.createElement('div');
	result.className = 'ObjectRendererLog';
	var argsUsed = {};
	if (typeof msg === 'string') {
		argsUsed[0] = true;
		var messageParts = msg.split(/(\{\d+\})/g);
		for (i = 0; i < messageParts.length; ++i) {
			var txt = messageParts[i];
			var referenceMatch = txt.match(/^\{(\d+)\}$/);
			if (referenceMatch) {
				var idx = Number(referenceMatch[1]) + 1;
				argsUsed[idx] = true;
				result.appendChild(this.getElement(arguments[idx], true));
			} else {
				result.appendChild(document.createTextNode(txt));
			}
		}
	}

	for (i = 0; i < arguments.length; ++i) {
		if (! argsUsed[i]) {
			result.appendChild(this.getElement(arguments[i], true))
		}
	}

	return result;
};

ObjectRenderer.prototype.getElement = function(value, minimised) {
	var result = document.createElement('div');
	result.className = 'ObjectRenderer';
	result.appendChild(this.render(value, [], [], ! minimised));
	return result;
};

ObjectRenderer.prototype.render = function(value, renderedObjects, objectElements, expanded) {
	var type = typeof value;
	type = type.charAt(0).toUpperCase() + type.substring(1);
	return this['render' + type](value, renderedObjects, objectElements, expanded);
};

ObjectRenderer.prototype.renderUndefined = ObjectRenderer.getPrimitiveRenderer('undefined', 'none');
ObjectRenderer.prototype.renderString = ObjectRenderer.getPrimitiveRenderer('string');
ObjectRenderer.prototype.renderNumber = ObjectRenderer.getPrimitiveRenderer('number');
ObjectRenderer.prototype.renderBoolean = ObjectRenderer.getPrimitiveRenderer('boolean');
ObjectRenderer.prototype.renderFunction = function(value, renderedObjects, objectElements, expanded) {
	var result = document.createElement('div');
	result.className = 'primitive function ' + value.name;
	var longForm = this.renderFunctionDetail(value);
	var shortForm = this.renderFunctionSummary(value);
	this._addSummaryAndDetail(result, value, shortForm, longForm, expanded);
	return result;
};
ObjectRenderer.prototype.renderFunctionDetail = function(value) {
	var longForm = document.createElement('pre');
	longForm.className = 'longform';
	longForm.appendChild(document.createTextNode(value.toString()));
	return longForm;
};
ObjectRenderer.prototype.renderFunctionSummary = function(value) {
	var shortForm = document.createElement('span');
	shortForm.className = 'shortform';
	var txt = value.toString();
	if (txt.length > this.functionSummaryLength) {
		txt = txt.substring(0, this.functionSummaryLength - 3) + "...";
	}
	shortForm.appendChild(document.createTextNode(txt));
	return shortForm;
};
ObjectRenderer.prototype.renderObject = function(value, renderedObjects, objectElements, expanded) {
	if (value === null) {
		return this.renderNull();
	} else if (Object.prototype.toString.call(value) === "[object Array]" ) {
		return this.renderArray(value, renderedObjects, objectElements, expanded);
	} else if (value instanceof Error) {
		return this.renderError(value, renderedObjects, objectElements, expanded);
	} else {
		return this.renderPlainObject(value, renderedObjects, objectElements, expanded);
	}
};
ObjectRenderer.prototype.renderNull = function() {
	var result = document.createElement('div');
	result.className = 'object null none';
	result.appendChild(document.createTextNode('null'));
	return result;
};
ObjectRenderer.prototype.renderArray = function(value, renderedObjects, objectElements, expanded) {
	var result = this.renderPlainObject(value, renderedObjects, objectElements, expanded);
	result.className +=" array";
	return result;
};
ObjectRenderer.prototype.renderDuplicate = function(value, renderedElement) {
	var pointer = document.createElement('a');
	pointer.className = 'pointer';
	pointer.appendChild(document.createTextNode('<already rendered>'));
	pointer.onmouseover = function() {
		renderedElement.classList.add('highlightpulse');
		setTimeout(function() {
			renderedElement.classList.remove('highlightpulse');
		}, 1000);
	};
	return pointer;
};
ObjectRenderer.prototype.renderError = function(e, renderedObjects, objectElemenets, expanded) {
	var stack = e.stack;
	var element = document.createElement('pre');
	var description = e.name+": "+ e.message;
	if (stack.substring(0, description.length) != description) {
		stack = description+"\n"+stack;
	}
	element.className = 'object error';
	element.textContent = stack;
	return element;
};
ObjectRenderer.prototype.renderObjectDetail = function(obj, renderedObjects, objectElements) {
	var longForm = document.createElement('dl');
	longForm.className = 'longform';
	function appendForKey(longForm, key) {
		var label = document.createElement('dt');
		if (key === '__proto__') {
			label.className = 'prototype';
		}
		label.appendChild(document.createTextNode(key));
		longForm.appendChild(label);
		var val = document.createElement('dd');
		var valInner = this.render(obj[key], renderedObjects, objectElements, false);
		val.appendChild(valInner);
		longForm.appendChild(val);

		label.onclick = function(e) {
			e = e || event;
			valInner.click();
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();
		}
	}
	for (var key in obj) {
		if ( !obj.__proto__ || obj.hasOwnProperty(key)) {
			appendForKey.call(this, longForm, key);
		}
	}
	if (obj.__proto__ && obj.__proto__ != Object.prototype) {
		appendForKey.call(this, longForm, "__proto__");
	}
	return longForm;
};
ObjectRenderer.prototype.renderObjectSummary = function(obj, renderedObjects) {
	var rootRendered = false;
	var shortFormTxt = JSON.stringify(obj, function(key, value) {
		if (value == obj && ! rootRendered) {
			rootRendered = true;
			return value;
		}
		if (renderedObjects.indexOf(value) >= 0) {
			return "<...>"
		}
		if (typeof value === 'function') {
			return "<function>";
		}
		return value;
	});

	if (shortFormTxt.length > this.objectSummaryLength) {
		shortFormTxt = shortFormTxt.substring(0, this.objectSummaryLength - 3) + " ...";
	}

	var shortForm = document.createElement('span');
	shortForm.className = 'shortform';
	shortForm.appendChild(document.createTextNode(shortFormTxt));

	return shortForm;
};
ObjectRenderer.prototype.renderPlainObject = function(obj, renderedObjects, objectElements, expanded) {
	var idx = renderedObjects.indexOf(obj);
	if (idx >= 0) {
		return this.renderDuplicate(obj, objectElements[idx]);
	}
	var result = document.createElement('div');
	result.className = 'object';
	if (obj.constructor && obj.constructor.name) {
		result.className += ' '+obj.constructor.name;
	}
	renderedObjects.push(obj);
	objectElements.push(result);
	var longForm = this.renderObjectDetail(obj, renderedObjects, objectElements);
	var shortForm = this.renderObjectSummary(obj, renderedObjects);
	this._addSummaryAndDetail(result, obj, shortForm, longForm, expanded);
	return result;
};