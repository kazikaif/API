const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let Crptodata = [];
async function FetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    Crptodata = data;
    displayData(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayData(data) {
  const tbody = document.getElementById("tbody");

  tbody.innerHTML = "";

  data.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src="${coin.image}" alt="${coin.name}" width="30"/></td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>${coin.name}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td style="color: ${
          coin.price_change_percentage_24h >= 0 ? "green" : "red"
        }">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
      `;
    tbody.appendChild(row);
  });
}

function Search() {
  const serachinput = document.getElementById("Sh").value.toLowerCase();

  const filterdata = Crptodata.filter(
    (coin) =>
      coin.name.toLowerCase().includes(serachinput) ||
      coin.symbol.toLowerCase().includes(serachinput)
  );
  displayData(filterdata);
}

function Cap() {
  const CapSorted = [...Crptodata].sort((a, b) => b.market_cap - a.market_cap);

  displayData(CapSorted);
}

function Percentage() {
  const PercentageSorted = [...Crptodata].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  displayData(PercentageSorted);
}
FetchData();
