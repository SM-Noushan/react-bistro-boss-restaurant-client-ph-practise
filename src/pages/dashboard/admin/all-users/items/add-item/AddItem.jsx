import { FaUtensils } from "react-icons/fa6";
import SectionHeading from "../../../../../../components/home/SectionHeading";

const AddItem = () => {
  return (
    <>
      <SectionHeading heading="ADD AN ITEM" subHeading="What's new?" />
      <div className="p-12 bg-dark-007">
        <form className="space-y-4">
          {/* recipe name */}
          <div className="form-control">
            <label className="label px-0">
              <span className="text-xl text-dark-002 font-semibold">
                Recipe Name*
              </span>
            </label>
            <input
              autoComplete="recipe-name"
              name="recipeName"
              type="text"
              placeholder="Recipe name"
              className="input input-bordered placeholder:text-dark-1a1"
              required
            />
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
              >
                <option disabled selected>
                  Category
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
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
                className="input input-bordered placeholder:text-dark-1a1"
                required
              />
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
              required
            />
          </div>

          {/* recipe image */}
          <input
            name="recipeImage"
            type="file"
            className="file-input file:bg-dark-006 file:border-none file:text-dark-002 w-full max-w-xs bg-dark-007"
          />

          {/* form submit button */}
          <div className="form-control mt-6 w-fit">
            <button
              type="submit"
              className="btn bg-[linear-gradient(90deg,rgba(131,93,35,1)0%,rgba(181,129,48,1)100%)] hover:brightness-90 text-white text-xl font-bold disabled:bg-gold-054/50 px-6"
            >
              Add Item
              <FaUtensils />
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

export default AddItem;
