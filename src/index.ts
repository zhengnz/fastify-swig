import * as fastifyPlugin from 'fastify-plugin';
import * as swig from 'swig';

function fastifySwig(fastify, opts, next) {
    fastify.decorateReply('locals', {});
    fastify.decorateReply('render', render);

    swig.setDefaults(opts.defaults);

    function render(view, options?) {
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

export default fastifyPlugin(fastifySwig, '>=0.30.2');