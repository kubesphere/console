import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  @media (max-width: 768px) {
    padding-left: 0;
  }

  @media (min-width: 1164px) {
    padding-left: 117px;
  }
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
    font-size: 14px;
    font-weight: 600;
    color: #242e42;
  }
`;

const CardContent = styled.div``;

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
        {operations && <div className="operations">{operations}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardWrapper>
  );
};

export default Card;
