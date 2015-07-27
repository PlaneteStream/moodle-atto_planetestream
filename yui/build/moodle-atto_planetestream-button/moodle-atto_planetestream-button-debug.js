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
            var strembedcode = e.data;
            if (strembedcode.indexOf("rt=2") != -1) {
                strembedcode = strembedcode + '&extended=true';
            }
            me._insertContent('<iframe style="width: '
 + me.get('estream_width') + 'px; height: '
 + me.get('estream_height') + 'px; border: 0" src="'
 + me.get('estream_url') + '/Embed.aspx?' + strembedcode + '"></iframe><a href="'
 + '/_planetestreamiframe_/Embed.aspx?' + strembedcode + '">&nbsp;</a>');
        }, false);
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
            contentinserted = true;
        }
    },
    /**
     * Display the Planet eStream dialogue.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function (e) {
        e.preventDefault();
        contentinserted = false;
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
        html.append('<form class="atto_form"><div class="mdl-align">'
 + '<iframe style="border: 0px; width: ' + (parseInt(width, 10) - 78) + 'px;'
 + 'height: ' + (parseInt(height, 10) - 65) + 'px;" src="' + this.get('estream_url')
 + this.get('estream_path') + '&td=' + window.location.protocol + '//' + window.location.host + ':'
 + (window.location.port === '' ? '80' : window.location.port) + '"></iframe></div></form>');
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
        }
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
