import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="text-3xl font-bold text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
        <div>
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href="/project/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Projects
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href="/about/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                About
              </Link>
            </li>
            <li className="mr-6">
              <a
                className="border-none text-gray-700 hover:text-gray-900"
                href="https://github.com/ixartz/Next-js-Boilerplate"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="content py-5 text-xl">{props.children}</div>
    </div>
  </div>
);

export { Main };
