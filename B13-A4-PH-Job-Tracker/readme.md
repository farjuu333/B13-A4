1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
ANSWER::
1. getElementById===>>
The getElementById method is the most specific way to target an element. Since the id attribute must be unique within an HTML document, this method is designed to find a single, specific element.
Syntax: document.getElementById("elementID");
Return Value: Returns a single Element object. If no element is found, it returns null.
Key Characteristic: It only accepts a plain string representing the ID (no # symbol needed).

2. getElementsByClassName===>>
This method is used when you want to select multiple elements that share the same class name.
Syntax: document.getElementsByClassName("className");
Return Value: Returns an HTMLCollection (an array-like object) containing all matching elements.
Limitation: You cannot use modern array methods like .forEach() directly on an HTMLCollection; you must first convert it to a true Array using Array.from().

3. querySelector & querySelectorAll==>>
A. querySelector
Purpose: Grabs the first element that matches the specified CSS selector.
Syntax: document.querySelector(".class", "#id", or "tag");
Return Value: A single Element object.

B. querySelectorAll
Purpose: Grabs all elements that match the specified CSS selector.
Syntax: document.querySelectorAll(".my-class");
Return Value: Returns a static NodeList.
Advantage: You can use the .forEach() method directly on a NodeList.