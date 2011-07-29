/**
 * This is the constructor for the object that will perform the logic for
 * the step when the students work on it. An instance of this object will
 * be created in the .html for this step (look at mysystem.html)
 */
function Mysystem2(node,view) {
  this.node = node;
  this.content = node.getContent().getContentJSON();

  // TODO: This is a bit hackety, pulling a MySytem-ref out of the inner-frame
  this.MySystem = MySystem;
  this.domIO = document.getElementById('my_system_state');

  if (node.studentWork != 'undefined' && node.studentWork != null) {
    this.states = node.studentWork; 
  } 
  else {
    this.states = [];
  }
};

/**
 * This function renders everything the student sees when they visit the step.
 * This includes setting up the html ui elements as well as reloading any
 * previous work the student has submitted when they previously worked on this
 * step, if any.
 */
Mysystem2.prototype.render = function() {
  var latestState = this.getLatestState();
  if (latestState !== null) {
    /*
     * get the response from the latest state. the response variable is
     * just provided as an example. you may use whatever variables you
     * would like from the state object (look at templatestate.js)
     */
    var latestResponse = latestState.response;
    this.domIO.textContent = latestResponse;
  }
  if (this.content) {
    this.MySystem.loadWiseConfig(this.content,latestState);
  }
  if (latestState) {
    this.MySystem.updateFromDOM();
  }
};

/**
 * This function retrieves the latest student work
 *
 * @return the latest state object or null if the student has never submitted
 * work for this step
 */
Mysystem2.prototype.getLatestState = function() {
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
 * the .html file for this step (look at mysystem.html).
 */
Mysystem2.prototype.save = function() {
  // We use a simple dom element for our data passing
  var response =this.domIO.textContent;
  /*
   * create a student state object that will store the new work the student
   * just submitted
   */
  var state = new MYSYSTEM2STATE(response);
  
  /*
   * fire the event to push this state to the global view.states object.
   * the student work is saved to the server once they move on to the
   * next step.
   */
  eventManager.fire('pushStudentWork', state);

  // push the state object into this or object's own copy of states
  this.states.push(state);
};


//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/mysystem2/mysystem2.js');
}
