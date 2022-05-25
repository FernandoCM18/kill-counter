import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';

interface Props {
  title: string;
  pageDescription: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Layout = ({title, pageDescription, children, style}: Props) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
      </Helmet>

      <Wrapper style={style}>
        {children}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.main`
  min-height: 100vh;
`;
