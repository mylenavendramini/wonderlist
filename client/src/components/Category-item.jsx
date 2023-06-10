import UserMap from './Map';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useContext } from 'react';
import { Context } from '../context/Context';

function CategoryItem ({ category }) {
  console.log(category)
  const { closeModal, updateCloseModal } = useContext(Context);
  return (
    <div className="category-item">
      <h2>TODO: Travel Name</h2>
      <h3>TODO: Travel City</h3>
      <h3>{category.title}</h3>
      <div className='map-container'>
        <h3>Find your places and add them to your list</h3>
        <Popup trigger={<button className="btn btn-add">
          <i className="fa fa-plus" ></i>
        </button>} modal nested
          position="right center">
          {close => (
            <div className="modal">
              <button className="close" onClick={close}>
                <i className="fa fa-close btn btn-close"></i>
              </button>
              <div className="content content-map">
                {' '}
                <UserMap />
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div>
        <div className='list-items'>
          <ul><li>{category.place}</li>
            <li>{category.address}</li></ul>
          <div className='close-item'>
            <i className="fa fa-close btn btn-close"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;