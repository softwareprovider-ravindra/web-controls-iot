import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <p>Hi, I am Ravindra Singh Rathor</p>
    <img alt="ravindra-pic" src="/assets/images/web-portal/ravindra.jpg" />
    <p>And, This is a compilation of hobby projects that i am working on.</p>
  </Main>
);

export default About;
