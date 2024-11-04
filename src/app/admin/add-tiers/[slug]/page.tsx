import Edit_teir from "./edit_teir";

export default async function Home({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="w-full h-[3rem]"></div>
      <div className="w-[100rem] md:max-w-[95%] mx-auto mb-[4rem]  sm:w-[95%]">
        <Edit_teir id={params.slug} />
      </div>
    </>
  );
}
