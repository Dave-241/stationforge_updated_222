"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { formatDistanceToNow, format } from "date-fns";
import {
  collection,
  onSnapshot,
  getFirestore,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore"; // Import setDoc
import searchimg from "../../../../../public/admin_section/post_insight/search_black.webp";
import Image from "next/image";
import firebaseConfig from "@/app/utils/fire_base_config";
import { initializeApp } from "firebase/app";

const Manage_release = ({ id }: any) => {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [products, setProducts] = useState<any>([]);
  const [searchText, setSearchText] = useState("");

  // Array for months with corresponding month numbers
  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 },
  ];

  // Initialize Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [productDetails, setProductDetails] = useState<any>([]); // State to store products
  const [modelsToAdd, setModelsToAdd] = useState<any[]>([]); // Local state for models to add

  // Generate an array of years from the current year to the next 3 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i);

  // Filter products based on search text
  const filteredProducts = products.filter((product: any) =>
    product.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Initial fetch for products and product details
  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch all products
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);

      // Store all product information including document IDs
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        png: doc.data().cover_png,
      }));

      setProducts(productList); // Set all products initially

      // Fetch product tier category details
      const productTierCategoryRef = collection(db, "product_tier_category");
      const categoryQuery = query(
        productTierCategoryRef,
        where("tier_id", "==", id),
      );
      const categorySnapshot = await getDocs(categoryQuery);

      // Extract modelIds from the fetched tier categories
      const modelIds = categorySnapshot.docs.map(
        (categoryDoc) => categoryDoc.data().modelId,
      );

      // Filter products based on the modelIds
      const availableProducts = productList.filter(
        (product) => !modelIds.includes(product.id),
      );
      const modelsToAdd = productList.filter((product) =>
        modelIds.includes(product.id),
      );

      // Set the remaining products and the models to be added
      setProducts(availableProducts); // Set products that can be added
      setModelsToAdd(modelsToAdd); // Set filtered products to models to add
    };

    fetchProducts();
  }, [id]);

  // Function to add a model to the modelsToAdd state
  const addModel = (product: any) => {
    const { id, title } = product;

    // Check if the model is already added
    if (!modelsToAdd.some((model: any) => model.id === id)) {
      // Add the product with both id and title to local state
      setModelsToAdd((prev) => [...prev, { id, title }]);

      // Remove from products
      setProducts((prev: any) => prev.filter((p: any) => p.id !== id));
      console.log(products.filter((p: any) => p.id !== id)); // Log the filtered products
    }
  };
  console.log(modelsToAdd);

  return (
    <>
      <div className="relative sm:pb-[2rem]">
        <button
          className="text-base neuem"
          onClick={() => {
            router.back();
          }}
        >
          <i className="bi bi-chevron-left"></i> Back
        </button>
        <p
          style={{ whiteSpace: "nowrap" }}
          className="neuem capitalize absolute bottom-0 left-[50%] translate-x-[-50%]"
        >
          Manage release for standard tier
        </p>
      </div>

      <div className="md:w-[40rem] gap-[4rem] pt-[2rem] mx-auto max-w-full flex flex-col">
        <div className="flex flex-col gap-[0.5rem]">
          <p className="neuer">Select date for release</p>
          <div className="bg-white sm:flex-col w-full shadow-sm drop-shadow-lg p-[2rem] rounded-[20px] flex gap-[1rem]">
            {/* Year Dropdown */}
            <div className="w-full neuem flex flex-col gap-[0.4rem] ">
              <label className="text-sm" htmlFor="year">
                Select year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border rounded-[20px] neuer bg-[#EFEFEF] py-[1.2rem] px-[1rem]"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Dropdown */}
            <div className="w-full neuem flex flex-col gap-[0.4rem] ">
              <label className="text-sm" htmlFor="month">
                Select month
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border rounded-[20px] neuer bg-[#EFEFEF] py-[1.2rem] px-[1rem]"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month.number} value={month.number}>
                    {month.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[1rem]">
          <div className="flex gap-[1rem] sm:flex-col items-center">
            <p className="neuem flex-shrink-0">Objects for release</p>
            <div className="w-full items-center flex justify-center relative">
              <div className="absolute h-full w-[3.2rem] pr-[0.3rem] flex justify-end items-center top-0 left-0 z-[13]">
                <Image
                  src={searchimg}
                  alt="Search icon image"
                  className="w-[1.3rem] h-fit"
                />
              </div>
              <input
                type="text"
                placeholder="Search objects"
                className="h-[3rem] w-full text-black neuer text-sm outline-none focus:border transition duration-[0.8s] pl-[3.5rem] pr-[1rem] rounded-[3rem] placeholder:text-black neuer bg-[#000000] bg-opacity-[10%] border-white border-opacity-[30%] border-[0.1rem]"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full sm:overflow-x-scroll rounded-[20px] shadow-md overflow-hidden drop-shadow-lg">
            <div className="flex flex-col">
              <div className="w-full sm:w-[30rem] sm:flex-shrink-0 md:pr-[1.2vw] neuem text-sm bg-[#F4F4F4] flex">
                <div className="w-[40%] text-center  py-[1.2rem]">
                  <p>Objects</p>
                </div>
                <div className="w-[30%] text-center  py-[1.2rem]">
                  <p>Add Model</p>
                </div>
                <div className="w-[30%] text-center py-[1.2rem]">
                  <p>Actions</p>
                </div>
              </div>

              <div className="w-full sm:w-[30rem] flex-col overflow-y-scroll h-[24rem] flex bg-white">
                {filteredProducts.map((product: any, index: any) => {
                  const createdAt = product.createdAt.toDate(); // Convert Firebase Timestamp to JavaScript Date

                  const timeAgo = formatDistanceToNow(createdAt, {
                    addSuffix: true,
                  });
                  //   const exactTime = format(createdAt, "h a"); // Format the time to "2 pm" format
                  return (
                    <div
                      key={index}
                      className="w-full sm:flex-shrink-0 text-center text-sm border-b border-b-gray-400 flex"
                    >
                      <div className="w-[40%] border-r flex items-center justify-center gap-[1rem] border-gray-400 py-[1.2rem]">
                        <Image
                          src={product.png}
                          className="w-[2rem]"
                          height={"0"}
                          width={"0"}
                          unoptimized
                          alt="image"
                        />
                        <p className="neuem">{product.title}</p>
                      </div>
                      <div className="w-[30%] relative border-r border-gray-400 py-[1.2rem]">
                        <button
                          onClick={() => addModel(product)} // Call the addModel function here
                          style={{ whiteSpace: "nowrap" }}
                          className="bg-[#F5F5F5] hover:bg-white border hover:border-[#95B611] hover:text-black cursor-pointer py-[0.5rem] hover:bg-opacity-[40%] neuer flex justify-center text-[#95B611] items-center text-xs rounded-[1rem] px-[1.5rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                        >
                          Add Model
                        </button>
                      </div>
                      <div className="w-[30%] py-[1.2rem] flex justify-center items-center ">
                        {timeAgo}
                        <button className="text-[#FF0000] text-xl">
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* the added products */}
          </div>

          {/* Display currently added models */}
          <div className="w-full flex flex-col gap-[1rem]">
            <h3 className="neuem">Models Added:</h3>
            {modelsToAdd.length > 0 ? (
              modelsToAdd.map((modelId: any) => (
                <div
                  key={modelId.id}
                  className="flex sm:gap-[1rem] justify-between neuem"
                >
                  <span className="">{modelId.title}</span>
                  {/* <button
                    className="text-red-500"
                    // onClick={() =>
                    //   setModelsToAdd((prev) =>
                    //     prev.filter((id) => id !== modelId),
                    //   )
                    // }
                  >
                    Remove
                  </button> */}
                  <button
                    // onClick={() => addModel(product)} // Call the addModel function here
                    style={{ whiteSpace: "nowrap" }}
                    className="bg-[#F5F5F5] hover:bg-white border hover:border-[#95B611] hover:text-black cursor-pointer py-[0.5rem] hover:bg-opacity-[40%] neuer flex justify-center text-[#95B611] items-center text-xs rounded-[1rem] px-[1.5rem] "
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div>No models added yet.</div>
            )}
          </div>
        </div>

        {/* Publish button */}
        <div className="flex justify-center">
          <button
            // onClick={publishModels} // Publish models to the database
            style={{ whiteSpace: "nowrap" }}
            className="bg-[#CCFF00] hover:bg-white sm:w-full border hover:border-[#95B611] hover:text-black cursor-pointer py-[1rem] hover:bg-opacity-[40%] neuer flex justify-center text-[black] items-center text-sm rounded-[1rem] px-[3rem] capitalize sm:px-0"
          >
            Update Teir Infomation
          </button>
        </div>
      </div>
    </>
  );
};

export default Manage_release;
