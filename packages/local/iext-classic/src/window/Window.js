/**
 * @class iExt.window.Window
 * @extends {Ext.window.Window} 
 * @classdesc iExt 窗口类。
 */
Ext.define('iExt.window.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.ixwin',

    ui: 'ix-win-ui',
    cls: 'ix-win',
    shadow: true

});