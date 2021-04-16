import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import { FiCalendar, FiUser } from 'react-icons/fi'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Prismic from '@prismicio/client';

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

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Spacetrevaling</title>
      </Head>
      <Header />
      <main className={ styles.contentContainer }>
        <div className={ styles.posts }>
          { postsPagination.results.map(post => (
              <a key={ post.uid }>
                <h1>{ post.data.title }</h1>
                <h2>{ post.data.subtitle }</h2>
                <div className={ styles.info }>
                  <time>
                    <FiCalendar />
                    { post.first_publication_date }
                  </time>
                  <span>
                    <FiUser />
                    Jean Macedo
                  </span>
                </div>
              </a>
            )) }
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle'],
    pageSize: 2
  });

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        "dd MMM yyyy",
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        // author: post.data.author
      }
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts
  }

  return {
    props: {
      postsPagination
    }
  };
};
