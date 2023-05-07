import data from "./data";
import "./App.css";

let parents = data.filter((c) => c.parentId === null);
parents = parents.map((d) => ({ ...d, className: "lvl-0" }));

for (let i = 0; i < parents.length; i++) {
  let first_children = data.filter((c) => c.parentId === parents[i].id);
  first_children = first_children.map((d) => ({ ...d, className: "lvl-1" }));
  for (let j = 0; j < first_children.length; j++) {
    let second_children = data.filter(
      (c) => c.parentId === first_children[j].id
    );
    second_children = second_children.map((d) => ({
      ...d,
      className: "lvl-1",
    }));
    first_children[j] = Object.assign(first_children[j], {
      children: second_children,
    });
  }
  parents[i] = Object.assign(parents[i], { children: first_children });
}

const Card = ({ item }: { item: any }) => {
  const regex = /(<([^>]+)>)/gi;
  const newString = item?.description?.replace(regex, "");
  return (
    <div className="card-container">
      <p style={{ flex: 1 }}>{item.name}</p>
      <p style={{ flex: 1 }}>{item.teacher}</p>
      <p style={{ flex: 1, maxLines: 2 }}>{newString}</p>
      <p style={{ flex: 1 }}>{item.prerequisites}</p>
    </div>
  );
};

const ParentCard = ({ item }: { item: any }) => {
  return (
    <div>
      <Card item={item} />
      {item.children?.map((child: any, index: any) => (
        <div className={child.className} key={index}>
          <ParentCard item={child} />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <main className="App">
      <div className="nav">
        <p>&#x2022;&#x2022;&#x2022;</p>
      </div>
      <div style={{ paddingLeft: 50 }}>
        {parents.map((item, index) => {
          return <ParentCard item={item} key={index} />;
        })}
      </div>
    </main>
  );
};

export default App;
