import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div>
          <img src="./img/logo_Idi.svg" alt="Logo Manuales" style={{ width: '25%', display: 'block', margin: 'auto' }} />
        </div>
        <h3 style={{ textAlign: 'center', padding: '20px' }}>Manuales creados por el Equipo I+D+i en diferentes temas enfocados en la computación en la nube</h3>
        <div className={styles.buttons} style={{ padding: '20px' }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/category/gcp-garden">
            Ingresar
          </Link>
        </div>
      </main>
    </Layout>
  );
}
