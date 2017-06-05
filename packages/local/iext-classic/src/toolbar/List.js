/**
 * @class iExt.toolbar.List
 * @extends {iExt.toolbar.Action} 
 * @classdesc 列表工具栏控件。
 */
Ext.define('iExt.toolbar.List', {
    extend: 'iExt.toolbar.Action',
    alias: 'widget.ixlisttbr',

    requires: [
    ],

    cls: 'ix-list-tbr',

    /**
     * 根据列表选择的数据集合设置工具栏项目。
     * @memberOf iExt.toolbar.List#
     * @param {Obejct[]} selections 列表选择数据集合
     */
    ixSetAlignments: function (selections) {
        selections = selections || [];
        this._ixInnerSetAlignments(this.items, selections);
    },

    privates: {

        /**
         * 根据列表选择数据集合递归设置所有项目。
         * @memberOf iExt.toolbar.List#
         * @private
         * @param {Obejct[]} items 工具栏项目集合
         * @param {Obejct[]} selections 列表选择数据集合
         */
        _ixInnerSetAlignments: function (items, selections) {
            var me = this, multi = selections.length > 1;
            items.each(function (item) {
                if (item.ixIsAction !== true) { return; }
                item.ixSetAlignment(multi, selections);
                if (item.menu) {
                    me._ixInnerSetAlignments(item.menu.items, selections);
                }
            });
        }

    }

});