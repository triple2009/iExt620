/**
 * @class iExt.app.view.Util
 * @classdesc 应用视图帮助类。
 */
Ext.define('iExt.app.view.Util', {
    alternateClassName: 'iExt.View',

    requires: [
        'iExt.util.Util'
    ],

    singleton: true,

    /**
     * 创建视图对象。
     * @memberOf iExt.app.view.Util#
     * @param {String} name 视图名称。
     * @param {Object} config 视图的配置信息。
     * @return {Ext.Component} 创建的视图对象。
     */
    ixCreate: function (name, config) {
        if (!name) {
            Ext.raise('请指定要创建的视图名称！');
            return null;
        }
        var view = null;
        if (name.indexOf('.') < 0) {
            // 使用的是别名
            var alias = 'widget.' + name;
            var className = Ext.ClassManager.getNameByAlias(alias);
            if (!className) {
                Ext.raise('指定的视图 [' + name + '] 不存在！');
            } else {
                view = Ext.widget(name, config);
            }
        } else {
            var viewClass = Ext.ClassManager.get(name);
            if (!viewClass) {
                Ext.raise('指定的视图 [' + name + '] 不存在！');
            } else {
                view = Ext.create(name, config);
            }
        }
        return view;
    },

    /**
     * 根据名称获取视图的完整类名称。
     * @memberOf iExt.app.view.Util#
     * @param {String} name 视图名称。
     * @return {String} 完整类名称。
     */
    ixGetViewClass: function (name) {
        var viewClass;
        if (name.indexOf('.') < 0) {
            // 使用的是别名
            var alias = 'widget.' + name;
            viewClass = Ext.ClassManager.getNameByAlias(alias);
        } else {
            viewClass = Ext.ClassManager.get(name);
        }
        if (!viewClass) {
            Ext.raise('指定的视图 [' + name + '] 不存在！');
        }
        return viewClass;
    }

});