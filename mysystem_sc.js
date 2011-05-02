/*globals MYSYSTEM_SCSTATE eventManager */

/**
 * This is the constructor for the object that will perform the logic for
 * the step when the students work on it. An instance of this object will
 * be created in the .html for this step (look at template.html)
 */
function MYSYSTEM_SC(node, view) {
	this.node = node;
	this.view = view;
	this.content = node.getContent().getContentJSON();
	
	if (node.studentWork !== null) {
		this.states = node.studentWork; 
	} 
	else {
		this.states = [];  
	}
}

/**
 * This function renders everything the student sees when they visit the step.
 * This includes setting up the html ui elements as well as reloading any
 * previous work the student has submitted when they previously worked on this
 * step, if any.
 */
MYSYSTEM_SC.prototype.render = function () {

	// display any prompts to the student
	// example:
	// document.getElementById('promptDiv').innerHTML = this.content.prompt;
	
	// load any previous responses the student submitted for this step
	var latestState = this.getLatestState();
	
	if (latestState !== null) {
		/*
		 * get the response from the latest state. the response variable is
		 * just provided as an example. you may use whatever variables you
		 * would like from the state object (look at templatestate.js)
		 */
		var latestResponse = latestState.response;
		
		// push the previous student work into the DOM
		document.getElementById('my_system_state').value = latestResponse; 
	}
};

/**
 * This function retrieves the latest student work
 *
 * @return the latest state object or null if the student has never submitted
 * work for this step
 */
MYSYSTEM_SC.prototype.getLatestState = function () {
  if (console && console.log) console.log("MYSYSTEM_SC.getLatestState()");

	var latestState = null;
	
	if (this.states && this.states.length > 0) {
		latestState = this.states[this.states.length - 1];
	}
	
	return latestState;
};

/**
 * This function retrieves the student work from the html ui, creates a state
 * object to represent the student work, and then saves the student work.
 * 
 * note: you do not have to use 'studentResponseTextArea', they are just 
 * provided as examples. you may create your own html ui elements in
 * the .html file for this step (look at template.html).
 */
MYSYSTEM_SC.prototype.save = function () {
  if (console && console.log) console.log("MYSYSTEM_SC.save()");

	// get the answer the student wrote
	var response = document.getElementById('my_system_state').value;
	
	/*
	 * create the student state that will store the new work the student
	 * just submitted
	 * 
	 * TODO:  copy and modify the file below
	 * 
	 * vlewrapper/WebContent/vle/node/template/templatestate.js
	 */
	var state = new MYSYSTEM_SCSTATE(response);
	
	/*
	 * fire the event to push this state to the global view.states object.
	 * the student work is saved to the server once they move on to the
	 * next step.
	 */
	eventManager.fire('pushStudentWork', state);

	// push the state object into this or object's own copy of states
	this.states.push(state);
};

// used to notify scriptloader that this script has finished loading
if (typeof eventManager !== 'undefined') {
	eventManager.fire('scriptLoaded', 'vle/node/mysystem_sc/mysystem_sc.js');
}
