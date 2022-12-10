import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = (_: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res?.socket?.server?.io) {
    const io = new IOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('iotcar.action', ({ action }: { action: string }) => {
        socket.broadcast.emit('iotcar.status', {
          status: action,
          source: 'BROADCAST',
        });
        socket.emit('iotcar.status', { status: action, source: 'SELF' });
      });
    });
  }

  res.end();
};

export default SocketHandler;
