// components/StyledComponents.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  color: white;
`;

export const TableData = styled.td`
  padding: 10px;
  color: white;
`;

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Total = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const Button = styled.button`
  background-color: #0077cc;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0062a6;
  }
`;
