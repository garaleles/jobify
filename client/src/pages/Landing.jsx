import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components/index.js';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            İş <span>Takip</span> Platformu
          </h1>
          <p>
            İş arama ve takibi yapılan web sitemiz, kariyer yolculuğunuzda
            sizlere güçlü bir destek sağlamak amacıyla tasarlanmıştır. Siz iş
            arayanların ihtiyaçlarına odaklanarak, geniş ve çeşitli iş
            fırsatlarını tek bir platformda bir araya getiriyoruz. Kullanıcı
            dostu arayüzümüz sayesinde aradığınız pozisyonları hızlıca bulabilir
            ve başvuru süreçlerinizi kolayca yönetebilirsiniz. Açılış
            sayfamızda, sizin için özelleştirilen iş önerileri ve sektördeki
            güncel gelişmeleri sunarak karar verme sürecinizi destekliyoruz.
            Ayrıca, iş başvurularınızın durumu ve takip etmeniz gereken adımlar
            konusunda sizi bilgilendirerek iş arama sürecinizi daha organize ve
            etkin hale getiriyoruz. Amacımız, iş arama sürecinizin stresini
            azaltmak ve iş dünyasındaki yeni fırsatları keşfetmenizi
            kolaylaştırmaktır. Sitemize ücretsiz üye olarak, niteliklerinize ve
            ilgi alanlarınıza uygun iş ilanlarını inceleyebilir, başvurularınızı
            kolaylıkla yönetebilir ve CV'nizi güncel tutarak dikkat çekici bir
            profil oluşturabilirsiniz. Siz de kariyer hedeflerinize ulaşmak için
            bu güçlü iş arama ve takip platformuna katılın! İş dünyasının
            sunduğu fırsatları keşfedin ve geleceğinize yön vermek için ilk
            adımı atın!
          </p>
          <Link to='/register' className='btn register-link'>
            Kayıt Ol
          </Link>
          <Link to='/login' className='btn'>
            Giriş Yap
          </Link>
        </div>
        <img src={main} alt='iş bul' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
