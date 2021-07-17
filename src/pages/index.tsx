import { useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';

import { formatDate } from '../utils/dateFormatter';

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
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function handleLoadPosts() {
    const data = await fetch(nextPage).then(response => response.json());

    const nextPagePosts = data.results.map((post: Post) => ({
      uid: post.uid,
      first_publication_date: formatDate(post.first_publication_date),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }));

    console.log(nextPagePosts);
    

    const newPosts = [...posts, ...nextPagePosts];

    setPosts(newPosts);
    setNextPage(data.next_page);
  };

  return (
    <>
      <Head>
        <title>Home | Spacetrevaling</title>
      </Head>
      <Header />
      <main className={ styles.contentContainer }>
        <div className={ styles.posts }>
          { posts.map(post => (
            <a href={ `/post/${ post.uid }` } key={ post.uid }>
              <h1>{ post.data.title }</h1>
              <h2>{ post.data.subtitle }</h2>
              <div className={ commonStyles.info }>
                <time>
                  <FiCalendar />
                  { formatDate(post.first_publication_date) }
                </time>
                <span>
                  <FiUser />
                  { post.data.author }
                </span>
              </div>
            </a>
          )) }

            { nextPage && (
              <button onClick={ handleLoadPosts }>
                Carregar mais posts
              </button>
            ) }
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
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 2,
    orderings: '[document.first_publication_date desc]'
  });

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
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
