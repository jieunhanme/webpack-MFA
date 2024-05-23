import { useEffect, useState } from "react";
import { Select } from "antd";
import { CapitalizeWord } from "@src/utils/capitalize-word";

export default function AppSelection() {
  const [apps, setApps] = useState([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Select
      defaultValue="portal"
      className="mx-5"
      style={{ width: 80 }}
      onChange={handleChange}
      options={[
        {
          value: "portal",
          label: CapitalizeWord("portal"),
        },
        {
          value: "app",
          label: CapitalizeWord("app"),
        },
      ]}
    />
  );
}
