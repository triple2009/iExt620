/**
 * @mixin iExt.mixin.Workspace
 * @classdesc 工作区 MIXIN。
 * 控制器虽然可以监听到事件，但是处理方式还是由视图决定
 * 所以不能在工作区的控制器中进行处理
 */
Ext.define('iExt.mixin.Workspace', {
    extend: 'iExt.mixin.View',

    mixinConfig: {
        id: 'iext-view-ws'
    },

    ixIsWorkspace: true,

    /**
     * 打开视图
     */
    ixOpenView: iExt.unimplFn,

    /**
     * 打开页面
     */
    ixOpenPage: iExt.unimplFn,

    /**
     * 显示提示消息
     * 工作区会有不同的布局方式，可能会在工作区内显示提示消息
     * 例如：可以设置一个状态栏，显示提示性信息
     */
    ixShowTip: function (msg) {
        iExt.Toast.ixInfo(msg);
        return true;
    }

});