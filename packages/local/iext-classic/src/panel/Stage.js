/**
 * @class iExt.panel.Stage
 * @extends {Ext.panel.Panel} 
 * @classdesc 看板阶段容器。
 */
Ext.define('iExt.panel.Stage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixstagepanel',

    requires: [],

    config: {
        /**
         * 是否是交替行
         */
        ixAlt: false
    },

    flex: 1,
    border: false,
    scrollable: 'y',
    defaults: {
        margin: '5 10 5 10'
    },
    tools: [{
        type: 'plus'
    }],

    initComponent: function () {
        var me = this;

        me.callParent();
    },

    applyIxAlt: function (alt) {
        var me = this;
        if (alt === true) {
            me.cls = 'ix-stage-panel-alt';
        } else {
            me.cls = 'ix-stage-panel';
        }
        return alt;
    }

});