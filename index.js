/* **************************************************************************************************************************************
#  * app.js                                                                                                                             *
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
# *  Project: Deploy and Configure Cloudflae Object Storage R2 Project                                                                  *
# *                                                                                                                                     *
# *  This module can:                                                                                                                   *
# *                                                                                                                                     *
# *     1)  Create/Deploy, Configure, List and Delete Cloudflare R2 Bucket (Object Storage) withith AWS SDK for JavaScript/NodeJS V3.   *
# *                                                                                                                                     *
# *                                                                                                                                     *
# **************************************************************************************************************************************/


//const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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

        if(listBucket === true)
        {
            const command = new ListBucketsCommand('');
            const response = await client.send(command);
            await ccld.prettyPrint(response); // or console.log(response);
        }

        if(createBucket === true)
        {
            console.log("Creating bucket");
            const input = { Bucket : bucketName}
            const command = new CreateBucketCommand(input);
            const response = await client.send(command);
            await ccld.prettyPrint(response);
        }

        if(putBucketLifecycleConfig === true)
        {
            console.log("Creating/putting bucket life cycle configuration");
            const input = {
              Bucket: bucketName,
              LifecycleConfiguration: {
                Rules: [ 
                  {
                    Status: statusOne,
                    ID: id,
                    Expiration: { Days: expirationDays },
                    AbortIncompleteMultipartUpload: { DaysAfterInitiation: abortDays }
                  } 
                ]
              }
            };

            const command = new PutBucketLifecycleConfigurationCommand(input);
            const response = await client.send(command);
            await ccld.prettyPrint(response);
        }

        if(deleteBucket === true)
        {
            console.log("Deleting bucket");
            const input = { Bucket : bucketName }
            const command = new DeleteBucketCommand(input);
            const response = await client.send(command);
            await ccld.prettyPrint(response);
        }
    }
}


(async function()
{
    const fs = require("fs");
    //const cwd = process.cwd();
    const inputConfigJsonFilePath = "config.json";           
    const inputConfig = JSON.parse(fs.readFileSync(inputConfigJsonFilePath));
    const credentials = inputConfig.credentials;
    const inputActions = inputConfig.inputActions;
    const ccld = new CreateConfigListDeleteClfR2();
    await ccld.bucketActions(inputActions, credentials);
}());


