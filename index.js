'use strict';

const path = require('path');
const through = require('through2');
const gutil = require('gulp-util');
const mcss = require('mcss');
const replaceExt = require('replace-ext');
const PluginError = gutil.PluginError;

module.exports = function (opt) {
    let program = through.obj((file, enc, cb) => {
        if (file.isNull())
            return cb(null, file);
        if (file.isStream())
            return cb(new PluginError('gulp_mcss', 'Streaming not supported'));

        const options = Object.assign({
            filename: file.path
        }, opt);

        let include;
        if (options.include) {
            if(!Array.isArray(opt.include)) opt.include = [opt.include];
            include = opt.include.map(function(p) {
                return path.resolve(process.cwd(), p);
            });
        }

        let exclude = opt.exclude ? new RegExp(opt.exclude, 'ig') : undefined;

        try {
            let instance = mcss(options);

            if (include) {
                instance.include(include);
            }
            
            if (exclude && exclude.test(file.path)) {
                return false;   
            }

            mcss(options).translate().done((text) => {
                file.contents = new Buffer(text);
                file.path = replaceExt(file.path, '.css');
                cb(null, file);
            }).fail((err) => {
                mcss.error.format(err);
                console.log(err.message);
                cb();
            });
        } catch (err) {
            cb(new PluginError('gulp_mcss', err));
        }
    });
    return program;
};
