import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Project = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <p>Pick a project that you want to control</p>

    {['iot-car'].map((projectName) => (
      <div
        className="my-4 w-full rounded-md border-2 border-gray-400 px-2 py-1"
        key={projectName}
      >
        <Link href={`project/${projectName}`}>{projectName}</Link>
      </div>
    ))}
  </Main>
);

export default Project;
