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

2. How do you create and insert a new element into the DOM?

ANSWER::
Create: Use document.createElement("tag") to create a new element in memory.
Configure: Add content using textContent and set attributes ( ID or Class) using setAttribute().
Locate Parent: Use getElementById() or querySelector() to find the existing element that will contain the new one.
Insert: Use appendChild() to add it as the last child, or prepend() to add it as the first child of the parent.

3. What is Event Bubbling? And how does it work?
ANSWER::
Event Bubbling is a mechanism where an event starts at the most specific element (the target) and flows upwards through its parents until it reaches the window object.
Core Mechanics
The Path: Target → Parent → Grandparent → Document → Window.
Default State: It is the standard behavior for most events ( click, submit, and keydown).
The "Stop" Switch: You can kill the bubble using event.stopPropagation(). This prevents parent handlers from firing.

4. What is Event Delegation in JavaScript? Why is it useful?
ANSWER::

Event Delegation is a technique where you attach a single event listener to a parent element instead of adding multiple listeners to its children. It relies on Event Bubbling to "catch" events as they travel up the DOM tree.
How It Works
The Click: A user clicks a child element (a <li> or <button>).
The Bubble: The event bubbles up from that child to its parent.
The Catch: The parent’s listener triggers.  use event.target to identify exactly which child was clicked and perform the action.
Why Is It Useful?
Memory Efficiency: Adding 1,000 listeners to 1,000 list items slows down the browser. One listener on the parent uses significantly less memory.
Dynamic Elements: If  add a new button to the list via JavaScript, it automatically works with the parent listener.  don't need to manually bind a new listener to it.
Cleaner Code:  manage  logic in one central place instead of scattering handlers across the DOM

5. What is the difference between preventDefault() and stopPropagation() methods?
ANSWER::

1. event.preventDefault()
This stops the browser's default behavior for an element. It does not stop the event from bubbling up the DOM.
What it does: Prevents the "natural" thing that usually happens.
Common Use Cases:
Stopping a form from submitting and refreshing the page.
Stopping a link (<a>) from navigating to a new URL.
Stopping a checkbox from being checked.
2. event.stopPropagation()
This stops the event from bubbling up the DOM tree. It prevents parent elements from "hearing" the event.
What it does: Cuts off the signal so it doesn't reach the ancestors.
Common Use Case:
Clicking a "Delete" button inside a clickable "Card" component without triggering the card's own click event.