import { useState, useEffect } from 'react';

import { Table } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;

const TableComponent = ({ rows, onRowClick, config, actions, loading }) => {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();

  const sortColumns = (sortColumn, sortType) => {
    const newData = data.sort((a, b) => {
      let x = a[sortColumn];
      let y = b[sortColumn];

      if (typeof x === 'string') {
        x = x.charCodeAt();
      }
      if (typeof y === 'string') {
        y = y.charCodeAt();
      }
      if (sortType === 'asc') {
        return x - y;
      } else {
        return y - x;
      }
    });

    setData(newData);
  };

  useEffect(() => {
    setData(rows);
  }, [rows]);

  return (
    <>
      <Table
        onSortColumn={(sortColumn, sortType) => {
          sortColumns(sortColumn, sortType);
          setSortColumn(sortColumn);
          setSortType(sortType);
        }}
        sortColumn={sortColumn}
        sortType={sortType}
        height={400}
        data={data}
        loading={loading}
        onRowClick={(c) => onRowClick(c)}
      >
        {config.map((c) => (
          <Column flexGrow={1} fixed={c.fixed} width={c.width}>
            <HeaderCell>{c.label}</HeaderCell>
            {!c.content ? (
              <Cell dataKey={c.key} />
            ) : (
              <Cell dataKey={c.key}>{(item) => c.content(item[c.key])}</Cell>
            )}
          </Column>
        ))}

        <Column width={150} fixed="right">
          <HeaderCell>Ações</HeaderCell>

          <Cell>{(item) => actions(item)}</Cell>
        </Column>
      </Table>

      {/*<Pagination
        lengthMenu={[
          {
            value: 10,
            label: 10,
          },
          {
            value: 20,
            label: 20,
          },
        ]}
        activePage={1}
        displayLength={2}
        total={data.length}
        onChangePage={() => {}}
        onChangeLength={() => {}}
      />*/}
    </>
  );
};

export default TableComponent;
