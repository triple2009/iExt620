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

    afterRender: function () {
        var me = this;
        if (me.getIxViews() !== null) {
            me._ixSetView(0);
        }
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

        _ixSetTopBar: function () {
            var me = this;

            me.tbar = {
                xtype: 'container',
                layout: 'column',
                items: []
            };

            var tbrAction = {
                xtype: 'toolbar',
                reference: 'tbrAction',
                columnWidth: 0.5,
                items: []
            };

            var domain = me.getIxDomain();
            if (domain.ixActions) {
                var acts = domain.ixActions;
                if (acts.add) {
                    tbrAction.items.push({
                        text: acts.add.ixName,
                        iconCls: acts.add.ixIconCls
                    });
                }

                var btnOthers = {
                    text: '操作',
                    iconCls: 'x-fa fa-bars',
                    menuAlign: 'tc-bc',
                    menu: {
                        xtype: 'ixactmenu',
                        items: []
                    }
                };

                for (var name in acts) {
                    if (acts.hasOwnProperty(name)) {
                        var action = acts[name];
                        btnOthers.menu.items.push({
                            text: action.ixName,
                            iconCls: action.ixIconCls
                        });
                    }
                }

                if (btnOthers.menu.items.length > 0) {
                    tbrAction.items.push('->', btnOthers);
                }

            }

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
                        listType = iExt.app.view.ListTypes.ixGetValue(listType.toUpperCase());
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

            // 缺省设置第一个视图
            if (btnTypes.items.length > 1) {
                btnTypes.items[0].pressed = true;
                tbrAction.items.push('->', btnTypes);
            }

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
            me._ixSetView(idx);
        },

        _ixSetView: function (idx) {
            var me = this;
            Ext.suspendLayouts();
            me.removeAll();
            var view = me.add(me.ixViews[idx]);
            var listType = view.ixListType || 'list';
            if (Ext.isString(listType)) {
                listType = iExt.app.view.ListTypes.ixGetValue(listType.toUpperCase());
            }
            switch (listType) {
                case iExt.app.view.ListTypes.KANBAN:
                    me._ixSetKanbanAction();
                    break;
                case iExt.app.view.ListTypes.GRAPH:
                    me._ixSetGraphAction();
                    break;
                case iExt.app.view.ListTypes.CALENDAR:
                    me._ixSetCalendarAction();
                    break;
                case iExt.app.view.ListTypes.REPORT:
                    me._ixSetReportAction();
                    break;
                default:
                    me._ixSetListAction();
                    break;
            }
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