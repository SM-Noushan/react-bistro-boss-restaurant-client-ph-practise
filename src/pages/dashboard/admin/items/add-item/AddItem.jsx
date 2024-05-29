import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa6";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import SectionHeading from "../../../../../components/home/SectionHeading";

// Error message for form fields
const errorMsg = (message) => (
  <div className=" mt-2 flex items-center gap-1 text-red-400 text-xs">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="-mt-px h-4 w-4 "
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
    <p>{message}</p>
  </div>
);

// Function to generate a unique file name
const generateUniqueFileName = (originalFileName) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  return `${timestamp}_${randomString}_${originalFileName}`;
};

const AddItem = ({ update = false }) => {
  const item = useLoaderData() || {};
  const { id } = useParams() || null;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (update)
      Object.keys(item).forEach((key) => {
        if (key != "_id" && key != "image") setValue(key, item[key]);
      });
  }, []);

  const handleForm = async (data) => {
    // console.log(data);
    if (update) {
      try {
        data.price = parseFloat(data.price);
        const resDB = await axiosSecure.patch(`/menu/${id}`, data);
        // console.log(resDB);
        if (resDB.data.modifiedCount) {
          return toast.success("Recipe updated");
        }
      } catch (error) {
        console.log(error);
        return toast.error("Failed! Please try again");
      }
    }
    try {
      const imageFile = new FormData();
      const originalFileName = data.image[0].name;
      const uniqueFileName = generateUniqueFileName(originalFileName);
      //   console.log(uniqueFileName, originalFileName);
      imageFile.append("image", data.image[0], uniqueFileName);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        imageFile
      );
      if (res.data.success) {
        data.image = res.data.data.display_url;
        data.price = parseFloat(data.price);
        const resDB = await axiosSecure.post("/menu", data);
        // console.log(resDB);
        if (resDB.data.insertedId) {
          reset();
          return toast.success("Recipe added");
        }
      }
    } catch (error) {
      console.log(error);
      return toast.error("Failed! Please try again");
    }
  };
  return (
    <>
      <SectionHeading
        heading={update ? "Update Item" : "ADD AN ITEM"}
        subHeading={update ? "Made a Mistake?" : "What's new?"}
      />
      <div className="p-12 bg-dark-007">
        <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
          {/* recipe name */}
          <div className="form-control">
            <label className="label px-0">
              <span className="text-xl text-dark-002 font-semibold">
                Recipe Name*
              </span>
            </label>
            <input
              autoComplete="recipe-name"
              name="recipe-name"
              type="text"
              placeholder="Recipe name"
              className="input input-bordered placeholder:text-dark-1a1"
              {...register("name", { required: true })}
            />
            {errors?.name && errorMsg("Recipe Name Required")}
          </div>
          {/* price and category */}
          <div className="flex gap-6 *:flex-1">
            {/* recipe category */}
            <div className="form-control">
              <label className="label px-0">
                <span className="text-xl text-dark-002 font-semibold">
                  Category*
                </span>
              </label>
              <select
                name="category"
                className="select select-bordered text-dark-1a1 text-base"
                defaultValue={"category"}
                {...register("category", {
                  required: true,
                  pattern: {
                    value: /^(?!category$).*$/i,
                  },
                })}
              >
                <option disabled value="category">
                  Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soups">Soups</option>
                <option value="desserts">Deserts</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
                <option value="offered">Offered</option>
              </select>
              {errors?.category && errorMsg("Select a category")}
            </div>
            {/* recipe price */}
            <div className="form-control">
              <label className="label px-0">
                <span className="text-xl text-dark-002 font-semibold">
                  Price*
                </span>
              </label>
              <input
                autoComplete="recipe-price"
                name="price"
                type="number"
                placeholder="Price"
                min={0}
                step={0.01}
                className="input input-bordered placeholder:text-dark-1a1"
                {...register("price", {
                  required: true,
                  min: 0,
                })}
              />
              {errors?.price && errorMsg("Required recipe price")}
            </div>
          </div>
          {/* recipe details */}
          <div className="form-control">
            <label className="label px-0">
              <span className="text-xl text-dark-002 font-semibold">
                Recipe Details*
              </span>
            </label>
            <textarea
              autoComplete="recipe-details"
              name="recipeDetails"
              type="text"
              placeholder="Recipe details"
              className="textarea textarea-bordered placeholder:text-dark-1a1"
              rows={8}
              {...register("recipe", {
                required: true,
              })}
            />
            {errors?.recipe && errorMsg("Recipe Details Required")}
          </div>

          {/* recipe image */}
          {update || (
            <input
              name="recipeImage"
              type="file"
              className="file-input file:bg-dark-006 file:border-none file:text-dark-002 w-full max-w-xs bg-dark-007"
              {...register("image", { required: true })}
            />
          )}
          {update || (errors?.image && errorMsg("Upload recipe image"))}

          {/* form submit button */}
          <div className="form-control mt-6 w-fit">
            <button
              type="submit"
              className="btn bg-[linear-gradient(90deg,rgba(131,93,35,1)0%,rgba(181,129,48,1)100%)] hover:brightness-90 text-white text-xl font-bold disabled:bg-gold-054/50 px-6"
            >
              {update ? (
                "Update Recipe Details"
              ) : (
                <>
                  Add Item
                  <FaUtensils />
                </>
              )}
              {/* {loading && (
                <span className="loading loading-dots loading-md"></span>
              )} */}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

AddItem.propTypes = {
  update: PropTypes.bool,
};

export default AddItem;
