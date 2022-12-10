import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Arduino based IOT Projects"
          description="Your one stop solution to learn how to create IOT projects from scratch"
        />
      }
    >
      <p>IOT Web</p>
    </Main>
  );
};

export default Index;
