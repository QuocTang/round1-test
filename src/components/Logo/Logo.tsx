import Image from '../Image';

interface LogoProps {
    height?: number;
    width?: number;
    className?: string;
}

function Logo({ className }: LogoProps) {
    return <Image src="" alt="Logo" className={className} />;
}

export default Logo;
