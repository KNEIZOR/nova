import { app } from './app.js';
import { env } from './config/env.js';
import { prisma } from './lib/prisma.js';

const server = app.listen(env.PORT, '0.0.0.0', () => {
    console.log(`API started on port ${env.PORT}`);
});

async function shutdown() {
    await prisma.$disconnect();
    server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
