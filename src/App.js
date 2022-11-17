import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { Card, List, Input, Space } from "antd";
import { getAllData } from "./services/GetFimlsService";
const { Search } = Input;

function App() {
  // console.log(getAllData());

  const [data, setData] = useState();

  useEffect(() => {
    getAllData().then((d) => {
      setData(d);
    });
  }, []);
  // console.log(data);

  const onSearch = (value) => console.log(value);
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 200,
          alignItems: "end",
          margin: 10,
        }}
      />
      <List
        grid={{
          gutter: 12,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 5,
          xl: 5,
          xxl: 5,
        }}
        pagination={{
          showSizeChanger: false,
          pageSizeOptions: ["10", "50", "100", "1000"],
          // position: "both",
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.name}>
              <p>Gender: {item.gender}</p>
              <p>Eye Color: {item.eye_color}</p>
              <p>Skin Color: {item.skin_color}</p>
            </Card>
          </List.Item>
        )}
      />
      {/* </header> */}
    </div>
  );
}

export default App;
