import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component.jsx";

// const Directory = ({ categories }) => {
//   return (
//     <div className="directory-container">
//       {categories.map((category) => (
//         <CategoryItem key={category.id} category={category} />
//       ))}
//     </div>
//   );
// };

const Directory = (props) => {
  return (
    <div className="directory-container">
      {props.categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
