var Utils = Utils || {};

/**
 * ロガー
 *
 * 出来る限りコンソールへログを出力しようとする。
 * コンソールオブジェクトがない場合はアラートで表示するかを選べる。
 * ログレベル設定が可能
 */
Utils.Logger = Utils.Logger || (function () {
    'use strict';
    var execOutput = true,
        execAlert = false,
        level = {
            'ERROR': 1,
            'WARN': 2,
            'INFO': 3,
            'DEBUG': 4
        },
        filter = 'INFO',
        outputLog,
        publicObj;

    outputLog = function outputLog(level, msg) {
        if (execOutput === true) {
            var date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                time = date.toLocaleTimeString(),
                milli = date.getMilliseconds(),
                logHeader;

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (milli < 10) {
                milli = '0' + milli;
            }
            if (milli < 100) {
                milli = '0' + milli;
            }

            logHeader = [year, '/', month, '/', day, ' ', time, '.', milli, ' [', level, ']'].join('');

            if (execAlert && typeof alert !== 'undefined') {
                alert(msg);
            } else {
                if (typeof opera !== 'undefined') {
                    if (typeof msg === 'object') {
                        opera.postError(logHeader);
                        opera.postError(msg);
                    } else {
                        opera.postError(logHeader + ' ' + msg);
                    }
                } else if (typeof console !== 'undefined') {
                    if (typeof msg === 'object') {
                        console.log(logHeader);
                        console.log(msg);
                    } else {
                        console.log(logHeader + ' ' + msg);
                    }
                }
            }
        }
    };

    publicObj = {
        enable: function enable() {
            execOutput = true;
            return publicObj;
        },
        disable: function disable() {
            execOutput = false;
            return publicObj;
        },
        logLevel: function logLevel(l) {
            if (!l) {
                return filter;
            }
            if (level[l] != null) {
                filter = l;
                return publicObj;
            } else {
                return publicObj;
            }
        },
        useAlert: function useAlert(flg) {
            execAlert = flg;
            return publicObj;
        },
        debug: function debug(msg) {
            if (level[filter] >= level.DEBUG) {
                outputLog('DEBUG', msg);
            }
            return publicObj;
        },
        info: function info(msg) {
            if (level[filter] >= level.INFO) {
                outputLog('INFO', msg);
            }
            return publicObj;
        },
        warn: function warn(msg) {
            if (level[filter] >= level.WARN) {
                outputLog('WARN', msg);
            }
            return publicObj;
        },
        error: function error(msg) {
            if (level[filter] >= level.ERROR) {
                outputLog('ERROR', msg);
            }
            return publicObj;
        }
    };
    return publicObj;
}());

