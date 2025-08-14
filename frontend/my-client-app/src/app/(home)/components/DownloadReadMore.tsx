"use client";
const DownloadReadMore = ({ link }: { link: string }) => {
  const handleClick = () => {
    window.open(link, "_blank");
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="bg-orange-500 rounded-md text-white py-2"
      >
        Download
      </button>
    </>
  );
};

export default DownloadReadMore;
