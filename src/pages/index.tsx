import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import { FiCalendar, FiUser } from 'react-icons/fi'

import Header from '../components/Header';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Spacetrevaling | Home</title>
      </Head>
      <Header />
      <main className={ styles.contentContainer }>
        <div className={ styles.posts }>
          <a href="#">
            <h1>Como utilizar hooks</h1>
            <h2>Pensando em sincronização em vez de ciclos de vida</h2>
            <div className={ styles.info }>
              <time>
                <FiCalendar />
                13 Abr 2021
              </time>
              <span>
                <FiUser />
                Jean Macedo
              </span>
            </div>
          </a>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
