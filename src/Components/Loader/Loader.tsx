import { Oval } from 'react-loader-spinner';
import './Loader.scss';

export const Loader = () => (
  <div className='loader__wrapper'>
    <Oval
      height={50}
      width={50}
      color="#084977"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#3f8ed0"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
);
