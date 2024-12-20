import numeral from "numeral";
export default function Product({
    data,
    cardItems,
    handleCartClick,
    handleImageError,
    removeFromCards,
}) {
    return (
        <div className="max-w-7xl  sm:px-8 px-6  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.produk.data.map((item) => (
                <div
                    key={item.id}
                    className={`shadow-md sm:rounded-lg cursor-pointer flex flex-col h-full relative z-10  ${
                        item.stok === 0
                            ? "bg-slate-300  shadow-xl"
                            : cardItems.some(
                                  (cardItem) => cardItem.id === item.id
                              )
                            ? "bg-[#F46700] text-white shadow-xl"
                            : "bg-white"
                    }`}
                    onClick={(event) => {
                        event.preventDefault();
                        {
                            item.stok === 0
                                ? ""
                                : cardItems.some(
                                      (cardItem) => cardItem.id === item.id
                                  )
                                ? removeFromCards(item)
                                : handleCartClick(
                                      [
                                          {
                                              id: item.id,
                                              nama_produk: item.nama_produk,
                                              harga: item.harga,
                                              foto: item.foto,
                                              stok: item.stok,
                                              ttl_rp: item.harga,
                                              qty: 1,
                                          },
                                      ],
                                      event
                                  );
                        }
                    }}
                >
                    <img
                        src={`/image/${item.foto}`}
                        alt={`Image for ${item.nama_produk}`}
                        className={`w-full lg:h-32 h-28 object-cover p-3 rounded  ${
                            item.stok === 0 ? "blur-sm" : ""
                        } `}
                        onError={handleImageError}
                    />

                    <div className="p-6 mb-4">
                        <span
                            className={`font-normal  font-mona ${
                                item.stok === 0 ? "text-slate-400" : ""
                            }`}
                        >
                            {item.nama_produk}
                        </span>
                        <br />

                        <span
                            className={`font-mona ${
                                item.stok === 0
                                    ? "text-[#fcba8b] font-bold"
                                    : cardItems.some(
                                          (cardItem) => cardItem.id === item.id
                                      )
                                    ? "text-white font-bold"
                                    : "text-[#F46700] font-bold"
                            }`}
                        >
                            Rp. {numeral(item.harga).format("0,0")}
                        </span>
                    </div>
                    {item.stok === 0 && (
                        <span className="absolute font-mona inset-0 font-bold flex items-center justify-center text-5xl  text-red-500   transform rotate-45">
                            Habis
                        </span>
                    )}
                    <span
                        className={`font-mona italic mt-2 absolute bottom-2 right-2 ${
                            item.stok === 0 ? "text-slate-400" : ""
                        }`}
                    >
                        Stock: {item.stok}
                    </span>
                </div>
            ))}
        </div>
    );
}
