import StarIcon from './StarIcon';

import '../../styles/loader.css';

const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <StarIcon classes={'spinning-loader icon-color-primary'} />
      <StarIcon classes={'spinning-loader-inner icon-color-secondary'} />
    </div>
  );
};

export default Loader;
