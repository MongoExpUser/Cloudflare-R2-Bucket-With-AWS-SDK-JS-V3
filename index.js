/* **************************************************************************************************************************************
#  * index.js                                                                                                                           *
#  **************************************************************************************************************************************
#  *                                                                                                                                    *
#  * @License Starts                                                                                                                    *
#  *                                                                                                                                    *
#  * Copyright © 2024. MongoExpUser.  All Rights Reserved.                                                                              *
#  *                                                                                                                                    *
#  * License: MIT - https://github.com/MongoExpUser/Cloudflare-R2-Bucket-With-AWS-SDK-JS-V3/blob/main/LICENSE                           *
#  *                                                                                                                                    *
#  * @License Ends                                                                                                                      *
#  **************************************************************************************************************************************
# *                                                                                                                                     *
# *  Project: Deploy and Configure Cloudflare Object Storage R2 Project                                                                  *
# *                                                                                                                                     *
# *  This module can:                                                                                                                   *
# *                                                                                                                                     *
# *     1)  Create/Deploy, Configure, List and Delete Cloudflare R2 Bucket (Object Storage) withith AWS SDK for JavaScript/NodeJS V3.   *
# *                                                                                                                                     *
# *                                                                                                                                     *
# **************************************************************************************************************************************/



const { S3Client, ListBucketsCommand, ListObjectsV2Command, 
        GetObjectCommand, PutObjectCommand, CreateBucketCommand, 
        DeleteBucketCommand, PutBucketLifecycleConfigurationCommand } = require("@aws-sdk/client-s3");

class CreateConfigListDeleteClfR2
{
    constructor()
    {
        return null;
    }

    async prettyPrint(value)
    {
        const util = require('util');
        console.log(util.inspect(value, { showHidden: true, colors: true, depth: 4 }));
    }
        
    async bucketActions(inputActions, credentials) 
    {
        const options = { 
          region: "auto", 
          endpoint: `https://${credentials.accountId}.r2.cloudflarestorage.com`,
          credentials: { accessKeyId: credentials.accessKeyId, secretAccessKey: credentials.secretAccessKey } 
        };

        const ccld = new CreateConfigListDeleteClfR2();
        const client = new S3Client(options);
        const listBucket = inputActions.listBucket;
        const createBucket = inputActions.createBucket;
        const putBucketLifecycleConfig = inputActions.putBucketLifecycleConfig;
        const deleteBucket = inputActions.deleteBucket;
        const bucketName =  inputActions.bucketName;
        const expirationDays = inputActions.expirationDays;
        const abortDays = inputActions.abortDays;
        const id = inputActions.id;
        const statusOne = inputActions.statusOne; 
        const statusTwo = inputActions.statusTwo; 
        
        const lb = listBucket.length;
        const cb = createBucket.length;
        const pb = putBucketLifecycleConfig.length; 
        const db = deleteBucket.length;
        const bn = bucketName.length;
        const ep = expirationDays.length;
        const ab = abortDays.length;
        const il = id.length;
        const so = statusOne.length;
        const st = statusTwo.length;
        const confirm = (bn === lb) && (bn === pb) && (bn === db) && 
                        (bn === cb) && (bn === ep) && (bn === ab) && 
                        (bn === il) && (bn === so) && (bn === st);


        if(confirm === true)
        { 
            for(let index = 0; index < bn; index++)
            {
                if(listBucket[index] === true)
                {
                    const input = {};
                    const command = new ListBucketsCommand(input);
                    const response = await client.send(command);
                    await ccld.prettyPrint(response); 
                }

                if(createBucket[index] === true)
                {
                    console.log("Creating bucket named:", bucketName[index]);
                    const input = { Bucket : bucketName[index]}
                    const command = new CreateBucketCommand(input);
                    const response = await client.send(command);
                    await ccld.prettyPrint(response);
                }

                if(putBucketLifecycleConfig[index] === true)
                {
                    console.log("Creating/putting bucket life cycle configuration for bucket named:", bucketName[index]);
                    const input = {
                      Bucket: bucketName[index],
                      LifecycleConfiguration: {
                        Rules: [ 
                          {
                            Status: statusOne[index],
                            ID: id[index],
                            Expiration: { Days: expirationDays[index] },
                            AbortIncompleteMultipartUpload: { DaysAfterInitiation: abortDays[index] }
                          } 
                        ]
                      }
                    };

                    const command = new PutBucketLifecycleConfigurationCommand(input);
                    const response = await client.send(command);
                    await ccld.prettyPrint(response);
                }

                if(deleteBucket[index] === true)
                {
                    console.log("Deleting bucket named:", bucketName[index]);
                    const input = { Bucket : bucketName[index] }
                    const command = new DeleteBucketCommand(input);
                    const response = await client.send(command);
                    await ccld.prettyPrint(response);
                }
            }
        }
        else
        {
            return console.log("Length of the input List/Array must be equal!")
        }
    }
}


(async function()
{
    const fs = require("fs");
    const inputConfigJsonFilePath = "config.json";           
    const inputConfig = JSON.parse(fs.readFileSync(inputConfigJsonFilePath));
    const credentials = inputConfig.credentials;
    const inputActions = inputConfig.inputActions;
    const ccld = new CreateConfigListDeleteClfR2();
    await ccld.bucketActions(inputActions, credentials);
}());
