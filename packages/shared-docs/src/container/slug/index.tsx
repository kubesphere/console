import React from 'react';
import { useParams } from 'react-router-dom';
import { isUndefined } from 'lodash';
import Components from '../Components';
import Types from '../Types';
import { Content, MainContent } from '../Components/styles';

const CateComponent: Record<string, () => JSX.Element> = {
  components: Components,
  types: Types,
};

function Slug() {
  const { category } = useParams();

  if (!category || isUndefined(CateComponent[category])) {
    return (
      <MainContent>
        <Content>404 not found</Content>
      </MainContent>
    );
  }

  return React.createElement(CateComponent[category]);
}

export default Slug;
