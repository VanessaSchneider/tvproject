import { useEffect, useState } from 'react'

function StarRating({rating, setRating}) {
    return (
        <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= ( rating) ? "on" : "off"}
              onClick={() => setRating(index)}
            >
              <span>&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  export default StarRating;