import { useState } from "react";

export function TestErrorButton() {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  }

  if (throwError) {
    throw new Error("Test error from button! Please reload the page.");
  }

  return (
    <button className="test-error-btn" onClick={handleClick}>
      🧪 Simulate Error
    </button>
  );
}