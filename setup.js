/*
 * the scripts that are always necessary regardless of whether the
 * user is using the vle, authoring tool, or grading tool
 */
var coreScripts = [
	'vle/node/mysystem2/Mysystem2Node.js',
	'vle/node/mysystem2/mysystem2Events.js'
];

//the scripts used in the vle
var studentVLEScripts = [
	'vle/node/mysystem2/mysystem2.js',
	'vle/node/mysystem2/mysystem2State.js',
  // ,
  'vle/jquery/js/jquery-1.4.4.min.js',
  'vle/jquery/js/jquery-ui-1.8.7.custom.min.js'
];

//the scripts used in the authoring tool
var authorScripts = [
	'vle/node/mysystem2/authorview_mysystem2.js'
];

//the scripts used in the grading tool
var gradingScripts = [
	'vle/node/mysystem2/mysystem2State.js'
];

//dependencies when a file requires another file to be loaded before it
var dependencies = [
	{child:"vle/node/mysystem2/Mysystem2Node.js", parent:["vle/node/Node.js"]}
];

var nodeClasses = [
	{nodeClass:'display', nodeClassText:'Mysystem2'}
];

scriptloader.addScriptToComponent('core', coreScripts);
scriptloader.addScriptToComponent('mysystem', studentVLEScripts);
scriptloader.addScriptToComponent('author', authorScripts);
scriptloader.addScriptToComponent('studentwork', gradingScripts);
scriptloader.addDependencies(dependencies);

componentloader.addNodeClasses('Mysystem2Node', nodeClasses);

// var css = [
//          "vle/node/mysystem2/mysystem.css"
// ];

// scriptloader.addCssToComponent('mysystem', css);

var nodeTemplateParams = [
	{
		nodeTemplateFilePath:'node/mysystem2/mysystem2Template.my',
		nodeExtension:'my'
	}
];

componentloader.addNodeTemplateParams('Mysystem2Node', nodeTemplateParams);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/mysystem2/setup.js');
};
