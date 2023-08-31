import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary py-4">
      <div className="container mx-auto flex justify-center items-center md:justify-between">
        <Link href="/">
        </Link>
        <ul className="flex space-x-8">
          <li>
            <Link href="/">
              Clima
            </Link>
          </li>
          <li>
            <Link href="/cep">
              CEP
            </Link>
          </li>
          <li>
            <Link href="/formulario">
              Formulário
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
