import { useCallback, useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';

let socket: undefined | Socket;

let actionTimer: number | null = null;

export default function Client() {
  const [carStatus, setCarStatus] = useState('CONNECTING');
  const [cameraStatus, setCameraStatus] = useState('CONNECTING');
  const [socketStatus, setSocketStatus] = useState('CONNECTING');

  const cleanupInterval = useCallback(() => {
    if (actionTimer) {
      window.clearInterval(actionTimer);
    }
    actionTimer = null;
  }, []);

  const socketInitializer = async () => {
    fetch('/api/v1/socket');
    socket = io();

    socket.on('connect', () => {
      setSocketStatus('CONNECTED');
    });

    socket.on('disconnect', () => {
      setSocketStatus('DISCONNECTED');
      cleanupInterval();
    });

    socket.on('iotcamera.status', ({ status }: { status: string }) => {
      setCameraStatus(status);
    });

    socket.on(
      'iotcar.status',
      ({
        status,
        source,
      }: {
        status: string;
        source: 'BROADCAST' | 'SELF';
      }) => {
        if (source === 'BROADCAST') {
          cleanupInterval();
        }
        setCarStatus(status);
      }
    );
  };

  useEffect(() => {
    if (socket) {
      return;
    }
    socketInitializer();
  }, [socket]);

  const onMouseUp = useCallback(
    (carAction: 'LEFT' | 'RIGHT' | 'FORWARD' | 'BACKWARD') => {
      cleanupInterval();
      actionTimer = window.setInterval(() => {
        socket?.emit('iotcar.action', { action: carAction });
      }, 200);
      socket?.emit('iotcar.action', { action: carAction });
    },
    []
  );

  return (
    <div className="h-screen w-screen bg-slate-600">
      <div className="grid grid-flow-col justify-items-center text-center">
        <div className="mx-auto flex">
          <h1 className="text-3xl font-bold text-[#01845e]">IOT CAR</h1>
          <img
            className="h-24 w-24"
            src="/assets/images/web-portal/rc-car-chasis.png"
            alt="RC Car 4WD"
          />
        </div>
      </div>
      <div className="grid justify-items-center">
        <div className="border-4 border-dotted bg-sky-500/75 p-5">
          <div className="flex justify-between">
            <span className="text-gray-300">Camera: {cameraStatus}</span>
            <span className=" text-red-300">Car status: {carStatus}</span>
            <span className=" text-red-300">Socket: {socketStatus}</span>
          </div>
          <img
            className="w-full"
            src="/assets/images/web-portal/no-feed.jpg"
            alt="Cam Feed"
          />
        </div>
      </div>
      <div className="mt-5 grid justify-items-center">
        <div>
          <button
            className="mb-2 rounded-lg bg-red-500/75 p-5"
            onMouseUp={() => onMouseUp('FORWARD')}
          >
            FORWARD
          </button>
        </div>
        <div>
          <button
            className="rounded-lg bg-red-500/75 p-5"
            onMouseUp={() => onMouseUp('LEFT')}
          >
            LEFT
          </button>
          <button
            className="ml-10 rounded-lg bg-red-500/75 p-5"
            onMouseUp={() => onMouseUp('RIGHT')}
          >
            RIGHT
          </button>
        </div>
        <div>
          <button
            className=" mt-2 rounded-lg bg-red-500/75 p-5 "
            onMouseUp={() => onMouseUp('BACKWARD')}
          >
            BACKWARD
          </button>
        </div>
      </div>
    </div>
  );
}
