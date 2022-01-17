import fastify from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fastifyCors from 'fastify-cors'
import fastifyIO from 'fastify-socket.io'
import fastifyStatic from 'fastify-static'
import { join } from 'path'
import { createReadStream } from 'fs'
import { memoize } from '@todoguru/shared/common/utils/memoize'
import { clientOrigin, isDevelopment, isProduction } from '../../../common/constants'

export const getFastifyServer = memoize(() => {
  const server = fastify({
    ignoreTrailingSlash: true
  })
  
  server.register(fastifySwagger, {
    exposeRoute: isDevelopment,
    routePrefix: '/documentation',
  })
  server.register(fastifyCors, {
    origin: [clientOrigin],
    credentials: true,
  })
 
  server.register(fastifyIO, {
    cors: {
      origin: [clientOrigin],
      credentials: true,
    }
  })

  const filesDirectory = isProduction ? '/files' : join(process.cwd(), '../', 'frontend', 'dist');

  server.register((instance, opts, next) => {
    server.register(fastifyStatic, { root: filesDirectory });
    next();
  });

  server.setNotFoundHandler((req, reply) => {
    const fileStream = createReadStream(join(filesDirectory, 'index.html'));
    reply.type('text/html').send(fileStream);
  });
  
  server.ready(err => {
    if (err) throw err;
    if (isDevelopment) {
      server.swagger({  });
    }
  });

  return server
})
