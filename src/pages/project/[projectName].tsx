import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type ProjectUrl = {
  projectName: string;
};

export const getStaticPaths: GetStaticPaths<ProjectUrl> = async () => {
  return {
    paths: ['cam-feed', 'iot-car'].map((projectName) => ({
      params: { projectName },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectUrl, ProjectUrl> = async ({
  params,
}) => {
  return {
    props: {
      projectName: params!.projectName,
    },
  };
};

const Project = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main
      meta={<Meta title={props.projectName} description={props.projectName} />}
    >
      <h1 className="capitalize">{props.projectName}</h1>
    </Main>
  );
};

export default Project;
