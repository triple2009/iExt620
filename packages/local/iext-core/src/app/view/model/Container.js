/**
 * @class iExt.app.view.model.Container
 * @extends {Ext.app.ViewModel} 
 * @classdesc iExt 视图容器ViewModel。
 */
Ext.define('iExt.app.view.model.Container', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ixviewcontainer',

    ixIsContainerViewModel: true,

    data: {
        /**
         * 视图容器数据
         * 其他视图定义的数据不能以ix开头
         */
        ixvc: {
            /**
             * 标题
             */
            title: '',

            /**
             * 缺省标题
             */
            defaultTitle: ''
        }
    },

    formulas: {

        /**
         * 视图容器标题。
         * 如果指定了标题则使用该标题，否则使用缺省标题。
         */
        ixvcTitle: function (get) {
            return get('ixvc.title') || get('ixvc.defaultTitle');
        }

    },

    /**
     * 设置标题的快捷方式
     */
    ixSetTitle: function (title) {
        this.setData({
            ixvc: {
                title: title
            }
        });
    },

    /**
     * 设置缺省标题的快捷方式
     */
    ixSetDefaultTitle: function (title) {
        this.setData({
            ixvc: {
                defaultTitle: title
            }
        });
    }

});