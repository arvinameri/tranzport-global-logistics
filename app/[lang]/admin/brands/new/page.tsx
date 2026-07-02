import BrandForm from "@/components/admin/BrandForm";

export default async function NewBrandPage(props: {
  params: Promise<{ lang: string }>;
}) {
  // Await کردن params
  const params = await props.params;

  return <BrandForm mode="create" lang={params.lang} />;
}
