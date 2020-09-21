// If you don't want to use TypeScript you can delete this file!
import React from 'react';
import { PageProps, graphql } from 'gatsby';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch-dom';

type DataProps = {
  products: {
    edges: {
      node: {
        description: string;
        title: string;
      };
    }[];
  };
};

const searchClient = algoliasearch(
  'ZB0L2W54WM',
  'f10074e6110a9c0ff1dfdcdf625b9843'
);

const Hit = props => {
  return (
    <>
      <h3>
        <Highlight attribute="title" hit={props.hit}>
          {props.hit.title}
        </Highlight>
      </h3>
      <Highlight attribute="description" hit={props.hit}>
        {props.hit.description}
      </Highlight>
    </>
  );
};

const Index: React.FC<PageProps<DataProps>> = ({ data }) => {
  return (
    <>
      <h1>Gatsby Search by Algolia!</h1>

      <h2>Search</h2>
      <InstantSearch indexName="name_name" searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>

      <h2>All Products</h2>
      {data.products.edges.map(product => (
        <div key={product.node.title}>
          <h2>{product.node.title}</h2>
          <p>{product.node.description}</p>
        </div>
      ))}
    </>
  );
};

export default Index;

export const query = graphql`
  {
    products: allStrapiProduct {
      edges {
        node {
          description
          title
        }
      }
    }
  }
`;
