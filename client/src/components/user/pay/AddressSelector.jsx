import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { message } from "antd";

const AddressSelector = ({ parentAddressSelect, setParentAddressSelect }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");

  // const addressApi = () => {
  //   axios
  //     .get(
  //       "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
  //     )
  //     .then((response) => setProvinces(response.data))
  //     .catch((err) => console.log(err));
  // };
  const addressApi = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    addressApi();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceData = provinces.find(
        (province) => province.Id === selectedProvince
      );
      setDistricts(selectedProvinceData?.Districts || []);
      setCommunes([]);
      setSelectedDistrict("");
      setSelectedCommune("");
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictData = districts.find(
        (district) => district.Id === selectedDistrict
      );
      setCommunes(selectedDistrictData?.Wards || []);
      setSelectedCommune("");
    }
  }, [selectedDistrict]);

  const provinceOptions = provinces.map((province) => ({
    value: province.Id,
    label: province.Name,
  }));

  const districtOptions = districts.map((district) => ({
    value: district.Id,
    label: district.Name,
  }));

  const communeOptions = communes.map((commune) => ({
    value: commune.Id,
    label: commune.Name,
  }));

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption.value);
    setParentAddressSelect((prevAddressSelect) => ({
      ...prevAddressSelect,
      city: selectedOption.label,
    }));
    setSelectedDistrict("");
    setSelectedCommune("");
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption.value);
    setParentAddressSelect((prevAddressSelect) => ({
      ...prevAddressSelect,
      district: selectedOption.label,
    }));
    setSelectedCommune("");
  };

  const handleCommuneChange = (selectedOption) => {
    setSelectedCommune(selectedOption.value);
    setParentAddressSelect((prevAddressSelect) => ({
      ...prevAddressSelect,
      ward: selectedOption.label,
    }));
  };

  return (
    <div className="flex flex-col">
      <Select
        className="mt-3"
        value={provinceOptions.find((option) => option.Id === selectedProvince)}
        placeholder="Chọn tỉnh thành"
        onChange={handleProvinceChange}
        options={provinceOptions}
      />
      <Select
        className="mt-3"
        value={districtOptions.find((option) => option.Id === selectedDistrict)}
        placeholder="Chọn quận huyện"
        onChange={handleDistrictChange}
        options={districtOptions}
      />
      <Select
        className="mt-3"
        value={communeOptions.find((option) => option.Id === selectedCommune)}
        placeholder="Chọn phường xã"
        onChange={handleCommuneChange}
        options={communeOptions}
      />
    </div>
  );
};

export default AddressSelector;
