import PageForm from "@/components/admin/PageForm";

export default async function NewPage(props: {
  params: Promise<{ lang: string }>;
}) {
  // Await کردن params
  const params = await props.params;

  return <PageForm mode="create" lang={params.lang} />;
}
