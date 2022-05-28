import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

const linkStyle = {
  style: {
    margin: -4,
  },
};

const linkProps = {
  onClick: (e) => {
    e.preventDefault();
  },
};

const buttonGreen = {
  fontSize: 60,
  border: 0,
  borderRadius: '100%',
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '10px',
  cursor: 'pointer',
}

export default function WhatsappItem ({ onClick, to }: any) {
  const btn = (
    <button
      title="Enviar Whatsapp"
      className={'position-fixed bottom-0 end-0'}
      style={{ border: 0, backgroundColor: 'transparent', margin:'0 1em 1em 0',}}
      onClick={onClick}

    >
      <BsWhatsapp style={buttonGreen} />
    </button>
  );

  return (
    <Link {...linkStyle} href={to} passHref>
      <a target="_blank" rel="noopener noreferrer">{btn}</a>
    </Link>
  );
};