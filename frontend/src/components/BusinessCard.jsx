const BusinessCard = ({ data, onRegenerate }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded shadow max-w-md w-full text-center">
      <h2 className="text-xl font-semibold mb-2">{data.rating}★ Google Rating</h2>
      <p className="text-gray-600">{data.reviews} Reviews</p>
      <p className="mt-4 italic text-lg">"{data.headline}"</p>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={onRegenerate}
      >
        Regenerate SEO Headline
      </button>
    </div>
  );
};

export default BusinessCard;
