export const revalidate = 604800; // 7 dias 


import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFonts } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
// import { initialData } from "@/seed/seed"; 
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";


interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug =  (await params).slug; 

  // fetch data
  const product = await getProductBySlug(slug); 

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images: [], // https://misitioweb.com/products/image.png
      images: [`/products/${product?.images[1]}`]
    }
  }
}



export default async function ProductsSlugPage({params}:Props) {

  const {slug} = await params; 
  const product = await getProductBySlug(slug); 

  if (!product) {
    notFound(); 
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2 ">

        {/*Mobile */}

        <ProductMobileSlideShow 
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />


        {/*Desktop Slideshow */}
        
        <ProductSlideShow 
        images={product.images}
        title={product.title}
        className="hidden md:block"
        />

      </div>
     
     {/*Detalles  */}
     <div className="col-span-1 px-5">

      <StockLabel slug={product.slug}/>

      <h1 className={`${titleFonts.className} antialiased font-bold text-xl`}>
        {product.title}
      </h1>

      <p className="text-lg mb-5">${product.price}</p>

      <AddToCart product={product}/>

      {/*Descripcion */}
      <h3 className="font-bold text-sm">Descripcion</h3>
      <p className="font-light">
        {product.description}
      </p>
     </div>


    </div>
  );
}