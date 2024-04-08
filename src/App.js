import React, { useState } from 'react'
import { isIPAddress } from 'ip-address-validator';
import GMap from './GMap';

const App = () => {
  const [ip, setIp] = useState("115.240.90.163")
  const [city, setCity] = useState("Patna");
  const [country, setCountry] = useState("India");
  const [isp, setIsp] = useState("Reliance Jio Infocomm Limited");

  const [lat, setLat] = useState(25.5908);
  const [long, setLong] = useState(85.1348);

  const [correctIpError, setCorrectIpError] = useState("");


  const onIpInput = (event) => {
    const value = event.target.value;
    setIp(value);

  }

  const onSearch = async () => {
    if (isIPAddress(ip)) {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      setCity(data.city);
      setCountry(data.country_name);
      setIsp(data.org);
      setLat(data.latitude);
      setLong(data.longitude);

      setCorrectIpError("");
    } else {
      setCorrectIpError("Please Enter Correct IP Address");
    }
  }


  return (
    <div className='w-screen h-screen'>
      <div className='tracking-wider p-9'>
        {/* Title */}
        <div className='text-center text-5xl underline font-MadimiOne text-[#1e6091]'>IP Address Finder</div>

        {/* IP section */}
        <div className='flex flex-col  gap-5 lg:flex-row justify-around items-center py-20'>

          {/* IP information */}
          <div className='text-lg md:text-2xl px-5'>
            <div className='flex flex-col mb-4'>
              <label className='font-semibold'>What is my IPv4 address ?</label>

              <div className='my-4'>

                <div className='flex items-center'>
                  <input onChange={onIpInput} className="border text-[#1e6091] w-[80%] text-xl md:text-3xl font-semibold outline-none px-2 py-1  placeholder-[#1e6091]" type="text" placeholder={ip} />
                  <div className='border border-l-0 border-gray-300 px-3 py-[12px]'><img onClick={onSearch} className="w-3 h-3 md:w-5 md:h-5 " src={require("./assets/search.png")} alt="" /></div>
                </div>

                {correctIpError && <div className='text-sm text-red-600 font-semibold'>{correctIpError}</div>}

              </div>
            </div>

            <div className='mb-6'>
              <p className='font-semibold'>Approximate location: </p>
              <p className='text-[#579ed4] my-4'>{city}, {country}</p>
            </div>
            <div className='mb-6'>
              <p className='font-semibold'>Internet Service Provider(ISP): </p>
              <p className='text-[#579ed4] my-4'>{isp}</p>
            </div>

          </div>

          {/* Map section */}
          <div className='w-[90%] h-[450px] lg:w-[500px] lg:h-[450px] xl:w-[700px] xl:h-[450px] border-[6px] border-[#1e6091]'>
            <GMap latitude={lat} longitude={long} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App