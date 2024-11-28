import React, { useEffect, useRef } from "react";

const OptionItem = ({ option, setImageFocus }) => {
  const optionItemRefs = useRef([]);

  const handleClickOutside = (event) => {
    const clickedOutside = optionItemRefs.current.every(
      (ref) => ref && !ref.contains(event.target)
    );
    if (clickedOutside) {
      setImageFocus("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {option?.map((op, index) => (
        <div
          key={op.image}
          className="w-8 h-8 relative flex items-center justify-center"
          ref={(el) => (optionItemRefs.current[index] = el)}
        >
          <button
            className="w-full h-full absolute z-50 rounded-full border-[1px] border-red-500 cursor-pointer"
            onClick={() => setImageFocus(op?.image)}
          >
            <img
              loading="lazy"
              className="w-full h-full rounded-[100%] object-cover"
              src={op?.image}
              alt=""
            />
          </button>
        </div>
      ))}
    </>
  );
};

export default OptionItem;
