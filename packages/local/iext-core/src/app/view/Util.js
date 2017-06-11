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
     * @param {String} viewName 视图名称。
     * @param {Object} config 视图的配置信息。
     * @return {Ext.Component} 创建的视图对象。
     */
    ixCreate: function (viewName, config) {
        if (!viewName) {
            Ext.raise('请指定要创建的视图！');
            return null;
        }
        var view = null;

        if (viewName.indexOf('.') < 0) {
            // 使用的是别名
            var alias = 'widget.' + viewName;
            var className = Ext.ClassManager.getNameByAlias(alias);
            if (!className) {
                Ext.raise('指定的视图 [' + viewName + '] 不存在！');
            } else {
                view = Ext.widget(viewName, config);
            }
        } else {
            // 使用的是完整类名
            var viewClass = Ext.ClassManager.get(viewName);
            if (!viewClass) {
                Ext.raise('指定的视图 [' + viewName + '] 不存在！');
            } else {
                view = Ext.create(viewName, config);
            }
        }

        return view;
    },

    /**
     * 根据名称获取视图的完整类名称。
     * @memberOf iExt.app.view.Util#
     * @param {String} viewName 视图名称。
     * @return {String} 完整类名称。
     */
    ixGetViewClass: function (viewName) {
        var viewClass;
        if (viewName.indexOf('.') < 0) {
            // 使用的是别名
            var alias = 'widget.' + viewName;
            viewClass = Ext.ClassManager.getNameByAlias(alias);
        } else {
            viewClass = Ext.ClassManager.get(viewName);
        }
        if (!viewClass) {
            Ext.raise('指定的视图 [' + viewName + '] 不存在！');
        }
        return viewClass;
    },

    /**
     * 打开视图
     * @param {Ext.Component} item 打开视图的组件
     * @param {String|Object} 视图类名称或者视图组件配置。
     * @param {String|iExt.action.ViewTarget} target 在哪里打开。
     * @param {Object} options 可选的参数。
     * 
     */
    ixOpenView: function (item, view, target, options) {
        // 根据字符串解析目标枚举值
        if (Ext.isString(target)) {
            target = iExt.action.ViewTarget.ixGetValue(target.toUpperCase());
        }
        target = target || iExt.action.ViewTarget.MAIN;
        options = options || {};
        options = Ext.applyIf(options, {
            target: target
        });
        item.fireEvent('ixopenview', item, view, options);
    },

    /**
     * 
     * @param {Object} component 组件。
     */
    ixClearValues: function (component) {
        var clear = function (items) {
            if (items && items.length > 0) {
                items.each(function (item) {
                    // 对于某些输入项可能不允许清除
                    // 例如：隐含的搜索条件。可以设置 ixClearable = false
                    if (item.setValue && item.ixClearable !== false) {
                        item.setValue(null);
                    }
                    clear(item.items);
                });
            }
        };
        clear(component.items);
    }

});