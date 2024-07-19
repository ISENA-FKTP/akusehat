import CryptoJS from "crypto-js";
import axios from "axios";
import LZString from "lz-string";

// Informasi yang dibutuhkan
const consumerID = "19319";
const consumerSecret = "6jH7812742";
const userKey = "cb5c1a16e60d25c86a1bc98e90734a74";
const usernamePcare = "ujicoba.klinik";
const passwordPcare = "Cob@br1dging";
const kdAplikasi = "095";

// Generate timestamp
const generateTimestamp = () => Math.floor(Date.now() / 1000);

// Create signature
const generateSignature = (consumerID, timestamp, consumerSecret) => {
  const data = `${consumerID}&${timestamp}`;
  const hash = CryptoJS.HmacSHA256(data, consumerSecret);
  return CryptoJS.enc.Base64.stringify(hash);
};

// Generate authorization header
const generateAuthorization = (usernamePcare, passwordPcare, kdAplikasi) => {
  const authString = `${usernamePcare}:${passwordPcare}:${kdAplikasi}`;
  return btoa(authString);
};

// Function to decrypt the response
const decryptResponse = (cipherText, consumerID, consumerSecret, timestamp) => {
  const keyString = consumerID + consumerSecret + timestamp;
  const key = CryptoJS.SHA256(keyString);
  const iv = CryptoJS.lib.WordArray.create(key.words.slice(0, 4));

  const bytes = CryptoJS.AES.decrypt(cipherText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return LZString.decompressFromEncodedURIComponent(decrypted);
};

// Function to fetch patient data
export const fetchPatientData = async (searchType, searchValue) => {
  const baseUrl = "https://apijkn-dev.bpjs-kesehatan.go.id";
  const serviceName = "pcare-rest-dev";
  const apiUrl = `${baseUrl}/${serviceName}/peserta/${searchType}/${searchValue}`;

  const timestamp = generateTimestamp();
  const signature = generateSignature(consumerID, timestamp, consumerSecret);
  const authorization = generateAuthorization(
    usernamePcare,
    passwordPcare,
    kdAplikasi
  );

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-cons-id": consumerID,
        "X-Timestamp": timestamp.toString(),
        "X-Signature": signature,
        "X-Authorization": `Basic ${authorization}`,
        user_key: userKey,
      },
    });

    if (response.data.response) {
      const encryptedData = response.data.response;
      const decryptedData = decryptResponse(
        encryptedData,
        consumerID,
        consumerSecret,
        timestamp.toString()
      );
      console.log("Decrypted data:", decryptedData);
      return JSON.parse(decryptedData);
    }
  } catch (error) {
    console.error("Error fetching patient data:", error.message);
    throw error;
  }
};

// fetchPatientData("noka", "0002039003471");
