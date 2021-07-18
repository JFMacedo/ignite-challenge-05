import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';

import { formatDate } from '../../utils/dateFormatter';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useRouter } from 'next/router';
import { Comments } from '../../components/Comments';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
      alt: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if(router.isFallback) {
    return (
      <div className={ commonStyles.loading }>
        Carregando...
      </div>
    )
  }

  const totalWords = post.data.content.reduce((total, contentItem) => {
    total += contentItem.heading.split(' ').length;

    const words = contentItem.body.map(item => item.text.split(' ').length);
    words.map(word => (total += word));
    return total;
  }, 0);

  const readTime = Math.ceil(totalWords / 200);

  return (
    <>
      <Head>
        <title>Home | Spacetrevaling</title>
      </Head>
      <Header />
      <img
        src={ post.data.banner.url }
        alt={ post.data.banner.alt }
        className={ styles.banner }
      />
      <main className={ styles.contentContainer }>
        <h1>{post.data.title}</h1>
        <div className={ commonStyles.info }>
          <time>
            <FiCalendar />
            { formatDate(post.first_publication_date) }
          </time>
          <span>
            <FiUser />
            { post.data.author }
          </span>
          <span>
            <FiClock />
            {`${readTime} min`}
          </span>
        </div>
        { post.data.content.map(content => {
          return (
            <div key={ content.heading } className={ styles.contentGroup }>
              <h2>{ content.heading }</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </div>
          )
        }) }
      </main>

      <footer className={ styles.footerContainer }>
        <Comments />
      </footer>
    </>
  );
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([Prismic.predicates.at('document.type', 'posts')]);
  
  const paths = posts.results.map(post => {
    return { params: { slug: post.uid } }
  });

  return {
    paths,
    fallback: true
  }
};

export const getStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(params.slug), {});

  return {
    props: {
      post: response
    }
  };
};
