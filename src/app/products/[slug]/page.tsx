import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { PRODUCTS, PRODUCT_LINKS, productBySlug } from "@/content/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_LINKS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const link = productBySlug((await params).slug);
  return link ? { title: `${PRODUCTS[link.key].name} — AlphaNet Solutions` } : {};
}

export default async function ProductPage({ params }: Props) {
  const link = productBySlug((await params).slug);
  if (!link) notFound();
  return (
    <main>
      <ProductView productKey={link.key} />
    </main>
  );
}
