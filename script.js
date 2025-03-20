const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let arr = [];

async function FetchData() {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();
    arr = data;
    console.log(arr);
    displayData(arr);
  } catch (e) {
    console.log(e);
  }

  function displayData(arr) {
    const db = document.getElementById("details");

    db.innerHTML = " ";

    for (let i = 0; i < arr.length; i++) {
      const coin = arr[i];

      const Element = document.createElement("div");
      Element.innerHTML = `
          <span>${coin.name}     </span>
          <span>${coin.Image}     </span>
          <span>${coin.symbol}     </span>
          <span>${coin.market}     </span>
          <span>${coin.current_price}     </span>
            <p>Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
          `;
      db.appendChild(Element);
    }
  }
}
FetchData();
