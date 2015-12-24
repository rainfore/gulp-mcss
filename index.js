var through = require('through2');
var gutil = require('gulp-util');
var mcss = require('mcss');
var replaceExt = require('replace-ext');
var PluginError = gutil.PluginError;

var extend = function(o1, o2, override) {
    o1 = o1 || {};
    if (o2) {
        for (var i in o2) {
            if (o2.hasOwnProperty(i) && (override || o1[i] === undefined)) {
                o1[i] = o2[i];
            }
        }
    }
    return o1;
}

module.exports = function(opt) {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) return cb(null, file);
        if (file.isStream()) return cb(new PluginError('gulp_mcss', 'Streaming not supported'));

        var options = extend(opt, {
            filename: file.path
        });

        try {
            mcss(options).translate().done(function(text) {
                file.contents = new Buffer(text);
                file.path = replaceExt(file.path, '.css');
                cb(null, file);
            }).fail(function(err) {
                mcss.error.format(err);
                console.log(err.message);
                cb(null, file);
            });
        } catch (err) {
            cb(new PluginError('gulp_mcss', err));
        }
    });
};