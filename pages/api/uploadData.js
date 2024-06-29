import {Web3Storage, getFilesFromPath } from 'web3.storage';
import { filesFromPaths } from 'files-from-path'
const {ethers} = require('ethers');
import * as Constants from "../constant";
import formidable from 'formidable';
import path from 'path';
import { create } from '@web3-storage/w3up-client';
import * as Client from '@web3-storage/w3up-client'
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNDc3ZTY0OC0xMjQ3LTQzNmEtOTczZC0zYTlkMGQ4YmZkNzEiLCJlbWFpbCI6ImFydW4ua3VzdHdhci4yM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDk1ODFlODFjZjFhYjg5YTg4NGIiLCJzY29wZWRLZXlTZWNyZXQiOiI1ZmY0YjhlODliMDVlNWM5YjgxZTNkMTkzN2Y2OTA3ZGYyZWY0ZTI3NmM0YzllM2Q4NmY1ZDA0YmNiM2Q5NTIwIiwiZXhwIjoxNzUwNjE2ODk4fQ.vZBSMohREHUY-ezePfTmiuLDdDMkgk_kxk-GaZzurqo";

export const config = {
    api: {
        bodyParser: false    // disable built-in body parser
    }
}

function moveFiletoServer(req) {
    return new Promise((resolve, reject) => {
        const options = {};
        options.uploadDir = path.join(process.cwd(), "/pages/uploads");
        options.filename = (name, ext, path, form) => {
            return path.originalFilename;
        }
        const form = formidable(options);

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                reject("Something went wrong");
                return;
            }
            const uniqueFileName = fields.filename;
            const actualFileName = files.file.originalFilename;

            resolve({uniqueFileName, actualFileName});
        })
    })
}


async function storeDataInBlockchain(actualFileName, uniqueFileName) {
    const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
    const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
    const StorageContract = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);

    const isStored = await StorageContract.isFileStored(uniqueFileName);

    console.log(isStored);

    if (isStored == false) {
            try {
                const formData = new FormData();
                const file = fs.createReadStream("./pages/uploads/Untitled Diagram.drawio.png");
                formData.append("file", file);
                const pinataMetadata = JSON.stringify({
                    name: "File name",
                });
                formData.append("pinataMetadata", pinataMetadata);
                const pinataOptions = JSON.stringify({
                    cidVersion: 1,
                });
                formData.append("pinataOptions", pinataOptions);
                const res = await axios.post(
                    "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${JWT}`,
                        },
                    }
                );
                console.log(res.data);
                let hash = res.data.IpfsHash.toString();
                console.log(hash);
                console.log("Storing the data in IPFS");
                const tx = await StorageContract.upload(uniqueFileName, hash);
                console.log(tx);
                await tx.wait();
                const storedhash = await StorageContract.getIPFSHash(uniqueFileName);
                console.log(storedhash);
                return {message: `IPFS hash is stored in the smart contract: ${storedhash}`}


            } catch (error) {
                console.log(error);
            }










      // pre
        
         }

    else {
        console.log("Data is already stored for this file name");
        const IPFShash = await StorageContract.getIPFSHash(uniqueFileName);
        return {message: `IPFS hash is already stored in the smart contract: ${IPFShash}`}
    }
}
// we are moving files from local pc to this server directoy
// we are going to store file in IPFS
// we are going to store IPFS hash in blockchain
async function handler(req, res) {
    try {
        const {uniqueFileName, actualFileName} = await moveFiletoServer(req)
        console.log("Files are stored in local server");

        await new Promise(resolve => setTimeout(resolve, 2000));  //waiting for 2 seconds

        const resposne = await storeDataInBlockchain(actualFileName, uniqueFileName)
        console.log("Hash stored in smart contract");

        return res.status(200).json(resposne);
    }
    catch (err) {
        console.error(err);
    }
}

export default handler;