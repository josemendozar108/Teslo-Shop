import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  width: number;
  height: number;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
}: Props) => {

const localSrc = !src
  ? "/imgs/placeholder.jpg"   // 👈 fallback seguro
  : src.startsWith("http")
    ? src
    : src.startsWith("/products")
      ? src
      : src.startsWith("/")
        ? src
        : `/products/${src}`;

  return (
    <Image
      src={ localSrc }
      width={ width }
      height={ height}
      alt={ alt }
      className={ className }
      style={ style }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};