import React from 'react';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import { TextProps } from 'antd/lib/typography/Text';

const TitleAnt = Typography.Title 
const TextAnt = Typography.Text 

const Title: React.FC<TitleProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TitleAnt {...props} />
  );
};

const Text: React.FC<TextProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextAnt {...props} />
  );
};

export { Title, Text };