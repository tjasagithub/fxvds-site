import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Logo = ({ className = 'h-8' }: { className?: string }) => {
  const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');
  if (!logoImage) return null;

  return (
    <div className={`relative ${className}`}>
      <Image
        src={logoImage.imageUrl}
        alt={logoImage.description}
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;
