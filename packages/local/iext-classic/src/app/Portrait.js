/**
 * @class iExt.app.Portrait
 * @extends {Ext.Img} 
 * @classdesc 用户头像控件，只是提供了缺省的图片。
 */
Ext.define('iExt.app.Portrait', {
    extend: 'Ext.Img',
    alias: 'widget.ixportrait',

    requires: [],

    imgCls: 'ix-portrait',
    alt: '头像'

});
