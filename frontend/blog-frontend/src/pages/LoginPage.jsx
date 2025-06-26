import Header from '../components/Hearder';
import BodyLogin from '../components/BodyLogin';


const LoginPage = () => {

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed bg-gray-100" style={{backgroundImage:"url('https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",}}>
      <Header/>
      <BodyLogin/>
    </div>
  );
};
export default LoginPage;
