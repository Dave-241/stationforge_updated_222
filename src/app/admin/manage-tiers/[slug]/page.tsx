import Manage_release from "./manage_release";

export default async function Home({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="w-full h-[3rem]"></div>
      <div className="w-[100rem] md:max-w-[95%] mx-auto mb-[4rem]  sm:w-[95%]">
        <Manage_release id={params.slug} />
      </div>
    </>
  );
}
