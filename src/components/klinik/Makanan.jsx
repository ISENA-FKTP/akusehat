import { useState } from "react";

const SelectWithInput = () => {
  const [selectedFood, setSelectedFood] = useState("");
  const [otherFood, setOtherFood] = useState("");

  const handleFoodChange = (e) => {
    const { value } = e.target;
    setSelectedFood(value);

    if (value !== "Makanan Lainnya") {
      setOtherFood("");
    }
  };

  const handleOtherFoodChange = (e) => {
    setOtherFood(e.target.value);
  };

  return (
    <div className="flex flex-col -space-y-7  ">
      <label className="text-black font-secondary-Karla font-bold w-40 ">
        Makanan :
      </label>
      <div className="w-full">
        <select
          name="Makanan"
          value={selectedFood}
          onChange={handleFoodChange}
          className="p-1 ml-32 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500 w-full"
        >
          <option value=""></option>
          <option value="Tidak ada">Tidak ada</option>
          <option value="Seafood">Seafood</option>
          <option value="Gandum">Gandum</option>
          <option value="Susu Sapi">Susu Sapi</option>
          <option value="Kacang-Kacangan">Kacang-Kacangan</option>
          <option value="Makanan Lainnya">Makanan Lainnya</option>
        </select>
        {/* Input for Other Food */}
        {selectedFood === "Makanan Lainnya" && (
          <div className=" mt-2">
            <input
              type="text"
              value={otherFood}
              onChange={handleOtherFoodChange}
              placeholder="Keterangan Makanan Lainnya"
              className="p-1 w-full ml-32 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectWithInput;
