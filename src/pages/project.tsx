import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Project = () => (
  <Main meta={<Meta title="Project list" description="Project list" />}>
    {['iot-car'].map((projectName) => (
      <div
        className="my-4 w-full rounded-md border-2 border-gray-400 px-2 py-1"
        key={projectName}
      >
        <span>Arduino Mega, ESP8266, ESP32 CAM based IOT Car</span>
        <img
          src="/assets/images/rc-car-chasis.png"
          style={{ cursor: 'pointer' }}
          alt="IOT Car"
          onClick={() => {
            window.open(`/project/${projectName}`);
          }}
        />
      </div>
    ))}
  </Main>
);

export default Project;
