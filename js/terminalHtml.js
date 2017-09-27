var helpPage=[
	'%CS%+r Terminal Help %-r%n',
	'  This is a test for show you my cv in a clean way.',
	'  Use one of the following commands:',
	'     clear .... clear the terminal',
	'     exit ..... close the terminal (or <ESC>)',
	'     help ..... show this help page',
	'     aboutyou.... learn somethings about me',
	'     education ..... show where I graduate',
	'     experience ..... show my experience on work world',
	'     thecnology ..... show the thecnology  I\'m comfortable with',
	'     contacts ..... show my contacts on a new window ',
	'	  terminal ..... show more about this terminal ',
	'  other input will be echoed to the terminal.',
	' '
];

var aboutTerminalPage=[
	'%CS%+r About this terminal%-r%n',
	' This terminal wasn´t made totally by me: Reinvent the wheel, for what?',
    ' This terminal is based on:',
	'Norbert Landsteiner / Vienna, Aug 2005 - Jan 2010',
    'mass:werk - media environments',
    '<http://www.masswerk.at>',
    'See web site for contact information.'
	];


var aboutMePage=[
          '%CS%+r About me %-r%n',
'With my experience, so far, I\'ve three rules:',
'- It\'s not necessary to reinvent the wheel, search how to do it!',
'- I\'m not a castle builder, I do not build a big castle stone by stone: If I want to build something,',
'I build the smallest castle and after that I build a castle bigger than before.',
'- You do not know everything, and I do not know anything (you and I are interchangable).'
		  ];
		  
var experiencePage =[
'%CS%+r My experience %-r%n',
'Since Nov/2015',
' -Developing Web application of classification for hospital inpatient care',
'Since Nov/2014:',
' -Developing Web application of registration and consulting of health providers',
'Since Dec/2012 to Nov/2014',
' -Researching about new methods of analysis of Ressonance Magnectic images',
]

		  
var thecnologyPage =[
'%CS%+r Thecnology and plataform%-r%n',
'*Java 7 and Eclipse IDE',
'  -2,5 years of experience, learned while graduating but improved at work experience',
'*Oracle SQL and PL/SQL',
'  -2,5 years of experience, learned while graduating but improved at work experience',
'*Wicket Apache:',
'  -2 years of experience, learned while developing the web application',
'*HTML, CSS and JavaScript',
'  -2 years of experience, learned while graduating but improved at work experience, and at some hobbies',
]


var typeHelp = [
'Press `help` to help page'
]
var term = new Array();

function termOpen(n) {
	if (termToSet) return; // do not open while there is modal dialog
	n = parseInt(n);
	if ((!n) || (isNaN(n))) n = 1;
	var termid = 'terminal'+n;
	if (!term[n]) {
		term[n] = new Terminal(
			{
				x: 0,
				y: 0,
				id: n,
				termDiv: 'termDiv'+n,
				frameWidth: 1,
				frameColor: '#aaaaaa',
				bgColor: '#eeeeee',
				greeting: 'Terminal is ready. Press `help` to help page',
				handler: termHandler,
				exitHandler: termChromeHide
			}
		);
		term[n].colorsetting=1;
		if (term[n]) {
			termChromeShow(n);
			term[n].open();
		}
	}
	else if (term[n].closed) {
		termSetChromeState(n, true);
		termChromeShow(n);
		term[n].open();
	}
	else {
		termSetChromeState(n, true);
	}
	termBringToFront(n);
}

function termHandler() {
	this.newLine();
	var cmd = this.lineBuffer;
	if (cmd != '') {
		if (cmd=='clear') {
			this.clear();
		}
		else if (cmd=='exit') {
			this.close();
		}
		else if (cmd=='help') {
			this.write(helpPage);
		}
		else if (cmd=='terminal') {
			this.write(aboutTerminalPage);
			this.newLine();
			this.write(typeHelp);
		}
		else if (cmd == 'about_you') {
			this.write(aboutMePage);
			this.newLine();
			this.write(typeHelp);
		}
		else if (cmd == 'experience') {
			this.write(experiencePage);
			this.newLine();
			this.write(typeHelp);
		}
		else if (cmd == 'thecnology') {
			this.write(thecnologyPage);
			this.newLine();
			this.write(typeHelp);
		}
		else if (cmd == 'contacts') {
		this.type('You typed: '+cmd);
		this.newLine();
		this.type('Wait 5 seconds, you will be redirect to contact page. ');
		window.setTimeout(function(){
				window.location.href = "contact.html";
		}, 5000);		}
		else {
			this.type('You typed: '+cmd);
			this.newLine();
			this.write(typeHelp);
		}
		
	}
	this.prompt();
}

function termSetChromeState(n, v) {
	var header = 'termHeader'+n;
	var classname = (v)? 'termHeaderActive':'termHeaderInactive';
	if (document.getElementById) {
		var obj = document.getElementById(header);
		if (obj) obj.className = classname;
	}
	else if (document.all) {
		var obj = document.all[header];
		if (obj) obj.className = classname;
	}
	
}

function termChromeShow(n) {
	var div = 'terminal'+n;
	TermGlobals.setElementXY(div, 210+n*20, 200+n*20);
	TermGlobals.setVisible(div,1);
	if (document.getElementById) {
		var obj = document.getElementById(div);
		if (obj) obj.className = 'termShow';
	}
	else if (document.all) {
		var obj = document.all[div];
		if (obj) obj.className = 'termShow';
	}
}

function termChromeHide() {
	var div='terminal'+this.id;
	TermGlobals.setVisible(div,0);
	if (document.getElementById) {
		var obj = document.getElementById(div);
		if (obj) obj.className = 'termHidden';
	}
	else if (document.all) {
		var obj = document.all[div];
		if (obj) obj.className = 'termHidden';
	}
	if (termToSet==this.id) closeSettings(0);
}

function termClose(n) {
	if ((term[n]) && (term[n].closed == false)) term[n].close();
}

function termBringToFront(n) {
	for (var i=1; i<term.length; i++) {
		if ((n!=i) && (term[i])) {
			var obj=(document.getElementById)? document.getElementById('terminal'+i):document.all['terminal'+i];
			if (obj) obj.style.zIndex=1;
			termSetChromeState(i, false);
		}
	}
	var obj=(document.getElementById)? document.getElementById('terminal'+n):document.all['terminal'+n];
	if (obj) obj.style.zIndex=2;
	termSetChromeState(n, true);
	term[n].focus();
}

var termToSet=0;

// function termConfigure(n) {
	// var t=term[n];
	// if (parseFloat(t.version)<1.03) {
		// alert('This utility requires termlib.js 1.03 or better.');
		// return;
	// }
	// var color = t.colorsetting;
	// termToSet = n;
	// var f=document.forms.settingvalues;
	// f.rows.value=t.conf.rows;
	// f.cols.value=t.conf.cols;
	// f.color[color-1].checked=true;
	// var div='settingsdialog';
	// TermGlobals.setVisible(div,1);
	// if (document.getElementById) {
		// var obj = document.getElementById(div);
		// if (obj) obj.className = 'termShow';
	// }
	// else if (document.all) {
		// var obj = document.all[div];
		// if (obj) obj.className = 'termShow';
	// }
	// var td='terminal'+n;
	// objs = (document.getElementById)? document.getElementById(td):document.all[td];
	// if (obj) TermGlobals.setElementXY(div, parseInt(objs.style.left)+26, parseInt(objs.style.top)+26);
	// TermGlobals.keylock=true;
// }

function closeSettings(state) {
	var t=term[termToSet];
	if (state) {
		var f=document.forms.settingvalues;
		var color = 1
		if (f.color[1].checked) color=2
		else if (f.color[2].checked) color=3
		else if (f.color[3].checked) color=4;
		var rows = parseInt(f.rows.value);
		var cols = parseInt(f.cols.value);
		if ((isNaN(rows)) || (rows<2) || (isNaN(cols)) || (cols<4)) {
			rows=t.conf.rows;
			cols=t.conf.cols;
		}
		var changed=((rows==t.conf.rows) && (cols==t.conf.cols) && (color==t.colorsetting))? false:true;
		t.colorsetting=color;
		var rstring= 'New Settings: Terminal set to '+rows+' rows, '+cols+' cols, ';
		if (color==1) {
			t.conf.bgColor='#eeeeee';
			t.conf.fontClass='term';
			rstring+='black on white.';
		}
		else if (color==2) {
			t.conf.bgColor='#181818';
			t.conf.fontClass='term2';
			rstring+='white on black.';
		}
		else if (color==3) {
			t.conf.bgColor='#181818';
			t.conf.fontClass='term3';
			rstring+='green on black.';
		}
		else if (color==4) {
			t.conf.bgColor='#779977';
			t.conf.fontClass='term4';
			rstring+='black on green.';
		}
		if (changed) {
			t.cursorOff();
			t.conf.rows=t.maxLines=rows;
			t.conf.cols=t.maxCols=cols;
			t.rebuild();
			t.newLine();
			t.write(rstring);
			t.prompt();
		}
	}
	var div='settingsdialog';
	TermGlobals.setVisible(div,0);
	if (document.getElementById) {
		var obj = document.getElementById(div);
		if (obj) obj.className = 'termHidden';
	}
	else if (document.all) {
		var obj = document.all[div];
		if (obj) obj.className = 'termHidden';
	}
	termToSet = 0;
	TermGlobals.keylock=false;
}

function settingsSetColor(n) {
	document.forms.settingvalues.elements.color[n-1].checked=true;
}

// simple drag & drop

var dragobject=null;
var dragOfsX, dragOfsY;
var lastX, lastY;

function drag(e) {
	if (dragobject!=null) {
		if (window.event) e = window.event;
		var x = (typeof e.clientX != 'undefined')? e.clientX:e.pageX;
		var y = (typeof e.clientY != 'undefined')? e.clientY:e.pageY;
		dragobject.style.left=x+dragOfsX-lastX;
		dragobject.style.top=y+dragOfsY-lastY;
	}
}

function dragStart(e) {
	if (window.event) e = window.event;
	lastX = (typeof e.clientX != 'undefined')? e.clientX:e.pageX;
	lastY = (typeof e.clientY != 'undefined')? e.clientY:e.pageY;
}

function dragTerm(n) {
	termBringToFront(n)
	var div='terminal'+n;
	dragobject = (document.getElementById)? document.getElementById(div):document.all[div];
	dragOfsX = parseInt(dragobject.style.left);
	dragOfsY = parseInt(dragobject.style.top);
}

function dragRelease(e) {
	dragobject=null;
}
