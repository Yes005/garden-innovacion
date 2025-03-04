import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// function HomepageHeader() {
//   const { siteConfig } = useDocusaurusContext();
//   return (

//   );
// }

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Manuales creados por el Equipo I+D+i, en diferentes temas enfocados en la computación en la nube.">
      {/* <HomepageHeader /> */}
      <main>
        <header className={clsx('hero', styles.heroBanner)} style={{ paddingBottom: 0 }}>
          <div className="container">
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>

            <img src="./img/logo_Idi.svg" alt="Logo Manuales" style={{ width: '30%', display: 'block', margin: 'auto', paddingTop: '20px' }} />

          </div>
        </header>
        <div>
          <h2 style={{ textAlign: 'center', padding: '40px' }}>Manuales creados por el Equipo I+D+i en diferentes temas enfocados en la computación en la nube</h2>
          <div className={styles.buttons} style={{ paddingBottom: '25px' }}>
            <Link
              className="button button--primary button--lg"
              to="/docs/category/gcp-garden">
              Ingresar
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
