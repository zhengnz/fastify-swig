import * as fastify from 'fastify';

interface Options {
    [props: string]: any
}

declare module 'fastify' {
    namespace fastify {
        interface FastifyReply {
            render(filename: string, opts?: Options): void
        }
    }
}