"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastifyPlugin = require("fastify-plugin");
const swig = require("swig");
function fastifySwig(fastify, opts, next) {
    fastify.decorateReply('locals', {});
    fastify.decorateReply('render', render);
    swig.setDefaults(opts.defaults);
    function render(view, options) {
        let locals = Object.assign(options || {}, this.locals);
        const tpl = swig.compileFile(`${opts.views}/${view}.swig`);
        setContentTypeHeader(this);
        this.send(tpl(locals));
    }
    next();
}
function setContentTypeHeader(that) {
    if (!that.res.getHeader('content-type')) {
        that.header('Content-Type', 'text/html');
    }
}
exports.default = fastifyPlugin(fastifySwig, '>=0.30.2');
//# sourceMappingURL=index.js.map