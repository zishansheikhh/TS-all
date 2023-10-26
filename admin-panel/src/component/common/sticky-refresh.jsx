import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const StickyRefresh = () => {
  return (
      <div className="sticky-refresh">
        <Link to='/admin' className="user light-text">
          <FontAwesomeIcon icon="fa-solid fa-rotate-right" />
        </Link>
      </div>
  );
};

export default StickyRefresh;
