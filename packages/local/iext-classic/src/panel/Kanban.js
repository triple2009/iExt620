/**
 * @class iExt.panel.Kanban
 * @extends {Ext.panel.Panel} 
 * @classdesc 应用程序列表。
 */
Ext.define('iExt.panel.Kanban', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixkanbanpanel',

    cls: 'ix-kaban-panel',
    referenceHolder: true,

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        pageSize: 15,
        itemConfig: {
            cls: 'ix-kanban-item',
            minHeight: 80
        }
    },

    config: {
        /**
         * 阶段集合 {String|Object}
         * String：表示枚举类型
         * Object：表示阶段配置对象{1:'有效',2:'无效'}
         */
        ixStages: null,
        /**
         * 阶段字段名称，用于处理所属阶段
         */
        ixStageField: '',
        /**
         * 阶段面板最小宽度
         */
        ixStageMinWidth: null,
        /**
         * 是否允许收缩和展开
         */
        ixCollapsible: false,
        /**
         * 数据源 {Object}
         * 数据源对象{type: ''}
         */
        ixStore: null,
        /**
         * 看板项模板
         * 使用 Ext.Component 做为组件显示
         */
        ixItemTpl: null
    },

    /**
     * 分页大小
     * 0 表示不分页
     */
    ixPageSize: null,
    /**
     * 看板项配置信息
     * 参见 Ext.Component 的配置项
     */
    ixItemConfig: null,

    /**
     * 看板项点击事件。
     * @memberOf iExt.panel.Kanban#
     * @event ixitemclick
     * @param {iExt.panel.Kanban} this 看板组件
     * @param {Ext.Component} item Ext.Component 组件
     * @param {Object} data 看板项数据。
     */

    scrollable: 'x',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },

    defaults: {
        xtype: 'ixstagepanel'
    },

    constructor: function (config) {
        var me = this;
        if (Ext.isEmpty(me.ixPageSize)) {
            me.ixPageSize = me.ixTheme.pageSize;
        }
        if (Ext.isEmpty(me.ixItemConfig)) {
            me.ixItemConfig = me.ixTheme.itemConfig;
        } else {
            me.ixItemConfig = me.ixItemConfig || {};
            Ext.applyIf(me.ixItemConfig, me.ixTheme.itemConfig);
        }
        me.callParent();
    },

    initComponent: function () {
        var me = this,
            store = me.getIxStore();

        if (store && me.ixPageSize > 0) {
            if (me.bbar) {
                Ext.apply(me.bbar, {
                    ixStore: store
                });
            } else {
                me.bbar = {
                    xtype: 'ixpagetbr',
                    ixStore: store
                };
            }
        }

        var stages = me.getIxStages(),
            collapsible = me.getIxCollapsible(),
            minWidth = me.getIxStageMinWidth();
        balt = false;

        me.items = [];
        Ext.each(stages, function (stage) {
            var panel = {
                title: stage.text,
                ixAlt: balt,
                ixCollapsible: collapsible,
                reference: '__ixStage_' + stage.value
            };
            if (!Ext.isEmpty(minWidth)) {
                Ext.apply(panel, {
                    minWidth: minWidth
                });
            }
            me.items.push(panel);
            balt = !balt;
        });

        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this,
            store = me.getIxStore();
        var records = store.getRange(0);
        me.callParent(arguments);
        me._ixRenderItems(records);
    },

    applyIxStages: function (stages) {
        if (Ext.isString(stages)) {
            var enums = Ext.ClassManager.get(stages);
            if (enums) {
                var list = enums.ixList();
                stages = [];
                Ext.each(list, function (item) {
                    stages.push({
                        value: item[enums.ixValueProperty],
                        text: item[enums.ixTextProperty]
                    });
                });
            } else {
                Ext.raise('指定的枚举类型 [' + stages + '] 不存在!');
            }
        } else if (Ext.isObject(stages)) {
            var obj = Ext.clone(stages);
            stages = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    stages.push({
                        value: p,
                        text: obj[p]
                    });
                }
            }
        } else {
            Ext.raise('无效的阶段配置信息!');
        }
        return stages;
    },

    applyIxStore: function (store) {
        var me = this;
        if (Ext.isObject(store)) {
            // 指定的数据源
            store = Ext.apply(store, {
                pageSize: me.ixPageSize
            });
            store = Ext.data.StoreManager.lookup(store || 'ext-empty-store');
        }
        store.on('load', me._ixOnDataLoad, me);
        return store;
    },

    privates: {

        _ixOnDataLoad: function (store, records, successful, operation, eOpts) {
            if (successful) {
                this._ixRenderItems(records);
            }
        },

        _ixRenderItems: function (records) {
            var me = this,
                record, ref, stagePanel,
                stageField = me.getIxStageField(),
                refs = me.getReferences(),
                itemConfig = me.ixItemConfig,
                itemTpl = me.getIxItemTpl();

            Ext.suspendLayouts();
            me.items.each(function (item) {
                item.removeAll(true);
            });

            Ext.each(records, function (record) {
                ref = record.get(stageField);
                ref = '__ixStage_' + ref;
                stagePanel = refs[ref];
                var cmp = {
                    xtype: 'box',
                    renderTpl: itemTpl,
                    renderData: record.data,
                    listeners: {
                        click: {
                            element: 'el',
                            fn: function () {
                                me._ixItemClick(this, record.data);
                            },
                            scope: me
                        }
                    }
                };
                Ext.applyIf(cmp, itemConfig);
                stagePanel.add(cmp);
            });
            Ext.resumeLayouts(true);
        },

        _ixItemClick: function (item, data) {
            var me = this;
            me.fireEvent('ixitemclick', me, item, data);
        }
    }

});