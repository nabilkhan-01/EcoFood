import './Header.css';

const Header = () => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const backgroundImage = `image-set(
    url('${baseUrl}header_img.avif') type('image/avif'),
    url('${baseUrl}header_img.webp') type('image/webp'),
    url('${baseUrl}header_img.png') type('image/png')
  )`;

  return (
    <div className='header' style={{ backgroundImage }}>
      <div className='header-contents'>
        <h2>Order your favourite food</h2>
      </div>
    </div>
  );
};

export default Header;
