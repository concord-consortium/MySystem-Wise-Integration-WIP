/**
 * Sets the Mysystem2Node type as an object of this view
 *jslint browser: true, maxerr: 50, indent: 4

 * @author npaessel
 */
/*globals View createBreak createElement eventManager*/

View.prototype.Mysystem2Node = {};
View.prototype.Mysystem2Node.commonComponents = ['Prompt', 'LinkTo'];

/**
 * Sets the view and content and then builds the page
 */
View.prototype.Mysystem2Node.generatePage = function(view){
  this.view = view;
  this.content = this.view.activeContent.getContentJSON();
  if (typeof this.content == 'undefined') {
    this.content = {};
  }

  this.buildPage();

  var iframe = createElement(document, 'iframe', {
    src: '/vlewrapper/vle/node/mysystem2/authoring/index.html',
    width: '99%',
    style: 'display: block; height: 100%;',
    id: 'mysystem2-authoring-iframe',
    onload: 'eventManager.fire("mysystem2AuthoringIFrameLoaded");'
  });

  var parent = document.getElementById('dynamicPage');
  parent.appendChild(iframe);
  parent.appendChild(this.getBuildInfoDiv());
};

var scoringFunction=function() {
  var frame = window.frames['previewFrame'];
  var mysystem = null;
  if (typeof frame !== 'undefined') {
    mysystem = frame.window.MySystem;
    if (typeof mysystem !== 'undefined') {
      mysystem.rubricController.displayScore();
    }
  }
};

View.prototype.Mysystem2Node.AuthoringIFrameLoaded = function(){
  var iframe = document.getElementById('mysystem2-authoring-iframe').contentWindow;
  
  iframe.MSA.setupParentIFrame(this.content, this, function (){
    /* fire source updated event */
    this.view.eventManager.fire('sourceUpdated');
  }, scoringFunction);
};

View.prototype.Mysystem2Node.getBuildInfoDiv = function() {
  var metaDiv             = createElement(document, 'div', {id: 'metaDiv', style: 'font-family: monospace; font-size: 9pt; white-space:pre; width: 100%; clear: both; margin: 4px; padding: 2px; overflow: hidden;'});
  var git_sha_div         = createElement(document, 'div', {id: 'git_sha_div'    }) ;
  var git_time_div        = createElement(document, 'div', {id: 'git_time_div'   }) ;
  var git_branch_div      = createElement(document, 'div', {id: 'git_branch_div' }) ;
  var sc_build_time_div   = createElement(document, 'div', {id: 'sc_build_time'  }) ;
  var sc_build_number_div = createElement(document, 'div', {id: 'sc_build_number'}) ;

  var git_sha         = document.createTextNode("commit sha  : d4c33da7fec616ab133dab584bda7844adacfe52 ");
  var git_time        = document.createTextNode("commit time : Mon Sep 24 17:08:31 2012 -0400 ");
  var git_branch      = document.createTextNode("git branch  : (HEAD, origin/berkeley_deployed, berkeley_deployed) ");
  var sc_build_time   = document.createTextNode("build time  : 2012-09-24 17:18:52 -0400 ");
  var sc_build_number = document.createTextNode("build no.   : 57e4500141f0558ba91cbb586caa13f1edf4eedc ");
  
  git_sha_div.appendChild(git_sha);
  git_time_div.appendChild(git_time);
  git_branch_div.appendChild(git_branch);
  sc_build_time_div.appendChild(sc_build_time);
  sc_build_number_div.appendChild(sc_build_number);

  metaDiv.appendChild(git_sha_div);
  metaDiv.appendChild(git_time_div);
  metaDiv.appendChild(git_branch_div);
  metaDiv.appendChild(sc_build_number_div);
  metaDiv.appendChild(sc_build_time_div);
  return metaDiv;
};

/**
 * Get the array of common components which is an array with
 * string elements being the name of the common component
 */
View.prototype.Mysystem2Node.getCommonComponents = function() {
  return this.commonComponents;
};

/**
 * Builds the html elements needed to author a my system node
 */
View.prototype.Mysystem2Node.buildPage = function(){
  var parent = document.getElementById('dynamicParent');

  /* remove any old elements */
  while(parent.firstChild){
    parent.removeChild(parent.firstChild);
  }

  /* create new elements */
  var pageDiv = createElement(document, 'div', {id: 'dynamicPage', style:'width:100%;height:100%'});
	var mainDiv = createElement(document, 'div', {id: 'mainDiv'});
  var instructionsText = document.createTextNode("When entering image filenames, make sure to use the asset uploader on the main authoring page to upload your images.");

  /* append elements */
  parent.appendChild(pageDiv);
  pageDiv.appendChild(mainDiv);
  mainDiv.appendChild(instructionsText);
  mainDiv.appendChild(createBreak());
  mainDiv.appendChild(document.createTextNode("Enter instructions -- text or html -- here."));
  mainDiv.appendChild(createBreak());
  mainDiv.appendChild(createElement(document, 'div', {id: 'promptContainer'}));
  mainDiv.appendChild(createBreak());
};

View.prototype.Mysystem2Node.populatePrompt = function() {
  $('#promptInput').val(this.content.prompt);
};

/**
 * Updates the html with the user entered prompt
 */
View.prototype.Mysystem2Node.updatePrompt = function(){
  //get the prompt content
  var promptContent = '';
  if(typeof tinymce != 'undefined' && $('#promptInput').tinymce()){
    promptContent = $('#promptInput').tinymce().getContent();
  } else {
    promptContent = $('#promptInput').val();
  }

  //set the prompt content
  this.content.prompt = promptContent;

  /* fire source updated event */
  this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates this content object when requested, usually when preview is to be refreshed
 */
View.prototype.Mysystem2Node.updateContent = function(){
  /* update content object */
  this.view.activeContent.setContent(this.content);
};

/* used to notify scriptloader that this script has finished loading */
if(typeof eventManager != 'undefined'){
  eventManager.fire('scriptLoaded', 'vle/node/mysystem2/authorview_mysystem2.js');
}
