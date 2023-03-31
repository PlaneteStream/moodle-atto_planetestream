YUI.add('moodle-atto_planetestream-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
/*
 * @package    atto_planetestream
 * @copyright  Planet Enterprises Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
/**
 * @module moodle-atto_planetestream
 */
/**
 * Atto media selection tool.
 *
 * @namespace M.atto_planetestream
 * @class Button
 * @extends M.editor_atto.EditorPlugin
 */
var eventMethod, messageEvent, me, width = 1000, height = 700, html, contentinserted;
Y.namespace('M.atto_planetestream').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function () {
        if (this.get('disabled')) {
            return;
        }
        this.addButton({
            icon: 'button',
            iconComponent: 'atto_planetestream',
            title: 'pluginname',
            buttonName: 'button',
            callback: this._displayDialogue
        });
    },
    /**
     * Listen for the insert window event.
     *
     * @method _listen
     * @private
     */
    _listen: function () {
        if (window.addEventListener) {
            eventMethod = 'addEventListener';
            messageEvent = 'message';
        } else if (window.postMessage) {
            eventMethod = 'attachEvent';
            messageEvent = 'onmessage';
        } else {
            me._insertContent('Sorry, your web-browser is not compatible with this feature.');
        }
        var evX = window[eventMethod];
        evX(messageEvent, function (e) {
			
			  e.target.removeEventListener(e.type, arguments.callee);
			
					if (e.data.indexOf("ID=") > -1) {
	    if (e.data.indexOf("&source=moodle") > -1 || e.data.indexOf("&source=Moodle") > -1) {
			
		var pagetype = me.get('pagetype');
			
			if (pagetype == 'mod-assign-editsubmission' || pagetype == 'mod-assign-gradingpanel') { // iFrames will be stripped out of assign subs
				
					var data = e.data;
					
					var title = me._getQS(data, "title");
						title = title.split("+").join(" ");
					
				
				if (e.data.indexOf("delta=") > -1) {
					
					me._insertContent('<a href="'
 + me.get('estream_url') + '/View.aspx?' + e.data + '" target="_blank">' + title + '</a><br><br>');
					
				} else {
					
					me._insertContent('<a href="'
 + me.get('estream_url') + '/View.aspx?' + e.data + '&delta=ESDLTA" target="_blank">' + title + '</a><br><br>');
					
				}
				
				} else {
					
						if (me.get('estream_width') == 0 && me.get('estream_height') == 0) {
							
							if (e.data.indexOf("delta=") > -1) {
								
								  me._insertContent('<div style="position:relative;overflow:hidden;padding-top:56.25%;"><iframe allow="autoplay; fullscreen" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" src="'
 + me.get('estream_url') + '/Embed.aspx?' + e.data + '"></iframe><a href="'
 + '/_planetestreamiframe_/Embed.aspx?' + e.data + '">&nbsp;</a></div>');
								
							} else {
								
								  me._insertContent('<div style="position:relative;overflow:hidden;padding-top:56.25%;"><iframe allow="autoplay; fullscreen" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" src="'
 + me.get('estream_url') + '/Embed.aspx?' + e.data + '&delta=ESDLTA"></iframe><a href="'
 + '/_planetestreamiframe_/Embed.aspx?' + e.data + '&delta=ESDLTA">&nbsp;</a></div>');
								
							}
										  
 
		} else {
			
				if (e.data.indexOf("delta=") > -1) {
					
					      me._insertContent('<iframe allow="autoplay; fullscreen" allowfullscreen style="width: '
 + me.get('estream_width') + 'px; height: '
 + me.get('estream_height') + 'px; border: 0" src="'
 + me.get('estream_url') + '/Embed.aspx?' + e.data + '"></iframe><a href="'
 + '_planetestreamiframe_/Embed.aspx?' + e.data + '"></a>');
					
				} else {
					
					      me._insertContent('<iframe allow="autoplay; fullscreen" allowfullscreen style="width: '
 + me.get('estream_width') + 'px; height: '
 + me.get('estream_height') + 'px; border: 0" src="'
 + me.get('estream_url') + '/Embed.aspx?' + e.data + '&delta=ESDLTA"></iframe><a href="'
 + '_planetestreamiframe_/Embed.aspx?' + e.data + '&delta=ESDLTA"></a>');
					
				}
					      
 
		}
					
				}
			
 
			}
			}

        }, false);
		//window.removeEventListener('message', 'onmessage');
		
		//<p>' + me.get('estream_height') + me.get('estream_width') + '</p>
    },
    /**
     * Insert the Planet eStream content.
     *
     * @method _insertContent
     * @private
     */
    _insertContent: function (content) {
        if (!contentinserted) {
            me.getDialogue().hide();
            me.editor.focus();
            me.get('host').insertContentAtFocusPoint(content);
            me.markUpdated();
           // contentinserted = true;
        }
    },
	_getQS: function(query, variable) {
		var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return "Response";
	},
    /**
     * Display the Planet eStream dialogue.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function (e) {
        e.preventDefault();
        var dialogue = this.getDialogue({
            headerContent: 'Insert Planet eStream Item',
            width: width + 'px',
            height: height + 'px'
        });
        if (dialogue.width !== width + 'px') {
            dialogue.set('width', width + 'px');
        }
        if (dialogue.width !== height + 'px') {
            dialogue.set('height', height + 'px');
        }
        html = Y.Node.create('<div></div>');
        html.append('<form class="atto_form"><div class="mdl-align" style="overflow:auto;-webkit-overflow-scrolling:touch;">'
 + '<iframe allow="microphone; camera; display-capture;" id="ifestream" style="border: 0px; width: ' + (parseInt(width, 10) - 78) + 'px;'
 + 'height: ' + (parseInt(height, 10) - 65) + 'px;" src="' + this.get('estream_url')
 + this.get('estream_path') + '&td=' + window.location.protocol + '//' + window.location.host + ':'
 + ((window.location.port === '80' && window.location.protocol==='http')|
 (window.location.port === '443' && window.location.protocol==='https') 
 ? '' : window.location.port) + '"></iframe></div></form>');
        dialogue.set('bodyContent', html);
        dialogue.show();
        this.markUpdated();
        me = this;
        me._listen();
    }
}, {
    ATTRS: {
        /**
         * Define the attributes used by the plugin.
         */
        disabled: {
            value: false
        },
        usercontextid: {
            value: null
        },
        estream_url: {
            value: ''
        },
        estream_path: {
            value: ''
        },
        estream_height: {
            value: ''
        },
        estream_width: {
            value: ''
        },
		pagetype: {
            value: ''
        }
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
