import order_icon from "../../assets/Filtered-Images/tder.png";
import vendors_icon from "../../assets/Filtered-Images/vendors.png";
import users from "../../assets/Filtered-Images/users.png";
import sales_icon from "../../assets/Filtered-Images/sales.png";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Content = () => {
  const orders = [
    {
      id: "MP1010",
      item: "Women Classy Top",
      date: "13/09/24",
      price: "#20,000",
      category: "Women",
      seller: "SB Empire",
      status: "Delivered",
    },
    {
      id: "MP1012",
      item: "Men Classy Set",
      date: "12/09/24",
      price: "#150,000",
      category: "Men",
      seller: "Market Prime",
      status: "Delivered",
    },
    {
      id: "MP1014",
      item: "Custom-made Ring Set",
      date: "12/09/24",
      price: "#200,000",
      category: "Unisex",
      seller: "FashionLot",
      status: "Pending",
    },
    {
      id: "MP1016",
      item: "WomenBaggy Jean",
      date: "11/09/24",
      price: "#20,000",
      category: "Women",
      seller: "Ola Boutique",
      status: "Delivered",
    },
  ];

  const data02 = [
    { name: "Pending", value: 12, fill: "#F7EC1B" },
    { name: "Success", value: 79, fill: "#3D56FA" },
    { name: "Cancelled", value: 9, fill: "#F82A0D" },
  ];

  const data = [
    { name: "Jan", uv: 100, sales: 100, amt: 100 },
    { name: "Feb", uv: 200, sales: 300, amt: 200 },
    { name: "Mar", uv: 300, sales: 500, amt: 300 },
    { name: "Apr", uv: 400, sales: 700, amt: 400 },
    { name: "May", uv: 500, sales: 900, amt: 500 },
    { name: "Jun", uv: 600, sales: 1100, amt: 600 },
    { name: "Jul", uv: 700, sales: 1300, amt: 700 },
    { name: "Aug", uv: 800, sales: 1500, amt: 800 },
    { name: "Sep", uv: 900, sales: 1700, amt: 900 },
    { name: "Oct", uv: 1000, sales: 1900, amt: 1000 },
    { name: "Nov", uv: 1100, sales: 2100, amt: 1100 },
    { name: "Dec", uv: 1200, sales: 2300, amt: 1200 },
  ];

  const bestproducts = [
    {
      image: "/images/Rectangle 4024.png",
      name: "Women Classy Fashion Bag",
      price: "#50,000",
    },
    {
      image: "/images/Rectangle 4038.png",
      name: "Women Classy Top",
      price: "#20,000",
    },
    {
      image: "/images/Rectangle 4035.png",
      name: "Men Classy Leather Watch",
      price: "#150,000",
    },
    {
      image: "/images/Rectangle 4033.png",
      name: "Men Classy Set",
      price: "#100,000",
    },
    {
      image: "/images/Rectangle 4025.png",
      name: "Women Bodycon Dress",
      price: "#30,000",
    },
  ];
  const products = bestproducts.map((item, i) => {
    return (
      <div key={i} className="flex items-center justify-between px-5 w-full">
        <div className="w-4/5 flex items-center justify-start">
          <img src={item.image} className="rounded-full w-[22%]" />
          <p className="text-sm ml-2">{item.name}</p>
        </div>
        <span className="w-1/5">{item.price}</span>
      </div>
    );
  });
  return (
    <main className="flex-1 bg-[#C1CFE3]">
      <div className="flex justify-around items-center mt-2">
        <div className="h-[70%] w-[23%] shadow-gray-400 shadow-xl border border-slate-300 bg-white rounded-3xl flex flex-col items-start justify-center p-4">
          <div className="ml-7  flex flex-col items-start justify-center w-full ">
            <p className="text-xl">Total Orders</p>
            <div className="flex w-[85%] justify-between">
              <h1 className="text-xl font-bold">10720</h1>
              <img src={order_icon} alt="" />
            </div>
            <p>From yesterday</p>
          </div>
        </div>
        <div className="h-[70%] w-[23%] shadow-gray-400 shadow-xl border bg-white  border-slate-300 rounded-3xl flex flex-col items-start justify-center p-4">
          <div className="ml-7  flex flex-col items-start justify-center w-full ">
            <p className="text-xl">Total Sales</p>
            <div className="flex w-[85%] justify-between">
              <h1 className="text-xl font-bold">N1,800,309</h1>
              <img src={sales_icon} alt="" />
            </div>
            <p>From yesterday</p>
          </div>
        </div>
        <div className="h-[70%] w-[23%] shadow-gray-400 shadow-xl border bg-white  border-slate-300 rounded-3xl flex flex-col items-start justify-center p-4">
          <div className="ml-7  flex flex-col items-start justify-center w-full">
            <p className="text-xl">Active Vendors</p>
            <div className="flex w-[85%] justify-between">
              <h1 className="text-xl font-bold">10720</h1>
              <img src={vendors_icon} alt="" />
            </div>
            <p>From yesterday</p>
          </div>
        </div>
        <div className="h-[70%] w-[23%] shadow-gray-400 shadow-xl border bg-white  border-slate-300 rounded-3xl flex flex-col items-start justify-center p-4">
          <div className="ml-7  mx-2 flex flex-col items-start justify-center w-full">
            <p className="text-xl">Total Users</p>
            <div className="flex w-[85%] justify-between">
              <h1 className="text-xl font-bold">10720</h1>
              <img src={users} alt="" />
            </div>
            <p>From yesterday</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-4 my-5">
        {/* Bar chart box */}
        <div className="w-[73%] py-0 bg-white rounded-xl">
          <div className="flex items-center justify-between w-full py-2 mt-2 px-10">
            <p className="w-1/2 text-xl">Sales Analytics</p>
            <div className="flex items-center justify-between w-1/2">
              <p className="text-xl">Daily</p>
              <p className="text-xl">Weekly</p>
              <p className="text-xl">Monthly</p>
              <p className="text-xl">Yearly</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250} className="mt-12">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="sales"
                fill="#227BF2"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Best selling section */}
        <div className="w-[25%] h-[350px] bg-white rounded-xl overflow-clip">
          <div className="flex items-center justify-between py-2 px-5">
            <h3 className="text-lg">Best Selling Products</h3>
            <p className="text-lg">See all</p>
          </div>
          <div>{products}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-around items-center w-full space-y-5 lg:space-y-0 lg:space-x-5 px-4">
        {/* Pie chart box */}
        <div className="w-full lg:w-1/3 h-[400px] bg-white rounded-xl p-4">
          <h3 className="text-start mt-1 text-xl">Order Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                dataKey="value"
                data={data02}
                cx="50%" // Centering the pie horizontally
                cy="50%" // Centering the pie vertically
                innerRadius={50} // Increased inner radius
                outerRadius={120} // Increased outer radius
                fill="#227BF2"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-between my-5 lg:my-0 w-full lg:w-4/5 mx-auto">
            <div className="">
              <p className="h-7 bg-[#3D56FA] w-8 text-center mx-auto"></p>
              <p className="text-center text-sm">Success</p>
              <span className="text-center text-base block text-[#3D56FA]">
                79%
              </span>
            </div>
            <div className="">
              <p className="h-7 bg-[#F7EC1B] w-8 text-center mx-auto"></p>
              <p className="text-center text-sm">Pending</p>
              <span className="text-center text-base block text-[#F7EC1B]">
                12%
              </span>
            </div>
            <div className="">
              <p className="h-7 bg-[#F82A0D] w-8 text-center mx-auto"></p>
              <p className="text-center text-sm">Canceled</p>
              <span className="text-center text-base block text-[#F82A0D]">
                9%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="w-full lg:w-[70%]  bg-white rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-xl">Recent Orders</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Sort By:</span>
              <select className="bg-blue-100 py-1 px-2 rounded-lg">
                <option>Recent Orders</option>
                <option>Pending Orders</option>
                <option>Out of Stock</option>
                <option>Recently added products</option>
                <option>Delivered Items</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-1 text-left">Order ID</th>
                  <th className="px-4 py-1 text-left">Item</th>
                  <th className="px-4 py-1 text-left">Date</th>
                  <th className="px-4 py-1 text-left">Price</th>
                  <th className="px-4 py-1 text-left">Category</th>
                  <th className="px-4 py-1 text-left">Seller</th>
                  <th className="px-4 py-1 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-[8px]">{order.id}</td>
                    <td className="px-4 py-[8px]">{order.item}</td>
                    <td className="px-4 py-[8px]">{order.date}</td>
                    <td className="px-4 py-[8px]">{order.price}</td>
                    <td className="px-4 py-[8px]">{order.category}</td>
                    <td className="px-4 py-[8px]">{order.seller}</td>
                    <td
                      className={`px-4 py-1 ${
                        order.status === "Pending"
                          ? "text-yellow-500"
                          : "text-blue-800"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Content;
