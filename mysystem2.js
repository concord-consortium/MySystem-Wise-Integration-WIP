/**
 * This is the constructor for the object that will perform the logic for
 * the step when the students work on it. An instance of this object will
 * be created in the .html for this step (look at mysystem.html)
 */
function Mysystem2(node,view) {
  this.node = node;
  this.content = node.getContent().getContentJSON();

  this.domIO = document.getElementById('my_system_state');

  if (node.studentWork != 'undefined' && node.studentWork != null) {
    this.states = node.studentWork; 
  } 
  else {
    this.states = [];
  }
  
  MySystem.registerExternalSaveFunction(this.save, this);
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
  
  // It turns out that sometimes when firebug is enabled and reloading
  // the page and switching back to the step: The SC.onReady.done method is never called
  // which should mean the jquery ready method is never called either.  
  // It seems this has to do with how the step iframe is setup. Its contents are injected
  // instead of loading it from a url.  So far the approach below seems to fix this problem
  // and not cause other problems.
  if(!SC.isReady) {
    SC.onReady.done();
  }

  var lastRenewal = 0;
  if (typeof eventManager != 'undefined') {
    // watch for changes to the student data and renew the session whenever it changes
    $('#my_system_state').bind("DOMSubtreeModified", function() {
      var now = new Date().getTime();
      if (now - lastRenewal > 15000) {  // only renew at most once every 15 seconds
        SC.Logger.log("renewing session");
        eventManager.fire('renewSession');
        lastRenewal = now;
      }
    });
  }

  if (this.content) {
    MySystem.loadWiseConfig(this.content,latestState);
  }
  if (latestState) {
    MySystem.updateFromDOM();
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

// this gets called as part of the window.onExit function, called by Wise2 when
// we leave a step, and allows us to perform any final or cleanup work before
// we save.
Mysystem2.prototype.preSave = function() {
  MySystem.preExternalSave();
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
  console.log("saving");
  console.log(response);
  
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
