/**
 * @class iExt.app.view.container.List
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 列表视图容器。
 */
Ext.define('iExt.app.view.container.List', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixlistcontainer',

    requires: [],

    cls: 'ix-list-container',
    bodyCls: 'ix-list-container-body',

    ixDefaultTitle: '列表',

    config: {
        /**
         * 视图集合
         */
        ixViews: null
    },

    applyIxDomain: function (domain) {
        var me = this;
        if (Ext.isString(domain)) {
            domain = Ext.create(domain);
        }
        if (domain && me.getIxViews() === null) {
            me.setIxViews(domain.ixListViews);
        }
        return domain;
    },

    initComponent: function () {
        var me = this;
        me._ixSetTopBar();
        me.callParent();
    },

    statics: {

        ixViewIconCls: {
            LIST: 'x-fa fa-list',
            CALENDAR: 'x-fa fa-calendar',
            GRAPH: 'x-fa fa-line-chart',
            KANBAN: 'x-fa fa-th-large',
            REPORT: 'x-fa fa-table'
        }

    },

    privates: {

        _ixCurrentView: null,

        _ixSetTopBar: function () {
            var me = this;

            me.tbar = {
                xtype: 'container',
                layout: 'column',
                items: []
            };

            var btnTypes = {
                xtype: 'segmentedbutton',
                allowToggle: true,
                listeners: {
                    toggle: {
                        fn: me._ixChangeView,
                        scope: me
                    }
                },
                items: []
            };
            var listType, iconCls, name;
            if (Ext.isArray(me.getIxViews())) {
                Ext.each(me.getIxViews(), function (item, index) {
                    listType = item.ixListType || 'list';
                    if (Ext.isString(listType)) {
                        listType = iExt.app.view.ListTypes.ixGetValue(listType.toUpperCase())
                    }
                    name = iExt.app.view.ListTypes.ixGetName(listType);
                    iconCls = iExt.app.view.container.List.ixViewIconCls[name];
                    btnTypes.items.push({
                        iconCls: iconCls,
                        value: index,
                        tooltip: iExt.app.view.ListTypes.ixGetText(listType)
                    });
                });
            }

            var tbrAction = {
                xtype: 'toolbar',
                reference: 'tbrAction',
                columnWidth: 0.5,
                items: ['->', btnTypes]
            };

            var tbrSearch = {
                xtype: 'toolbar',
                reference: 'tbrSearch',
                columnWidth: 0.5,
                items: [{
                    xtype: 'ixtagfilter',
                    flex: 1,
                    store: {
                        type: 'ixenumsstore',
                        ixEnumType: 'iExt.meta.Types'
                    }
                }]
            };

            me.tbar.items.push(tbrAction, tbrSearch);
        },

        _ixChangeView: function (item, button, isPressed, eOpts) {
            var me = this,
                idx = button.getValue();

            Ext.suspendLayouts();
            me.removeAll();
            me.add(me.ixViews[idx]);
            Ext.resumeLayouts(true);
        },

        _ixSetListAction: function () {

        },

        _ixSetKanbanAction: function () {

        },

        _ixSetGraphAction: function () {

        },

        _ixSetCalendarAction: function () {

        },

        _ixSetReportAction: function () {

        }

    }

});