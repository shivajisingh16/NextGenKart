import { memo } from "react";
function Footer() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row justify-around items-center bg-gray-700 text-gray-50 py-6">
      <p>Copyright 2022 | CodeYogi</p>
      <p>Powered by CodeYogi</p>
    </div>
  );
}

export default memo(Footer);
