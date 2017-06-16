/**
 * @class iExt.app.view.container.Quick
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 快速查看视图容器。
 */
Ext.define('iExt.app.view.container.Quick', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixquickcontainer',

    requires: [],

    cls: 'ix-quick-container',
    bodyCls: 'ix-quick-container-body',

    /**
     * 缺省标题
     */
    title: '快速查看',

    initComponent: function () {
        var me = this;

        me.tools = [{
            iconCls: 'x-fa fa-chevron-right',
            tooltip: '隐藏',
            callback: me._ixHideMe
        }];
        me.tbar = {
            xtype: 'toolbar',
            items: [{
                xtype: 'ixtbrtitle',
                ixScale: 'medium',
                flex: 1,
                bind: {
                    text: '{ixvc.title}'
                }
            }, '->', {
                xtype: 'ixtbrholder',
                scale: 'small',
            }]
        };
        me.on('add', me._ixOnAdd);
        me.callParent();
    },

    privates: {

        _ixHideMe: function (owner, tool, e) {
            owner.hide();
        },

        _ixOnAdd: function (panel, component, index, eOpts) {
            if (component.isComponent === true && component.getTitle) {
                var me = this,
                    title = component.getTitle();
                var vm = this.getViewModel();
                vm.ixSetTitle(title);
            }
        }
    }

});