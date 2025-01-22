import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  width: 1258px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;

  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: #242e42;
  }
`;

const CardOperations = styled.div`
  display: inline-flex;
  align-items: center;
  width: 20px;
  height: 20px;
`;

interface CardProps {
  title: React.ReactNode;
  operations?: React.ReactNode;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, operations, children }) => {
  return (
    <CardWrapper>
      <CardHeader>
        <div className="title">{title}</div>
        {operations && <CardOperations>{operations}</CardOperations>}
      </CardHeader>
      <div>{children}</div>
    </CardWrapper>
  );
};

export default Card;
