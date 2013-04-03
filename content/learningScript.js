/*
	Welcome to newToJS.

	This introduction is aimed at people who have
	already learnt more than one language but are new to
	JavaScript.

	Despite the name, Javascript has little to nothing
	to do with Java. In fact, it's arguably more like a
	lisp (with a c like syntax).

	If you know Java, forget that for the moment, and
	treat this as if it is introducing a completely new
	language.  This introduction shows you only the
	language, not any features of the way it interacts
	with the browser.

	When you're ready to start, click 'Next'.
*/

/* Next Section */

/*
	You're looking at an area in which you can edit
	javascript.  If you press control-enter or click the
	'Run' button, the javascript will be executed and
	the output displayed on the right hand side (along
	with the code you ran).

	This page has a function called 'show' which will
	display a message on the right hand side.

	Use the show function to display a message (e.g.
	"Hello World").

	When you're done click the next button.
*/

show("You can display things by calling show, like this.");

/* Next Section */

// Basic maths

show( 2 + 3 );

show( 100 * 20 );

show( Math.sqrt(90) );

show( Math.pow(2, 5) );

show( Math.sin(3.5 * Math.PI) );

/* Next Section */

// Local variables are declared with 'var'.
// If you don't specify the 'var', you will create a
// global variables.  Avoid doing this where possible.
// No type annotation is necessary.

var anInt    = 50;
var aFloat   = 0.12345;
var aBoolean = true;
var aString  = "Some text";
var person = "Adam";
var array  = [];
var regex = /hello (.*)/;
var nothing = null;
var nothingAndIReallyMeanIt = undefined;

// Javascript does have types, but they are implicit
// and variables can contain values of any type.
show( typeof 1, typeof "1", typeof false );

/* Next Section */

var array = [];

// Arrays have length and grow automatically.
show( "Array length at start:", array.length );

array[0] = "First Element";

show( "Array length after it automatically grew:", array.length );

// array.push adds to the end of an array
array.push("add to the end");

// array.join turns an array into a string, separating
// each element with the passed string.
show( "Array contents: ", array.join(","));

// Arrays can contain objects of different types.
show( "Type of the second element: ", typeof array[1] );

array[2] = 24;
show( "Type of the second element after I changed it: ", typeof array[2] );

// Javascript has both a null and an undefined.  Values
// off the end of arrays are undefined.
// Accessing them doesn't throw an exception.  Nor does
// it cause the array to grow.
show( array[1000] );
show( "Array still has 3 elements : ", array);

/* Next Section */

// Strings in javascript can be enclosed in " or '
// there is no difference in meaning, only in what
// needs to be escaped.

var doubleQuotedString = "Adam's \"favourite\" language";
var singleQuotedString = 'Adam\'s "favourite" language';

// Javascript will automatically coerce a value to
// different types depending on context.
// This can lead to difficult to find bugs.
// Plus (+) coerces anything (including numbers) to
// strings if the other operand is a string.

var x = "1";

// Guess what value this will be before running it...
var result = (10 + x) * 2;

var guess = prompt("Guess the result");

if (result == guess) {
	show('Correct. Pretty crazy huh?');
	next();
} else {
	show('You guessed {0}, but the answer was {1}', guess, result);
}

/* Next Section */

// If JavaScript can't coerce a string to a number,
// it will be represented with the special value NaN
// meaning Not-A-Number.

// All mathematical operations will return NaN if any
// of their operands are NaN.
show( "Multiply by a string: ", (2 * "fred") + 100 );

// NaN is very unusual in javascript, because it is
// not == to itself.
// You have to use the isNaN function to check for it.
var test = NaN;
show( "Testing against NaN with equals: {0} and isNaN: {1}", test == NaN, isNaN(test) );

// Boolean operators comparisons of NaN always return
// false (although note that && and || do shortcut).
// This can lead to confusion because a variable with
// NaN in it will be neither less than nor equal to nor
// greater than any other value, including itself.
show( "Boolean operators on NaN return ", test < 10 || test > 10 || test == 10 );

/* Next Section */

// The equality check operator == can also do type
// coercion.
// If the two operands are of the same type it has
// similar characteristics to the java == (except
// strings compare contents).
// If they are of different types, it will coerce them.
// If either of them are numbers it will try to coerce
// the other to a number, otherwise it will usually
// coerce them both to strings.

function assert(x) {
	if (x !== true) throw new Error("Your assertion was not true!");
}

// Coerce the string to a number.
var x = "1";
assert( 1 == x );

// Many things can be coerced to boolean false
// I'm going to call these 'falsable'
assert( "" == false );
assert( 0 == false );
assert( "0" == false );
assert( [] == false );

// Some falsable things can be coerced to other types too.
// [] can become a string ("") or a number (0) or false.
assert( 4 * []  === 0 ); // number
assert( 3 + [] === "3" ); // string

// This means that the == operator is nontransitive
show(
	'"0" is equal to 0 ({0}) and 0 is equal to [] ({1}), but "0" is not equal to [] ({2})',
	"0" == 0,
	0 == [],
	"0" != []
);

// null (and undefined) will not be coerced by == or !=,
// but will by just !.
assert( null != false );
assert( ! null == true );
assert( null == undefined );

// If an array or a string only contains a single
// falsable thing, it's still falseable.  This nests.
// Yes, I know it's weird.
assert( [[["0"]]] == false );

// The reason is because if you try to coerce an object
// to a boolean, it first coerces the object to a
// string, using the .toString method. So any object
// that has a falsable string representation is also
// falsable.

/* Next Section */

// if statements do not decide which path to take by
// coerce their condition to boolean (which you might
// have expected).
if (true) {
	show("Boolean true triggered the true path");
} else {
	show("Boolean true triggered the false path");
}

if ("0") {
	show('String "0" (which == false) triggered the true path');
} else {
	show('String "0" (which == false) triggered the false path');
}

/*
 * The 'true path' will be executed if the condition is
 *     of type boolean and is true
 *     or if it is of type number and is not 0 or NaN
 *     or if it is of type object (including arrays)
 *       and is not null or undefined
 *     or if it is of type string and is not the empty
 *       string ""
 *
 * This is the same conversion that Boolean(x) gives you.
 *
 * Notice that there are many values that would coerce
 * to false with == but still cause the 'true path' to
 * be followed, like "0" or [].
 *
 * There are also some values that do not == false but
 * still cause the 'false path' to be followed, like
 * NaN.  For more details see http://stackoverflow.com/questions/3982663/falsey-values-in-javascript/7361005#7361005
 *
 * It is very common to check for the existence of a
 * variable using if.  This can lead to bugs.
 * Only do it if you are certain that the variable is
 * an object or an array.
 * If it could be a number or a boolean, then your
 * false path may be executed even if the variable is
 * defined.
 */
var newVariable = null;
if (newVariable) {
	show("newVariable is defined");
} else {
	show("newVariable is not defined");
}

newVariable = 0;
if (newVariable) {
	show("you wanted it to run this path.");
} else {
	show("it actually runs this one, even though newVariable is now defined.")
};

// The safest way to use 'if' is to always compare the
// condition explicitly
if (newVariable != null) {
	show("You don't have to worry about types if you're explicit.");
} else {
	show("newVariable is not defined.");
};

/* Next Section */

// If you want to check equality without type coercion
// (a good idea), you can use triple equals ===
// Try to keep in mind which one you mean when coding.
var x = "1";
show( "Double equals coerces, but triple equals doesnt: ", 1 == x, 1 === x );

// To make sure your value is a number you can use
// parseInt or parseFloat.
// parseInt will ignore characters after the number,
// which can be useful for parsing values with units.
// You can also use the Number conversion function,
// which is more strict.
var width = "100px";
show( "{0} gets converted to {1} by parseInt and to {2} by Number.",
		width,
		parseInt(width, 10),
		Number(width)
);

// Always provide the radix to the parse functions
// otherwise in old browsers leading 0s will cause the
// number to be interpreted as octal, causing yet more
// difficult to find bugs
show( "Without radix: {0}, with radix: {1}", parseInt("010"), parseInt("010", 10) );

// There was a rare backwards incompatible change in
// the standard, and browsers that implement
// ecmascript 5 or later do not have the octal behaviour.


/* Next Section */

// Maps from string to anything are built into the
// language:
var map = {
	"hello": "world",
	"greetings": 200,
	"excellent": true,
	"key has spaces": 2.664
};

// They can be accessed with dot notation or square
// bracket notation
show("Dot notation ", map.hello );
show("Square bracket notation ", map["key has spaces"] );

// Keys that don't exist in maps are undefined:
show( "A key that hasn't be set yet ", map["not here"] );

// you can change items in maps too
map.hello = "to the whole world";
show( "map.hello after the change ", map.hello );

// you can loop over keys in maps
for (var key in map) {
	show("{0} is set to {1}.", key, map[key]);
};

/* Next Section */

// Functions can be defined with
//    function <name>(<args..>) {body}:
function fact(x) {
	return x < 1 ? 1 : x * fact(x - 1)
};

show( "Factorial of 5 is ", fact(5) );

// No built in big integer support.
show( "Factorial of 50 is ", fact(50) );

/* Next Section */

// functions are first class (can be passed as
// arguments to higher order functions) and don't need
// to be named:
var addOne = function(x) {
	return x + 1;
};

var timesTwo = function(x) {
	return x * 2;
};

var applyTwice = function(func, arg) {
	return func(func(arg));
};

show( "Add one twice : ", applyTwice(addOne, 10) );
show( "Times two twice: ", applyTwice(timesTwo, 10) );

// This allows functional style programming:
function map(list, func) {
	var result = [];
	for (var i = 0; i < list.length; ++i) {
		result[i] = func(list[i])
	};
	return result;
}
show( map([1, 2, 3], timesTwo) );

// Modern browsers have .map on the arrays themselves.
// e.g.
//    var result = [4, 2, 3].map(timesTwo);

// Functions can define and use functions inside them
// and even return other functions.
function timesN(n) {
	return function(x) {
		return x * n;
	};
};
show( map([1, 2, 3], timesN(3)) );

// Observe that the n is in scope in the inner function,
// even though it's an argument to a surrounding
// function.

/* Next Section */

// There are only two scopes in javascript, global and
// functional. There is no block scoping.  Variables in
// javascript function scope are 'hoisted', so it's
// generally better to define the ones you're going to
// use at the top of the function to avoid confusion.
// (See http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting )
var x = 40;
if (true) {
	var x = 10
};
show( "You might expect x to be 40 (if javascript had block scope), but is is actually ", x);

// Variables in function scope are also accessible in
// wrapped functions, even if they have escaped their
// original context by being returned.  When this
// happens, the function is said to 'close' over the
// original variables.  Functions that do this are
// called 'closures'.
function makeAdder(a) {
	return function(b) {
		return a + b
	};
};
var addFive = makeAdder(5);
var addTwenty = makeAdder(20);

show( addFive(7) );
show( addTwenty(11) );

uidGenerator = function() {
	var uid=0;
	return function() {
		return uid++;
	};
};
var nextUID = uidGenerator();

show("First UID ", nextUID() );
show("Second UID ", nextUID() );

// Notice that uid is not a global - it's wrapped
// inside the uidGenerator function and closed over
// by the nextUID function.
show("uid is local to the uidGenerator function, if you try to access it outside you get an error.", uid );

/* Next Section */

// If a function doesn't explicitly return anything,
// then it returns undefined. Arguments that are not
// provided become undefined in the body of the function.
var dontDoAnything = function(arg) {
	if (arg !== undefined) {
		throw new Error("Shouldn't pass anything.");
	}
};
var result = dontDoAnything();
show( result );

/* Next Section */

// Objects are just special cases of maps - the key is
// the field or method name, the value can be a
// function (for a method) or some other value (for a
// field). Notice that when something refers to
// instance variables it always has to use
// 'this.<instance variable>' unlike in java where the
// 'this.' is implied.
var bob = {
	first: "Robert",
	last: "The Bruce",
	toString: function() {
		return this.first + " " + this.last
	}
};
show( bob.toString() );

// In Javascript, the way you call the function
// determines what 'this' is set to inside it.
// There are 4 ways to call functions in javascript:
//   func();
//   obj.func();
//   func.call(obj); or func.apply(obj, []);
//   new func();
// In the first one, 'this' will be set to the global
//    object or null (in strict mode).
// In the second one, 'this' will be set to obj inside
//    the function.
// In the third one, 'this' will be set to obj.
// In the final one, 'this' will be set to a freshly
//    created new object.

/* Next Section */

// Javascript has try{}catch(e){} and throw.
// Weirdly it can throw anything - e.g. a string or a
// number

throw "Hey there!";

throw 3;

// But it's better to throw Error objects, or something
// that inherits from an Error object
throw new Error("Hey!");

/* Next Section */

/*
 * while and do are the same as their c counterparts.
 * switch executes the expressions in the case
 * statements before comparison, and the comparison
 * works for strings too.
 */
var test="goodbye";

switch (test) {
	case test.match(/hello|goodbye/).toString(): show("it matches!");
};
// Remember that usually you'll want a break; at the
// bottom of each case block, same as C or Java.

/* Next Section */

// Regexes are built in.  They can match repeatedly
// (with the g flag at the end) and/or match
// case-insensitively (with the i flag at the end).
var steps = "Plan: 1. Acquire puppies, 2. ???, 3. PROFIT!!!";
show( steps.split(/,? ?\d\. /g) );

var ductOrFitRegex = /pro(duct|fit)/i;
show("match ", steps.match(ductOrFitRegex) );
show("test ", ductOrFitRegex.test(steps) );

show( steps.replace(ductOrFitRegex, "Keep puppies $1 for life") );

// replace has an ability to process the elements to be
// replaced with a function.
show( steps.replace(/\d/g, function(x) {
	return x * 5
}) );

/* Next Section */

// Javascript is (generally) a single threaded language,
// but you can queue up code blocks for execution later
// (assuming that a different code block isn't
// already executing at that time).
setTimeout(function() {
	alert("Three seconds later...");
}, 3000);

/* Next Section */

// Objects In Javascript
// ---------------------
// You saw earlier that objects in javascript are just
// the same as maps with strings as keys.
// Constructing each object by hand is a little dull
// though, so you are likely to want a function to help
// you construct your objects.

function Person(first, last) {
	this.firstname = first;
	this.lastname = last;
	this.toString = function() {
		return this.firstname+" "+this.lastname;
	};
}

// When you do new <function>, Javascript sets the
// special value 'this' to a new empty map {} then
// executes the function. After the function has
// finished, it returns the now populated map.
var robbie = new Person("Robert", "The Bruce");

// This is essentially the same as the earlier
// map <-> object example, just using
// a constructor function to make it easy to set up.
robbie.toString();

/* Next Section */

// The 'this' pointer often causes problems with scoping.
// It is defined according to the context in which the
// function is called.  This means that if you are
// returning a function out of another function then
// while you can rely on access to the other locally
// scoped variables that are closed over, you can't
// rely on access to the 'this' pointer.
// This often happens when you attach event handlers to
// html elements.
// Here is one way of avoiding this problem.
var obj = {
	message: "hello world"
};
obj.getGreeter = function() {
	var oThis = this;
	return function() {
		// If we'd used 'this' directly, it would refer
		// to something other than obj when this
		// function gets called.
		return oThis.message;
	};
};

var greeter = obj.getGreeter();
show( greeter() );

obj.message = "Guten Tag!";
show( greeter() );

// In modern browsers, a better solution is to use
// .bind

/* Next Section */

// Javascript is a prototype based language.  In a
// class based (normal OO) language like Java,
// instances inherit from abstract descriptions of
// classes of objects.
// In a prototype language, instances inherit from
// other concrete instances.

// Warning: __proto__ is not an 'offical' attribute.
// In modern versions of javscript (1.8.5) you use
// newObj = Object.create(prototype_object) instead.
// I'm showing this because it helps to understand the
// concepts, in practice, we usually use simulated
// class based inheritance, which I show later.

lomu = {
	name: "Jonah Lomu",
	caps: 63,
	sport: "rugby",
	team: "NZ",
	toString: function() {
		return this.name+" plays "+this.sport+" for "+this.team+", capped "+this.caps+" times."
	}
};

var weepu = {};
// Read this as 'weepu is just like lomu'...
weepu.__proto__ = lomu;
// ...except where we specify otherwise.
weepu.name = "Piri Weepu";
weepu.caps = 49;

// When we ask for a property that doesn't exist on an
// object,
// before returning undefined, javascript checks its
// __proto__ (and it's __proto__ in turn...)
// looking for it.
show( "Weepu plays ", weepu.sport );

// If you execute a function in this way, before the
// function is executed, the special 'this' variable is
// set to whatever is before the dot.
show( weepu.toString() );

// Remember that objects are just maps. You can detach
// the function easily
var func = weepu.toString;
// now if you call func, it won't be able to find all
// the attributes it expects because 'this' no longer
// points to weepu.
show( func() );

// None of these changes to weepu affected lomu.
show( lomu.toString() );

// But if I change lomu without changing weepu, the
// change will affect weepu too.
lomu.isHungry = true;
show( weepu.isHungry );

/* Next Section */

// You can automatically set the __proto__ for created
// objects when using constructor functions too.
function NZRugbyist(name, caps) {
	this.name = name;
	this.caps = caps;
};
// When javascript executes the constructor function it
// checks to see if there is a prototype attribute on
// it. If there is, it copies it across to the newly
// created object as its __proto__ attribute.
NZRugbyist.prototype = lomu;

var weepu = new NZRugbyist("Piri Weepu", 49);
var thorn = new NZRugbyist("Brad Thorn", 52);

thorn.toString();

/* Next Section */

// Instead of using prototype based objects, we can
// mimic class-based objects by prototype inheriting
// from a normal, concrete object that represents just
// what the objects in the class have in common.
// Here's a way of achieving the same result as before
// using this technique:
var NZRugbyistPrototype = {
	sport: "rugby",
	team: "NZ",
	toString: function() {
		return this.name+" plays "+this.sport+" for "+this.team+", capped "+this.caps+" times."
	}
};
function NZRugbyist(name, caps) {
	this.name = name;
	this.caps = caps;
};
NZRugbyist.prototype = NZRugbyistPrototype;

lomu = new NZRugbyist("Jonah Lomu", 63);
weepu = new NZRugbyist("Piri Weepu", 49);
thorn = new NZRugbyist("Brad Thorn", 52);
show("{0}, {1}, {2}", lomu.toString(), weepu.toString(), thorn.toString());

/* Next Section */

// Every function has a built in empty map as the
// prototype unless you reassign it, so you can start
// assigning to the prototype immediately.
// This code does exactly the same as the previous version.
function NZRugbyist(name, caps) {
	this.name = name;
	this.caps = caps;
};
NZRugbyist.prototype.sport = "rugby";
NZRugbyist.prototype.team = "NZ";
NZRugbyist.prototype.toString = function() {
	return this.name+" plays "+this.sport+" for "+this.team+", capped "+this.caps+" times.";
};

/* Next Section */

// When you are emulating class-based inheritance, you
// think of the prototype as an object representing the
// class and the setup function as the Constructor.
// To implement class-based inheritance you need to
// make the object representing the class inherit from
// the object representing the class of the supertype.
// This is a little bit of a pain, so we generally use
// a utility function to do it for us. So that you
// understand how it works though, here's how we do it
// manually:
function Bird(sSpecies) {
	this.bCurrentlyFlying = false;
	this.sSpecies = sSpecies;
};
Bird.prototype.toString = function() {
	return "a "+this.sSpecies + (this.bCurrentlyFlying ? " (in flight)":"");
};
Bird.prototype.takeOff = function() {
	this.bCurrentlyFlying = true;
};
Bird.prototype.land = function() {
	this.bCurrentlyFlying = false;
};

// A subclass.  Notice that javascript (unlike java)
// doesn't automatically call your superconstructor,
// so you'll have to do it yourself.
function Penguin(sName) {
	Bird.call(this, "aptenodytes patagonicus");
	this.sName = sName;
}

// We normally hide this bit in a method called
// something like extends(class, superclass);
function PenguinClass() {};
PenguinClass.prototype = Bird.prototype;
Penguin.prototype = new PenguinClass();
// this is equivalent to
//    Penguin.prototype = Object.create(Bird.prototype)
// in modern browsers.

// Overrides here:
Penguin.prototype.takeOff = function() {
	throw new Error("Penguins have cute stubby wings and can't fly!");
};
Penguin.prototype.giveMeOptions = function() {
	return ["slide", "swim", "tap dance"];
};

// Another subclass.
function Chicken(sName) {
	Bird.call(this, "gallus gallus domesticus");
	this.sName = sName;
}

// Extend the superclass...
function ChickenClass() {};
ChickenClass.prototype = Bird.prototype;
Chicken.prototype = new ChickenClass();

// Overrides here:
Chicken.prototype.lay = function() {
	return new ChickenEgg();
};
function ChickenEgg(){};

// Now we can try some things:
var little = new Chicken("Little");
var egg = little.lay();
little.takeOff();
show( little.toString() );

var kowalski = new Penguin("Kowalski");
show( kowalski.giveMeOptions() );
kowalski.takeOff();



