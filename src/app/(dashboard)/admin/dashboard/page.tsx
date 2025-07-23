import LineChart from "@/components/chart/LineChart"
import { RevenueChart } from "@/components/chart/RevenuChart";
import { SalesChart } from "@/components/chart/SalesChart";

const Dashboard = () => {

    // const chartData = {
    //     labels: ["2016", "2017", "2018", "2019", "2020", "2020", "2021", "2022", "2023", "2024", "2025"],
    //     datasets: [
    //         {
    //             label: "Sales Amount",
    //             data: [200, 400, 600, 800, 1000, 400, 200, 100, 400, 500, 1800],
    //             borderColor: "rgb(128 83 135)",
    //             backgroundColor: "rgba(128,83,135,0.4)",
    //             tension: 0.4,
    //         },
    //         {
    //             label: "Sales Amount",
    //             data: [200, 400, 600, 800, 1000, 400, 200, 100, 400, 500, 1800],
    //             borderColor: "rgb(128 83 135)",
    //             backgroundColor: "rgba(128,83,135,0.4)",
    //             tension: 0.4,
    //         },
    //     ],
    // };

    const salesChartData = [
        { date: "2024-04-01", desktop: 222 },
        { date: "2024-04-02", desktop: 97 },
        { date: "2024-04-03", desktop: 167 },
        { date: "2024-04-04", desktop: 242 },
        { date: "2024-04-05", desktop: 373 },
        { date: "2024-04-06", desktop: 301 },
        { date: "2024-04-07", desktop: 245 },
        { date: "2024-04-08", desktop: 409 },
        { date: "2024-04-09", desktop: 59 },
        { date: "2024-04-10", desktop: 261 },
        { date: "2024-04-11", desktop: 327 },
        { date: "2024-04-12", desktop: 292 },
        { date: "2024-04-13", desktop: 342 },
        { date: "2024-04-14", desktop: 137 },
        { date: "2024-04-15", desktop: 120 },
        { date: "2024-04-16", desktop: 138 },
        { date: "2024-04-17", desktop: 446 },
        { date: "2024-04-18", desktop: 364 },
        { date: "2024-04-19", desktop: 243 },
        { date: "2024-04-20", desktop: 89 },
        { date: "2024-04-21", desktop: 137 },
        { date: "2024-04-22", desktop: 224 },
        { date: "2024-04-23", desktop: 138 },
        { date: "2024-04-24", desktop: 387 },
        { date: "2024-04-25", desktop: 215 },
        { date: "2024-08-1", desktop: 75 },
        { date: "2024-08-27", desktop: 383 },
        { date: "2024-10-2", desktop: 122 },
        { date: "2024-10-29", desktop: 315 },
        { date: "2024-11-11", desktop: 311 },
        { date: "2024-11-12", desktop: 200 },
        { date: "2024-11-13", desktop: 380 },
        { date: "2024-11-14", desktop: 333 },
        { date: "2024-11-15", desktop: 322 },
    ]

    const revenueChartData = [
        { date: "2024-04-01", desktop: 222, mobile: 150 },
        { date: "2024-04-02", desktop: 97, mobile: 180 },
        { date: "2024-04-03", desktop: 167, mobile: 120 },
        { date: "2024-04-04", desktop: 242, mobile: 260 },
        { date: "2024-04-05", desktop: 373, mobile: 290 },
        { date: "2024-04-06", desktop: 301, mobile: 340 },
        { date: "2024-04-07", desktop: 245, mobile: 180 },
        { date: "2024-04-08", desktop: 409, mobile: 320 },
        { date: "2024-04-09", desktop: 59, mobile: 110 },
        { date: "2024-04-10", desktop: 261, mobile: 190 },
        { date: "2024-04-11", desktop: 327, mobile: 350 },
        { date: "2024-04-12", desktop: 292, mobile: 210 },
        { date: "2024-04-13", desktop: 342, mobile: 380 },
        { date: "2024-04-14", desktop: 137, mobile: 220 },
        { date: "2024-04-15", desktop: 120, mobile: 170 },
        { date: "2024-04-16", desktop: 138, mobile: 190 },
        { date: "2024-04-17", desktop: 446, mobile: 360 },
        { date: "2024-04-18", desktop: 364, mobile: 410 },
        { date: "2024-04-19", desktop: 243, mobile: 180 },
        { date: "2024-04-20", desktop: 89, mobile: 150 },
        { date: "2024-04-21", desktop: 137, mobile: 200 },
        { date: "2024-04-22", desktop: 224, mobile: 170 },
        { date: "2024-04-23", desktop: 138, mobile: 230 },
        { date: "2024-04-24", desktop: 387, mobile: 290 },
        { date: "2024-04-25", desktop: 215, mobile: 250 },
        { date: "2024-04-26", desktop: 75, mobile: 130 },
        { date: "2024-04-27", desktop: 383, mobile: 420 },
        { date: "2024-04-28", desktop: 122, mobile: 180 },
        { date: "2024-04-29", desktop: 315, mobile: 240 },
        { date: "2024-04-30", desktop: 454, mobile: 380 },
        { date: "2024-05-01", desktop: 165, mobile: 220 },
        { date: "2024-05-02", desktop: 293, mobile: 310 },
        { date: "2024-05-03", desktop: 247, mobile: 190 },
        { date: "2024-05-04", desktop: 385, mobile: 420 },
        { date: "2024-05-05", desktop: 481, mobile: 390 },
        { date: "2024-05-06", desktop: 498, mobile: 520 },
        { date: "2024-05-07", desktop: 388, mobile: 300 },
        { date: "2024-05-08", desktop: 149, mobile: 210 },
        { date: "2024-05-09", desktop: 227, mobile: 180 },
        { date: "2024-05-10", desktop: 293, mobile: 330 },
        { date: "2024-05-11", desktop: 335, mobile: 270 },
        { date: "2024-05-12", desktop: 197, mobile: 240 },
        { date: "2024-05-13", desktop: 197, mobile: 160 },
        { date: "2024-05-14", desktop: 448, mobile: 490 },
        { date: "2024-05-15", desktop: 473, mobile: 380 },
        { date: "2024-05-16", desktop: 338, mobile: 400 },
        { date: "2024-05-17", desktop: 499, mobile: 420 },
        { date: "2024-05-18", desktop: 315, mobile: 350 },
        { date: "2024-05-19", desktop: 235, mobile: 180 },
        { date: "2024-05-20", desktop: 177, mobile: 230 },
        { date: "2024-05-21", desktop: 82, mobile: 140 },
        { date: "2024-05-22", desktop: 81, mobile: 120 },
        { date: "2024-05-23", desktop: 252, mobile: 290 },
        { date: "2024-05-24", desktop: 294, mobile: 220 },
        { date: "2024-05-25", desktop: 201, mobile: 250 },
        { date: "2024-05-26", desktop: 213, mobile: 170 },
        { date: "2024-05-27", desktop: 420, mobile: 460 },
        { date: "2024-05-28", desktop: 233, mobile: 190 },
        { date: "2024-05-29", desktop: 78, mobile: 130 },
        { date: "2024-05-30", desktop: 340, mobile: 280 },
        { date: "2024-05-31", desktop: 178, mobile: 230 },
        { date: "2024-06-01", desktop: 178, mobile: 200 },
        { date: "2024-06-02", desktop: 470, mobile: 410 },
        { date: "2024-06-03", desktop: 103, mobile: 160 },
        { date: "2024-06-04", desktop: 439, mobile: 380 },
        { date: "2024-06-05", desktop: 88, mobile: 140 },
        { date: "2024-06-06", desktop: 294, mobile: 250 },
        { date: "2024-06-07", desktop: 323, mobile: 370 },
        { date: "2024-06-08", desktop: 385, mobile: 320 },
        { date: "2024-06-09", desktop: 438, mobile: 480 },
        { date: "2024-06-10", desktop: 155, mobile: 200 },
        { date: "2024-06-11", desktop: 92, mobile: 150 },
        { date: "2024-06-12", desktop: 492, mobile: 420 },
        { date: "2024-06-13", desktop: 81, mobile: 130 },
        { date: "2024-06-14", desktop: 426, mobile: 380 },
        { date: "2024-06-15", desktop: 307, mobile: 350 },
        { date: "2024-06-16", desktop: 371, mobile: 310 },
        { date: "2024-06-17", desktop: 475, mobile: 520 },
        { date: "2024-06-18", desktop: 107, mobile: 170 },
        { date: "2024-06-19", desktop: 341, mobile: 290 },
        { date: "2024-06-20", desktop: 408, mobile: 450 },
        { date: "2024-06-21", desktop: 169, mobile: 210 },
        { date: "2024-06-22", desktop: 317, mobile: 270 },
        { date: "2024-06-23", desktop: 480, mobile: 530 },
        { date: "2024-06-24", desktop: 132, mobile: 180 },
        { date: "2024-06-25", desktop: 141, mobile: 190 },
        { date: "2024-06-26", desktop: 434, mobile: 380 },
        { date: "2024-06-27", desktop: 448, mobile: 490 },
        { date: "2024-06-28", desktop: 149, mobile: 200 },
        { date: "2024-06-29", desktop: 103, mobile: 160 },
        { date: "2024-06-30", desktop: 446, mobile: 400 },
    ]

    return (
        <div>
            <h2 className='text-3xl font-bold font-playfairdisplay'>Dashboard</h2>
            {/* Top Bar */}
            <div className="mt-5 md:mt-[40px] grid grid-cols-[repeat(auto-fit,minmax(262px,1fr))] gap-4">
                {/* Total Pending */}
                <div className="flex bg-white justify-between rounded-md p-4 items-center flex-wrap gap-6">
                    <p>
                        <span className='font-playfairdisplay block mb-2 text-[#2F2F2F] font-semibold'>Total Pending</span>
                        <strong>2040</strong>
                    </p>
                    <div className="icon">
                        <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M0 30.3418V37.3418C0 50.0443 10.2975 60.3418 23 60.3418H30H37C49.7025 60.3418 60 50.0443 60 37.3418V30.3418V23.3418C60 10.6392 49.7025 0.341797 37 0.341797H30H23C10.2975 0.341797 0 10.6392 0 23.3418V30.3418Z" fill="#FF9066" />
                            <path opacity="0.78" fillRule="evenodd" clipRule="evenodd" d="M28.6309 24.1492C28.651 23.8887 28.8682 23.6875 29.1294 23.6875H29.5473C29.8041 23.6875 30.0192 23.8821 30.0448 24.1377L30.6664 30.3542L35.0812 32.8769C35.237 32.9659 35.3331 33.1316 35.3331 33.311V33.6995C35.3331 34.0292 35.0196 34.2687 34.7015 34.1819L28.3984 32.4629C28.167 32.3998 28.0131 32.1813 28.0315 31.9422L28.6309 24.1492Z" fill="#FF9066" />
                            <path opacity="0.901274" fillRule="evenodd" clipRule="evenodd" d="M22.7218 15.3254C22.4577 15.0107 21.9477 15.1311 21.8524 15.5308L20.2189 22.3789C20.1412 22.7046 20.3993 23.0131 20.7336 22.9941L27.7783 22.5949C28.1892 22.5716 28.3976 22.0896 28.133 21.7743L26.3316 19.6275C27.4965 19.2294 28.7317 19.0215 30 19.0215C36.2592 19.0215 41.3333 24.0956 41.3333 30.3549C41.3333 36.6141 36.2592 41.6882 30 41.6882C23.7408 41.6882 18.6667 36.6141 18.6667 30.3549C18.6667 29.3041 18.809 28.275 19.0864 27.2858L16.5188 26.5656C16.1808 27.7708 16 29.0417 16 30.3549C16 38.0869 22.268 44.3549 30 44.3549C37.732 44.3549 44 38.0869 44 30.3549C44 22.6229 37.732 16.3549 30 16.3549C28.0551 16.3549 26.2029 16.7514 24.5197 17.4681L22.7218 15.3254Z" fill="#FF9066" />
                        </svg>
                    </div>
                    <div className="shrink-0 basis-full text-center flex items-center gap-2">
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0.341797L16.29 2.6318L11.41 7.5118L7.41 3.5118L0 10.9318L1.41 12.3418L7.41 6.3418L11.41 10.3418L17.71 4.0518L20 6.3418V0.341797H14Z" fill="#00B69B" />
                        </svg>
                        <p><span className='text-[#00B69B] font-bold' >1.8% </span>Up from yesterday</p>
                    </div>
                </div>
                {/* Total Sales */}
                <div className="flex bg-white justify-between rounded-md p-4 items-center flex-wrap gap-6">
                    <p>
                        <span className='font-playfairdisplay block mb-2 text-[#2F2F2F] font-semibold'>Total Sales</span>
                        <strong>Rs. 89,000</strong>
                    </p>
                    <div className="icon">
                        <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 30.3418V37.3418C0 50.0443 10.2975 60.3418 23 60.3418H30H37C49.7025 60.3418 60 50.0443 60 37.3418V30.3418V23.3418C60 10.6392 49.7025 0.341797 37 0.341797H30H23C10.2975 0.341797 0 10.6392 0 23.3418V30.3418Z" fill="#4AD991" />
                            <path d="M19.1111 41.2307H42.4444C43.3036 41.2307 44 41.9271 44 42.7862C44 43.6454 43.3036 44.3418 42.4444 44.3418H17.5556C16.6964 44.3418 16 43.6454 16 42.7862V17.8974C16 17.0382 16.6964 16.3418 17.5556 16.3418C18.4147 16.3418 19.1111 17.0382 19.1111 17.8974V41.2307Z" fill="#4AD991" />
                            <path opacity="0.5" d="M24.9131 34.5177C24.3255 35.1445 23.3411 35.1763 22.7143 34.5887C22.0876 34.0011 22.0558 33.0167 22.6434 32.3899L28.4767 26.1677C29.045 25.5616 29.9893 25.509 30.6213 26.0483L35.2253 29.9771L41.224 22.3788C41.7563 21.7045 42.7345 21.5895 43.4088 22.1218C44.0831 22.6541 44.1982 23.6323 43.6658 24.3066L36.6658 33.1733C36.1191 33.8658 35.1063 33.9654 34.4351 33.3927L29.7311 29.3785L24.9131 34.5177Z" fill="#4AD991" />
                        </svg>

                    </div>
                    <div className="shrink-0 basis-full text-center flex items-center gap-2">
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 12.3418L16.29 10.0518L11.41 5.1718L7.41 9.1718L0 1.7518L1.41 0.341797L7.41 6.3418L11.41 2.3418L17.71 8.6318L20 6.3418V12.3418H14Z" fill="#F93C65" />
                        </svg>
                        <p><span className='text-[#F93C65] font-bold' >4.3% </span>Down from yesterday</p>
                    </div>
                </div>
                {/* Total Orders */}
                <div className="flex bg-white justify-between rounded-md p-4 items-center flex-wrap gap-6">
                    <p>
                        <span className='font-playfairdisplay block mb-2 text-[#2F2F2F] font-semibold'>Total Orders</span>
                        <strong>10293</strong>
                    </p>
                    <div className="icon">
                        <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 30.3418V37.3418C0 50.0443 10.2975 60.3418 23 60.3418H30H37C49.7025 60.3418 60 50.0443 60 37.3418V30.3418V23.3418C60 10.6392 49.7025 0.341797 37 0.341797H30H23C10.2975 0.341797 0 10.6392 0 23.3418V30.3418Z" fill="#FEC53D" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 24.6589L27.9005 32.107C28.0394 32.1872 28.1851 32.2452 28.3333 32.2819V46.7272L15.9201 39.381C15.3498 39.0435 15 38.43 15 37.7674V24.6589ZM45 24.4609V37.7674C45 38.43 44.6502 39.0435 44.0799 39.381L31.6667 46.7272V32.1554C31.6969 32.1403 31.7269 32.1242 31.7566 32.107L45 24.4609Z" fill="#FEC53D" />
                            <path opacity="0.499209" fillRule="evenodd" clipRule="evenodd" d="M15.4053 21.0432C15.5628 20.8442 15.7617 20.6761 15.9936 20.5526L29.1186 13.5619C29.6696 13.2684 30.3305 13.2684 30.8815 13.5619L44.0065 20.5526C44.1852 20.6478 44.3444 20.7695 44.4801 20.9115L30.0899 29.2196C29.9953 29.2742 29.9081 29.3368 29.8286 29.4058C29.7491 29.3368 29.6618 29.2742 29.5672 29.2196L15.4053 21.0432Z" fill="#FEC53D" />
                        </svg>

                    </div>
                    <div className="shrink-0 basis-full text-center flex items-center gap-2">
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0.341797L16.29 2.6318L11.41 7.5118L7.41 3.5118L0 10.9318L1.41 12.3418L7.41 6.3418L11.41 10.3418L17.71 4.0518L20 6.3418V0.341797H14Z" fill="#00B69B" />
                        </svg>
                        <p><span className='text-[#00B69B] font-bold' >1.3% </span>Up from yesterday</p>
                    </div>
                </div>
                {/* Total Users */}
                <div className="flex bg-white justify-between rounded-md p-4 items-center flex-wrap gap-6">
                    <p>
                        <span className='font-playfairdisplay block mb-2 text-[#2F2F2F] font-semibold'>Total Users</span>
                        <strong>40,689</strong>
                    </p>
                    <div className="icon">
                        <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 30.3418V37.3418C0 50.0443 10.2975 60.3418 23 60.3418H30H37C49.7025 60.3418 60 50.0443 60 37.3418V30.3418V23.3418C60 10.6392 49.7025 0.341797 37 0.341797H30H23C10.2975 0.341797 0 10.6392 0 23.3418V30.3418Z" fill="#8280FF" />
                            <path opacity="0.587821" fillRule="evenodd" clipRule="evenodd" d="M20.667 23.6751C20.667 26.6206 23.0548 29.0085 26.0003 29.0085C28.9458 29.0085 31.3337 26.6206 31.3337 23.6751C31.3337 20.7296 28.9458 18.3418 26.0003 18.3418C23.0548 18.3418 20.667 20.7296 20.667 23.6751ZM34.0003 29.0085C34.0003 31.2176 35.7912 33.0085 38.0003 33.0085C40.2095 33.0085 42.0003 31.2176 42.0003 29.0085C42.0003 26.7993 40.2095 25.0085 38.0003 25.0085C35.7912 25.0085 34.0003 26.7993 34.0003 29.0085Z" fill="#8280FF" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.9778 31.6758C19.6826 31.6758 14.5177 34.9111 14.0009 41.2747C13.9727 41.6214 14.6356 42.3424 14.97 42.3424H36.9956C37.9972 42.3424 38.0128 41.5364 37.9972 41.2758C37.6065 34.7334 32.3616 31.6758 25.9778 31.6758ZM45.2746 42.3424L40.1333 42.3424C40.1333 39.3412 39.1417 36.5716 37.4683 34.3433C42.0103 34.3929 45.7189 36.6893 45.998 41.5424C46.0092 41.7379 45.998 42.3424 45.2746 42.3424Z" fill="#8280FF" />
                        </svg>

                    </div>
                    <div className="shrink-0 basis-full text-center flex items-center gap-2">
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0.341797L16.29 2.6318L11.41 7.5118L7.41 3.5118L0 10.9318L1.41 12.3418L7.41 6.3418L11.41 10.3418L17.71 4.0518L20 6.3418V0.341797H14Z" fill="#00B69B" />
                        </svg>
                        <p><span className='text-[#00B69B] font-bold' >8.5% </span>Up from yesterday</p>
                    </div>
                </div>
            </div>
            {/* Sales Chart */}
            <div className="bg-white p-4 mt-5 md:mt-[40px] rounded-md">
                {/* <LineChart chartData={chartData} /> */}
                <SalesChart chartData={salesChartData} />
            </div>
            {/* Revenue Chart */}
            <div className="bg-white p-4 mt-5 md:mt-[40px] rounded-md">
                <RevenueChart chartData={revenueChartData} />
            </div>
        </div >
    )
}

export default Dashboard