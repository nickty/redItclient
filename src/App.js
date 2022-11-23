import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { Card, List, Input } from "antd";
import { getAllData } from "./services/GetFimlsService";
const { Search } = Input;

function App() {
  const [data, setData] = useState();

  // Loading data for the first time
  useEffect(() => {
    getAllData().then((d) => {
      setData(d);
    });
  }, []);

  // Search function
  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    return array.filter((value) => {
      return value.name.toLowerCase().match(new RegExp(searchTerm, "g"));
    });
  };

  // filtering data
  const handleOnChange = async (e) => {
    console.log("search value", e.target.value);
    if (e.target.value.length > 0) {
      let search = await arraySearch(data, e.target.value);
      console.log("search data", search);
      setData(search);
    } else {
      getAllData().then((d) => {
        setData(d);
      });
    }
  };

  return (
    <div className="App">
      <Search
        placeholder="input search text"
        onChange={handleOnChange}
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
    </div>
  );
}

export default App;
