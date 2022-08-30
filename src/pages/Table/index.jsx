import React from "react";
import { Select, Table } from "antd";
import { data } from "./dataTable/data";
import { setTableData } from "../../redux/actions/actionCreator";
import { useDispatch } from "react-redux";
const { Option } = Select;

const _Table = () => {
  const dispatch = useDispatch();
  const [departValues, setDepartValues] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [unloadingValues, setUnloadingValues] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const handleChangeDepart = (val) => {
    setDepartValues((prev) => {
      return {
        ...prev,
        [val[val.length - 1]]: val,
      };
    });
  };
  const handleChangeUnloading = (val) => {
    setUnloadingValues((prev) => {
      return {
        ...prev,
        [val[val.length - 1]]: val,
      };
    });
  };

  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Точка погрузки",
      dataIndex: "departures",
      key: "departures",
      render: (_, { departure }) => (
        <Select
          defaultValue={"Выберите точку погрузки"}
          style={{
            width: 120,
          }}
          onChange={handleChangeDepart}
        >
          {departure.map((item, ind) => {
            return (
              <Option value={item.value} key={ind}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      ),
    },

    {
      title: "Точка выгрузки",
      dataIndex: "unloading",
      key: "unloading",
      render: (_, { unloading }) => (
        <Select
          defaultValue={"Выберите точку выгрузки"}
          style={{
            width: 120,
          }}
          onChange={handleChangeUnloading}
        >
          {unloading.map((item, ind) => {
            return (
              <Option value={item.value} key={ind}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      ),
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const res = selectedRows.map((item) => {
        item.departure = item.departure.filter(
          (i) => i.value === departValues[i.value[i.value.length - 1]] && i
        );
        item.unloading = item.unloading.filter(
          (i) => i.value === unloadingValues[i.value[i.value.length - 1]] && i
        );
        return item;
      });
      dispatch(setTableData(res));
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };
  const dataSource = data.map((item) => ({ ...item, key: item.id }));

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{
          width: "100%",
          maxWidth: "800px",
          overflowX: "auto",
        }}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </>
  );
};
export default _Table;
