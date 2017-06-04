﻿/**
 * @class iExt.action.Base
 * @classdesc 用户操作动作基础类。
 */
Ext.define('iExt.action.Base', {
    alternateClassName: 'iExt.Action',
    alias: 'ixaction.auto',
    aliasPrefix: 'ixaction.',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    factoryConfig: {
        /**
         * 缺省是打开视图的操作
         */
        defaultType: 'view'
    },

    /**
     * 用户操作动作的代码，例如：'add'
     * 触发事件时可以根据该代码进行不同的处理
     */
    ixCode: null,

    /**
     * 用户操作动作的名称，例如：'新建'
     */
    ixName: null,

    /**
     * 需要的授权操作
     * {ixService:'user', ixOperation:'add'}
     * 'add'，字符串形式下，采用所属领域的领域代码
     */
    ixAuth: null,

    /**
     * 允许多选操作
     * 缺省是 false
     */
    ixMulti: false,

    /**
     * 允许指定该动作的限制条件
     */
    ixEnableWhen: null,

    /**
     * 参数信息
     * TODO 格式：
     */
    ixParams: null,

    /**
     * 自动关闭当前的视图
     */
    ixClose: null,

    /**
     * 回调函数
     * {fn: function(item, success), scope: me}
     */
    ixCallback: null,

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    },

    /**
     * 操作是否可用 function ()
     */
    ixIsEnabled: iExt.unimplFn,

    /**
     * 执行动作
     */
    ixDo: iExt.unimplFn

});