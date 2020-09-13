import { app } from './app';
import http from 'http';
import mongoose from 'mongoose';
import { createTerminus } from '@godaddy/terminus';
import { DBTools } from './util/dbTools';

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO URI must be defined');

  process.on('uncaughtException', (err) => {
    console.error(err);
    return process.exit(1);
  });
  process.on('unhandledRejection', (err) => {
    console.error(err);
    return process.exit(1);
  });

  const server = http.createServer(app);
  async function onSignal() {
    console.log('server is starting cleanup');
    await mongoose.connection.close();
    // start cleanup of resource, like databases or file descriptors
  }
  async function onHealthCheck() {
    return;
    // checks if the system is healthy, like the db connection is live
    // resolves, if health, rejects if not
  }
  function beforeShutdown() {
    return new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  }

  createTerminus(server, {
    signals: ['SIGINT', 'SIGTERM'],
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal,
    beforeShutdown,
  });

  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  mongoose.connection.on('close', () => {
    console.log('Mongoose connection closed');
    process.exit(1);
  });
  mongoose.connection.on('error', () => {
    console.log('Mongoose connection error');
    process.exit(1);
  });

  await DBTools.seedIfEmpty();

  server.listen(process.env.PORT, () =>
    console.log(`Server listen ${process.env.PORT} port`),
  );
};

start();
