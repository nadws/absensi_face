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
                    className={`shadow-md rounded-lg cursor-pointer flex flex-col h-full relative z-10  ${
                        item.stok === 0 && item.opname === "Y"
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
                            item.stok === 0 && item.opname === "Y"
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
                                              opname: item.opname,
                                          },
                                      ],
                                      event
                                  );
                        }
                    }}
                >
                    <img
                        src={item.foto}
                        alt={`Image for ${item.nama_produk}`}
                        className={`w-full lg:h-32 h-28 object-cover p-3 rounded  ${
                            item.stok === 0 && item.opname === "Y"
                                ? "blur-sm"
                                : ""
                        } `}
                        onError={handleImageError}
                    />

                    <div className="p-6 mb-4">
                        <span
                            className={`font-normal  font-mona ${
                                item.stok === 0 && item.opname === "Y"
                                    ? "text-slate-400"
                                    : ""
                            }`}
                        >
                            {item.nama_produk}
                        </span>
                        <br />

                        <span
                            className={`font-mona ${
                                item.stok === 0 && item.opname === "Y"
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
                    {item.stok === 0 && item.opname === "Y" && (
                        <span className="absolute  font-mona lg:ml-10 ml-5 mt-14 font-bold flex items-center justify-center text-5xl  text-red-500   transform rotate-45">
                            Habis
                        </span>
                    )}
                    <span
                        className={`font-mona italic mt-2 absolute bottom-2 right-2 ${
                            item.stok === 0 && item.opname === "Y"
                                ? "text-slate-400"
                                : ""
                        }`}
                    >
                        Stock:{" "}
                        {item.opname === "Y" ? (
                            item.stok
                        ) : (
                            <i className="fas fa-infinity"></i>
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
}
