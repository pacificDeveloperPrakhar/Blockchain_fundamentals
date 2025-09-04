import React from "react";

interface Keys {
  privateKey: string;
  publicKey: string;
}

interface KeysProps {
  coin_type:string;
  keys: Keys[];
  setKeys: React.Dispatch<React.SetStateAction<Keys[]>>; // simplified type
  fetchKeys: (
    type: number,
    keysLength: number,
    seed: string,
    account_type: number
  ) => Promise<Keys>; // returns a Keys object
  seed: string;
  account_type: number;
  type: number; // coin type (e.g., 60 for ETH, 501 for SOL)
}

export default function Keys({
  coin_type,
  keys,
  setKeys,
  type,
  fetchKeys,
  seed,
  account_type,
}: KeysProps) {
  // Mark addKey as async
  const addKey = async () => {
    try {
      // Await the async fetchKeys function
      const newKey = await fetchKeys(type, keys.length, seed, account_type);

      // Add the new key to state
      setKeys([...keys, newKey]);
    } catch (err) {
      console.error("Failed to fetch new key:", err);
    }
  };

  const handleChange = (
    index: number,
    field: "privateKey" | "publicKey",
    value: string
  ) => {
    const updatedKeys = [...keys];
    updatedKeys[index][field] = value;
    setKeys(updatedKeys);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Coin Type: {coin_type}</h1>
      <div className="flex flex-col gap-2">
        {keys.map((key, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              className="border p-2 rounded flex-1"
              value={key.privateKey}
              onChange={(e) => handleChange(index, "privateKey", e.target.value)}
            />
            <input
              type="text"
              className="border p-2 rounded flex-1"
              value={key.publicKey}
              onChange={(e) => handleChange(index, "publicKey", e.target.value)}
            />
          </div>
        ))}

        <button
          className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition-colors"
          onClick={addKey}
        >
          Add Key
        </button>
      </div>
    </div>
  );
}
