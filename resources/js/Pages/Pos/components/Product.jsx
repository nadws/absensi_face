import numeral from "numeral";
export default function Product({
    data,
    cardItems,
    handleCartClick,
    handleImageError,
    removeFromCards,
}) {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8  grid grid-cols-4 gap-4">
            {data.produk.data.map((item) => (
                <div
                    key={item.id}
                    className={`shadow-md sm:rounded-lg cursor-pointer  ${
                        cardItems.some((cardItem) => cardItem.id === item.id)
                            ? "bg-[#F46700] text-white shadow-xl"
                            : "bg-white"
                    }`}
                    onClick={(event) => {
                        event.preventDefault(); // Menghentikan penyebaran event
                        {
                            cardItems.some(
                                (cardItem) => cardItem.id === item.id
                            )
                                ? removeFromCards(item)
                                : handleCartClick(item, event);
                        }
                    }}
                >
                    <img
                        src={`/image/${item.foto}`}
                        alt={`Image for ${item.nama_produk}`}
                        className="w-full h-32 object-cover p-3 rounded"
                        onError={handleImageError}
                    />

                    <div className="p-6">
                        <span className="font-bold font-mona">
                            {item.nama_produk}
                        </span>
                        <br />
                        <span
                            className={`font-mona ${
                                cardItems.some(
                                    (cardItem) => cardItem.id === item.id
                                )
                                    ? "text-white font-bold"
                                    : "text-[#F46700] font-bold"
                            }`}
                        >
                            Rp.
                            {numeral(item.harga).format("0,0")}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
