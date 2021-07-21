import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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

interface NavPost {
  uid: string;
  data: {
    title: string;
  }
}

interface PostProps {
  post: Post;
  previousPost: NavPost;
  nextPost: NavPost;
  preview: boolean;
}

export default function Post({
  post,
  previousPost,
  nextPost,
  preview
}: PostProps) {
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
        <title>{ post.data.title } | Spacetrevaling</title>
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
        <nav>
          { previousPost ? (
            <div className={ styles.previousPost }>
              <p>{ previousPost.data.title }</p>
              <Link href={ `/post/${previousPost.uid}` }>
                <a>Post anterior</a>
              </Link>
            </div>
          ) : (
            <a></a>
          )}
          { nextPost ? (
            <div className={ styles.nextPost }>
              <p>{ nextPost.data.title }</p>
              <Link href={ `/post/${nextPost.uid}` }>
                <a>Próximo post</a>
              </Link>
            </div>
          ) : (
            <a></a>
          )}
        </nav>
        <Comments />

        { preview && (
          <aside>
            <Link href="/api/exit-preview">
              <a className={ commonStyles.previewButton }>Sair do modo preview</a>
            </Link>
          </aside>
        ) }
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

export const getStaticProps = async ({
  params,
  preview = false,
  previewData
}) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(params.slug), {
    ref: previewData?.ref ?? null
  });

  const previousPost = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    pageSize: 1,
    orderings: '[document.first_publication_date]',
    after: response.id
  });

  const nextPost = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    pageSize: 1,
    orderings: '[document.first_publication_date desc]',
    after: response.id
  });

  return {
    props: {
      post: response,
      preview,
      previousPost: previousPost.results[0] || null,
      nextPost: nextPost.results[0] || null
    }
  };
};
