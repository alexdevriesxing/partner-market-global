import Link from "next/link";
import { categories } from "@/lib/data";

export function CategoryGrid({ locale = "en" }: { locale?: string }) {
  return (
    <section className="category-section" id="categories">
      <h2>Browse by Opportunity Type</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <Link href={`/${locale}${category.href}`} className="category-tile" key={category.title}>
            <img src={category.image} alt="" aria-hidden="true" />
            <span>{category.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
